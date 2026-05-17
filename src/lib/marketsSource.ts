import * as XLSX from "xlsx";

const SOURCE_URL = "/data/markets-source.xlsx";

export interface MarketsData {
  countries: string[]; // includes UAE first
  parameters: { label: string; values: Record<string, string> }[];
  highlights: string[]; // from "Why Dubai" sheet
  quote: string;
}

let cache: MarketsData | null = null;

export async function loadMarketsData(): Promise<MarketsData> {
  if (cache) return cache;
  const res = await fetch(SOURCE_URL);
  const buf = await res.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });

  const main = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<unknown[]>(main, { header: 1, defval: "" });
  const headers = (rows[0] as string[]).map((h) => String(h ?? "").trim());
  const countries = headers.slice(1);

  const parameters = rows.slice(1).map((r) => {
    const arr = r as unknown[];
    const label = String(arr[0] ?? "").trim();
    const values: Record<string, string> = {};
    countries.forEach((c, i) => {
      const v = arr[i + 1];
      values[c] = v === 0 || v === "0" ? "0%" : String(v ?? "").trim();
    });
    return { label, values };
  }).filter((p) => p.label);

  // Why Dubai sheet
  const why = wb.Sheets[wb.SheetNames[1]];
  let highlights: string[] = [];
  let quote = "";
  if (why) {
    const wRows = XLSX.utils.sheet_to_json<unknown[]>(why, { header: 1, defval: "" });
    const flat = wRows.map((r) => String((r as unknown[])[0] ?? "").trim()).filter(Boolean);
    const startIdx = flat.findIndex((s) => /why global/i.test(s));
    const after = startIdx >= 0 ? flat.slice(startIdx + 1) : flat;
    // Last long sentence is the quote
    const longIdx = after.findIndex((s) => s.length > 80);
    if (longIdx >= 0) {
      highlights = after.slice(0, longIdx);
      quote = after[longIdx];
    } else {
      highlights = after;
    }
  }

  cache = { countries, parameters, highlights, quote };
  return cache;
}

const DUBAI_KEY = "UAE";

// Heuristic: does Dubai win this parameter row?
export function dubaiWins(label: string, dubaiVal: string, otherVal: string): boolean {
  const l = label.toLowerCase();
  const d = dubaiVal.toLowerCase();
  const o = otherVal.toLowerCase();
  if (!d || !o) return false;

  // Tax-like rows: 0% / None always wins
  if (/(tax|inheritance|estate)/.test(l)) {
    const dZero = /^0%?$|none|nil|no\b/.test(d);
    const oZero = /^0%?$|none|nil|no\b/.test(o);
    if (dZero && !oZero) return true;
    return false;
  }

  // Yield: compare midpoint of range like "6-9%"
  if (/yield/.test(l)) {
    const mid = (s: string) => {
      const m = s.match(/(\d+(?:\.\d+)?)[^\d]+(\d+(?:\.\d+)?)/);
      if (m) return (parseFloat(m[1]) + parseFloat(m[2])) / 2;
      const single = s.match(/(\d+(?:\.\d+)?)/);
      return single ? parseFloat(single[1]) : NaN;
    };
    const dm = mid(d), om = mid(o);
    if (!isNaN(dm) && !isNaN(om)) return dm > om;
    return false;
  }

  // Positive-qualitative rows
  const positive = ["high", "very easy", "easy", "strong", "very high", "high and improving"];
  const dPos = positive.some((p) => d.startsWith(p) || d === p);
  const oPos = positive.some((p) => o.startsWith(p) || o === p);
  if (dPos && !oPos) return true;

  return false;
}

export { DUBAI_KEY };
