import * as XLSX from "xlsx";

export type PlanKey = "40/60" | "50/50" | "60/40" | "70/30" | "80/20" | "Ready";

export interface PlanConfig {
  plan: PlanKey;
  type: "off-plan" | "ready";
  splits: number[]; // year-by-year payment fractions of property value (Y1..)
  irr: string;
}

export interface ROIConfig {
  basePrice: number;
  horizonYears: number;
  offPlanGrowth: number;
  readyGrowth: number;
  readyYield: number;
  readyYieldGrowth: number;
  offPlanYield: number;
  offPlanRentalStartYear: number;
  dldOffPlan: number;
  dldReady: number;
  plans: PlanConfig[];
  rawAssumptions: string[];
  sourceFile: string;
}

const SOURCE_URL = "/data/roi-source.xlsx";

const pct = (s: unknown): number | null => {
  if (s == null) return null;
  const m = String(s).match(/(\d+(?:\.\d+)?)\s*%/);
  return m ? parseFloat(m[1]) / 100 : null;
};

const num = (s: unknown): number | null => {
  if (typeof s === "number") return s;
  if (s == null) return null;
  const m = String(s).replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : null;
};

export async function loadROIConfig(): Promise<ROIConfig> {
  const res = await fetch(SOURCE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load ROI source xlsx");
  const buf = await res.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const get = (addr: string) => (ws[addr] ? (ws[addr] as XLSX.CellObject).v : undefined);

  const offPlanGrowth = pct(get("B33")) ?? 0.12;
  const readyGrowth = pct(get("B34")) ?? 0.05;
  const readyYield = pct(get("B40")) ?? 0.07;
  const readyYieldGrowth = pct(get("B41")) ?? 0.05;
  const offPlanYield = pct(get("B44")) ?? 0.07;
  const dldOffPlan = pct(get("B48")) ?? 0.04;
  const dldReady = pct(get("B49")) ?? 0.06;
  const basePrice = num(get("B28")) ?? 1_000_000;
  const horizonYears = num(get("B29")) ?? 5;

  const planRows: { row: number; plan: PlanKey; irrCell: string }[] = [
    { row: 54, plan: "40/60", irrCell: "I2" },
    { row: 55, plan: "50/50", irrCell: "I3" },
    { row: 56, plan: "60/40", irrCell: "I4" },
    { row: 57, plan: "70/30", irrCell: "I5" },
    { row: 58, plan: "80/20", irrCell: "I6" },
  ];

  const plans: PlanConfig[] = planRows.map(({ row, plan, irrCell }) => ({
    plan,
    type: "off-plan",
    splits: [Number(get(`C${row}`)) || 0, Number(get(`D${row}`)) || 0, Number(get(`E${row}`)) || 0],
    irr: String(get(irrCell) ?? ""),
  }));

  plans.push({
    plan: "Ready",
    type: "ready",
    splits: [1],
    irr: String(get("I7") ?? ""),
  });

  // Raw assumption text (B26:B75) for transparency
  const rawAssumptions: string[] = [];
  for (let r = 26; r <= 75; r++) {
    const v = get(`B${r}`);
    if (v != null && String(v).trim()) rawAssumptions.push(String(v));
  }

  return {
    basePrice,
    horizonYears,
    offPlanGrowth,
    readyGrowth,
    readyYield,
    readyYieldGrowth,
    offPlanYield,
    offPlanRentalStartYear: 3,
    dldOffPlan,
    dldReady,
    plans,
    rawAssumptions,
    sourceFile: SOURCE_URL,
  };
}

export interface YearRow {
  year: number;
  propertyValue: number;
  rentalIncome: number;
  paymentDue: number;
}

export interface PlanResult {
  plan: PlanKey;
  type: "off-plan" | "ready";
  totalInvested: number;
  finalValue: number;
  totalRental: number;
  totalInflow: number;
  netProfit: number;
  roi: number;
  irr: string;
  years: YearRow[];
}

export function computePlan(cfg: ROIConfig, propertyValue: number, plan: PlanConfig): PlanResult {
  const H = cfg.horizonYears;
  const years: YearRow[] = [];

  if (plan.type === "off-plan") {
    // Growth: offPlanGrowth for years 1..3 (handover), then readyGrowth
    const handoverYear = 3;
    for (let y = 0; y <= H; y++) {
      let propVal: number;
      if (y <= handoverYear) {
        propVal = propertyValue * Math.pow(1 + cfg.offPlanGrowth, y);
      } else {
        propVal =
          propertyValue *
          Math.pow(1 + cfg.offPlanGrowth, handoverYear) *
          Math.pow(1 + cfg.readyGrowth, y - handoverYear);
      }
      // Rental: starts year 3, continues until year H-1 (exit at H, no rental in exit year)
      const rental = y >= cfg.offPlanRentalStartYear && y < H ? propVal * cfg.offPlanYield : 0;
      // Payment outflows in years 1..plan.splits.length
      const paymentDue = y >= 1 && y <= plan.splits.length ? propertyValue * plan.splits[y - 1] : 0;
      years.push({ year: y, propertyValue: propVal, rentalIncome: rental, paymentDue });
    }
    const dld = propertyValue * cfg.dldOffPlan;
    const totalInvested = propertyValue + dld;
    const finalValue = years[H].propertyValue;
    const totalRental = years.reduce((s, y) => s + y.rentalIncome, 0);
    const totalInflow = finalValue + totalRental;
    const netProfit = totalInflow - totalInvested;
    return {
      plan: plan.plan,
      type: plan.type,
      totalInvested,
      finalValue,
      totalRental,
      totalInflow,
      netProfit,
      roi: (netProfit / totalInvested) * 100,
      irr: plan.irr,
      years,
    };
  }

  // Ready
  for (let y = 0; y <= H; y++) {
    const propVal = propertyValue * Math.pow(1 + cfg.readyGrowth, y);
    const rental = y < H ? propVal * cfg.readyYield : 0;
    const paymentDue = y === 1 ? propertyValue : 0;
    years.push({ year: y, propertyValue: propVal, rentalIncome: rental, paymentDue });
  }
  const dld = propertyValue * cfg.dldReady;
  const totalInvested = propertyValue + dld;
  const finalValue = years[H].propertyValue;
  const totalRental = years.reduce((s, y) => s + y.rentalIncome, 0);
  const totalInflow = finalValue + totalRental;
  const netProfit = totalInflow - totalInvested;
  return {
    plan: plan.plan,
    type: plan.type,
    totalInvested,
    finalValue,
    totalRental,
    totalInflow,
    netProfit,
    roi: (netProfit / totalInvested) * 100,
    irr: plan.irr,
    years,
  };
}
