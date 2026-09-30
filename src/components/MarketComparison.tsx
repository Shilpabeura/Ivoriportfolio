import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Globe2, Shield, TrendingUp, Sparkles, Coins } from "lucide-react";
import { loadMarketsData, dubaiWins, DUBAI_KEY, type MarketsData } from "@/lib/marketsSource";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const DUBAI_SNAPSHOT = [
  { icon: Coins, label: "0% Income Tax", sub: "On rental income" },
  { icon: TrendingUp, label: "0% Capital Gains", sub: "Full upside retained" },
  { icon: Shield, label: "0% Inheritance Tax", sub: "Wealth transfer ready" },
  { icon: Sparkles, label: "6–9% Gross Yield", sub: "Among highest globally" },
  { icon: Globe2, label: "Golden Visa", sub: "Residency by investment" },
];

const MarketComparison = () => {
  const [data, setData] = useState<MarketsData | null>(null);
  const [selected, setSelected] = useState<string>("India");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadMarketsData().then(setData).catch(console.error);
  }, []);

  const others = useMemo(
    () => data?.countries.filter((c) => c !== DUBAI_KEY) ?? [],
    [data],
  );

  if (!data) {
    return (
      <section id="markets" className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          Loading market comparison…
        </div>
      </section>
    );
  }

  return (
    <section id="markets" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Global Comparison
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Dubai vs the World
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A side-by-side look at why global capital increasingly chooses Dubai over eight mature
            and emerging markets.
          </p>
        </div>

        {/* Dubai snapshot */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-16">
          {DUBAI_SNAPSHOT.map((s) => (
            <div
              key={s.label}
              className="rounded-none bg-foreground text-background p-5 shadow-press"
            >
              <s.icon className="w-5 h-5 mb-3 opacity-80" />
              <div className="font-display text-lg font-bold leading-tight">{s.label}</div>
              <div className="text-[11px] opacity-80 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Country selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {others.map((c) => (
            <button
              key={c}
              onClick={() => setSelected(c)}
              className={`px-4 py-2 rounded-none text-sm font-medium transition-all ${
                selected === c
                  ? "bg-foreground text-background shadow-press"
                  : "bg-background text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {c.trim()}
            </button>
          ))}
        </div>

        {/* Head-to-head */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-none bg-background border border-border overflow-hidden shadow-elevated"
          >
            {/* Column headers */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-secondary/50">
              <div className="p-4 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Parameter
              </div>
              <div className="p-4 border-l border-border bg-primary/10">
                <div className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">
                  Dubai
                </div>
                <div className="font-display text-base font-bold text-foreground">UAE</div>
              </div>
              <div className="p-4 border-l border-border">
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-bold">
                  Compared
                </div>
                <div className="font-display text-base font-bold text-foreground">
                  {selected.trim()}
                </div>
              </div>
            </div>

            <div className="divide-y divide-border">
              {data.parameters.map((p) => {
                const dVal = p.values[DUBAI_KEY] || "—";
                const oVal = p.values[selected] || "—";
                const wins = dubaiWins(p.label, dVal, oVal);
                return (
                  <div
                    key={p.label}
                    className="grid grid-cols-[1.2fr_1fr_1fr] hover:bg-secondary/30 transition-colors"
                  >
                    <div className="p-4 text-sm font-medium text-foreground">{p.label}</div>
                    <div className="p-4 border-l border-border bg-primary/5 text-sm text-foreground flex items-start gap-2">
                      {wins && (
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      )}
                      <span>{dVal}</span>
                    </div>
                    <div className="p-4 border-l border-border text-sm text-muted-foreground">
                      {oVal}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Full matrix */}
        <Collapsible open={open} onOpenChange={setOpen} className="mt-10">
          <CollapsibleTrigger className="mx-auto flex items-center gap-2 px-5 py-2.5 rounded-none bg-background border border-border text-sm font-medium hover:border-foreground transition-colors">
            {open ? "Hide" : "View"} all {data.countries.length} markets
            <ChevronDown
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-6">
            <div className="rounded-none bg-background border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="sticky left-0 z-10 bg-secondary/80 backdrop-blur p-3 text-left text-xs uppercase tracking-wider text-muted-foreground font-semibold min-w-[200px]">
                        Parameter
                      </th>
                      {data.countries.map((c) => (
                        <th
                          key={c}
                          className={`p-3 text-left text-xs font-bold whitespace-nowrap ${
                            c === DUBAI_KEY
                              ? "bg-primary/10 text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {c === DUBAI_KEY ? "Dubai (UAE)" : c.trim()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {data.parameters.map((p) => (
                      <tr key={p.label} className="hover:bg-secondary/30">
                        <td className="sticky left-0 z-10 bg-background p-3 font-medium text-foreground min-w-[200px]">
                          {p.label}
                        </td>
                        {data.countries.map((c) => (
                          <td
                            key={c}
                            className={`p-3 align-top whitespace-nowrap ${
                              c === DUBAI_KEY
                                ? "bg-primary/5 text-foreground font-medium"
                                : "text-muted-foreground"
                            }`}
                          >
                            {p.values[c] || "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Closing quote */}
        {data.quote && (
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <div className="h-px w-16 bg-foreground/40 mx-auto mb-6" />
            <p className="font-display italic text-xl md:text-2xl text-foreground leading-relaxed">
              "{data.quote}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketComparison;
