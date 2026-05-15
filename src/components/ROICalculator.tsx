import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Info, TrendingUp, Calculator, FileSpreadsheet } from "lucide-react";
import {
  loadROIConfig,
  computePlan,
  type ROIConfig,
  type PlanKey,
} from "@/lib/roiSource";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-AE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const ROICalculator = () => {
  const [propertyValue, setPropertyValue] = useState(1000000);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("60/40");
  const [cfg, setCfg] = useState<ROIConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadROIConfig()
      .then(setCfg)
      .catch((e) => setError(e.message ?? String(e)));
  }, []);

  const calculations = useMemo(() => {
    if (!cfg) return [];
    return cfg.plans.map((p) => computePlan(cfg, propertyValue, p));
  }, [cfg, propertyValue]);

  const selectedCalc = calculations.find((c) => c.plan === selectedPlan);

  if (error) {
    return (
      <section id="roi" className="py-24 bg-section-alt">
        <div className="container mx-auto px-6 text-center text-destructive">
          Failed to load ROI source: {error}
        </div>
      </section>
    );
  }

  if (!cfg || !selectedCalc) {
    return (
      <section id="roi" className="py-24 bg-section-alt">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          Loading ROI model…
        </div>
      </section>
    );
  }

  return (
    <section id="roi" className="py-24 md:py-32 bg-section-alt relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-gold opacity-40" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-body">
            Interactive Analysis
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            ROI Comparison — <span className="text-gradient-gold">{cfg.horizonYears} Year Horizon</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Off-plan vs Ready · Numbers driven by an editable Excel source · Adjust property value to model your scenario
          </p>
          <a
            href={cfg.sourceFile}
            download
            className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-[0.3em] text-primary hover:text-primary/80 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Download source spreadsheet
          </a>
        </motion.div>

        {/* Property Value Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-background rounded-xl p-8 border border-border shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Property Value
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">AED</span>
                <span className="font-display text-4xl font-bold text-gradient-gold">
                  {formatCurrency(propertyValue)}
                </span>
              </div>
              <input
                type="range"
                min={500000}
                max={10000000}
                step={100000}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-secondary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-gold [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>AED 500K</span>
                <span>AED 10M</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Plan Tabs */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {cfg.plans.map((p) => (
              <button
                key={p.plan}
                onClick={() => setSelectedPlan(p.plan)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedPlan === p.plan
                    ? "bg-gradient-gold text-primary-foreground shadow-gold"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                {p.type === "ready" ? "Ready Property" : `Off-Plan ${p.plan}`}
              </button>
            ))}
          </div>
        </div>

        {/* ROI Summary Cards */}
        <motion.div
          key={selectedPlan + propertyValue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto mb-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Total Invested", value: `AED ${formatCurrency(selectedCalc.totalInvested)}`, highlight: false },
              { label: `Total Inflow (${cfg.horizonYears}Y)`, value: `AED ${formatCurrency(selectedCalc.totalInflow)}`, highlight: false },
              { label: "Rental Income", value: `AED ${formatCurrency(selectedCalc.totalRental)}`, highlight: false },
              { label: "Net Profit", value: `AED ${formatCurrency(selectedCalc.netProfit)}`, highlight: false },
              { label: "ROI", value: `${selectedCalc.roi.toFixed(0)}%`, highlight: true, sub: selectedCalc.irr ? `IRR ${selectedCalc.irr}` : undefined },
            ].map((item) => (
               <div
                 key={item.label}
                 className={`rounded-xl p-6 text-center border shadow-card ${
                   item.highlight
                     ? "bg-primary/5 border-primary/30"
                     : "bg-background border-border"
                 }`}
              >
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                  {item.label}
                </p>
                <p
                  className={`font-display text-xl md:text-2xl font-bold ${
                    item.highlight ? "text-gradient-gold" : "text-foreground"
                  }`}
                >
                  {item.value}
                </p>
                {item.sub && (
                  <p className="text-[10px] mt-1 uppercase tracking-wider text-muted-foreground">{item.sub}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10"
        >
          <div className="bg-background rounded-xl border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Metric
                    </th>
                    {cfg.plans.map((p) => (
                      <th
                        key={p.plan}
                        className={`px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${
                          selectedPlan === p.plan ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {p.type === "ready" ? "Ready" : p.plan}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Total Invested", get: (c: typeof calculations[number]) => `AED ${formatCurrency(c.totalInvested)}` },
                    { label: `Total Inflow (${cfg.horizonYears}Y)`, get: (c: typeof calculations[number]) => `AED ${formatCurrency(c.totalInflow)}` },
                    { label: "Rental Income", get: (c: typeof calculations[number]) => `AED ${formatCurrency(c.totalRental)}` },
                    { label: "Net Profit", get: (c: typeof calculations[number]) => `AED ${formatCurrency(c.netProfit)}` },
                    { label: "ROI", get: (c: typeof calculations[number]) => `${c.roi.toFixed(0)}%`, isBold: true },
                    { label: "IRR (est.)", get: (c: typeof calculations[number]) => c.irr || "—" },
                  ].map((row) => (
                    <tr
                      key={row.label}
                      className={`border-b border-border/50 ${row.isBold ? "bg-primary/5" : ""}`}
                    >
                      <td className="px-4 py-4 text-sm font-medium text-foreground whitespace-nowrap">
                        {row.label}
                      </td>
                      {calculations.map((c) => (
                        <td
                          key={c.plan}
                          className={`px-4 py-4 text-sm text-right whitespace-nowrap ${
                            row.isBold
                              ? "font-bold text-primary text-base"
                              : selectedPlan === c.plan
                              ? "text-foreground font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {row.get(c)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Year-by-Year Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10"
        >
          <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Year-by-Year Breakdown ({selectedCalc.type === "ready" ? "Ready Property" : `Off-Plan ${selectedCalc.plan}`})
          </h3>
          <div className="bg-background rounded-xl border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Year</th>
                    <th className="px-4 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Property Value (AED)</th>
                    <th className="px-4 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Payment Due (AED)</th>
                    <th className="px-4 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rental Income (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCalc.years.map((y) => (
                    <tr key={y.year} className="border-b border-border/50">
                      <td className="px-4 py-4 text-sm font-medium text-foreground">Year {y.year}</td>
                      <td className="px-4 py-4 text-sm text-right text-foreground">{formatCurrency(y.propertyValue)}</td>
                      <td className="px-4 py-4 text-sm text-right text-muted-foreground">{y.paymentDue > 0 ? formatCurrency(y.paymentDue) : "—"}</td>
                      <td className="px-4 py-4 text-sm text-right text-muted-foreground">{y.rentalIncome > 0 ? formatCurrency(y.rentalIncome) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Assumptions (from xlsx) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-secondary/50 rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-primary" />
              <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
                Assumptions (sourced from spreadsheet)
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {cfg.rawAssumptions.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;
