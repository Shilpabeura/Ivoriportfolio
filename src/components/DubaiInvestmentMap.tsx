import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, ShieldCheck, Target } from "lucide-react";
import DubaiMapSVG from "./DubaiMapSVG";
import { DUBAI_ZONES, TIER_META, type Tier } from "@/lib/dubaiZones";

const StarRow = ({ value, max = 5 }: { value: number; max?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < value ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

const TierChip = ({ tier }: { tier: Tier }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase"
    style={{
      backgroundColor: `hsl(var(--tier-${tier}) / 0.12)`,
      color: `hsl(var(--tier-${tier}))`,
    }}
  >
    <span
      className="w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor: `hsl(var(--tier-${tier}))` }}
    />
    {TIER_META[tier].label}
  </span>
);

const DubaiInvestmentMap = () => {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeTier, setActiveTier] = useState<Tier | "all">("all");

  const activeId = hoveredId ?? selectedId;
  const activeZone = DUBAI_ZONES.find((z) => z.id === activeId) ?? null;

  return (
    <section id="map" className="py-24 md:py-32 bg-section-alt relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-4 font-medium">
            Dubai 2040 Master Plan
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-5">
            Where The Smart Money <span className="text-gradient-gold">Is Going</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Growth corridors, urban centres and future value — a tier-ranked view of the ten zones
            shaping Dubai&rsquo;s next decade.
          </p>
        </motion.div>

        {/* Tier filter */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {(["all", 1, 2, 3] as const).map((t) => {
            const isActive = activeTier === t;
            const label = t === "all" ? "All Zones" : TIER_META[t].label;
            return (
              <button
                key={String(t)}
                onClick={() => setActiveTier(t)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all border ${
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {label}
                {t !== "all" && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full ml-2"
                    style={{ backgroundColor: `hsl(var(--tier-${t}))` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Map + Panel */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 bg-background rounded-2xl shadow-elevated p-4 md:p-6 border border-border/50"
          >
            <DubaiMapSVG
              selectedId={selectedId}
              hoveredId={hoveredId}
              activeTier={activeTier}
              onSelect={setSelectedId}
              onHover={setHoveredId}
            />
          </motion.div>

          {/* Info Panel */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {activeZone ? (
                <motion.div
                  key={activeZone.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-background rounded-2xl shadow-elevated border border-border/50 p-7"
                >
                  <div className="flex items-center justify-between mb-4">
                    <TierChip tier={activeZone.tier} />
                    <span className="text-xs text-muted-foreground tabular-nums">
                      0{activeZone.id}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl font-medium leading-tight mb-1">
                    {activeZone.name}
                  </h3>
                  {activeZone.shortName && (
                    <p className="text-sm text-muted-foreground mb-4">{activeZone.shortName}</p>
                  )}
                  <p className="text-foreground/80 leading-relaxed mb-6">
                    {activeZone.positioning}
                  </p>

                  {/* Outlook */}
                  <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-border/60">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                        5Y Outlook
                      </p>
                      <StarRow value={activeZone.outlook5y} />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                        10Y Outlook
                      </p>
                      <StarRow value={activeZone.outlook10y} />
                    </div>
                  </div>

                  {/* Risk & Ideal for */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                          Risk Level
                        </p>
                        <p className="text-sm text-foreground">{activeZone.riskLevel}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                          Ideal For
                        </p>
                        <p className="text-sm text-foreground">{activeZone.idealFor}</p>
                      </div>
                    </div>
                  </div>

                  {/* Key projects */}
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                      Key Projects
                    </p>
                    <ul className="space-y-2.5">
                      {activeZone.projects.map((p) => (
                        <li
                          key={p.name}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 border border-border/40"
                        >
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-10 rounded-md object-cover shadow-sm"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-gold/70" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{p.developer}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-background rounded-2xl shadow-elevated border border-border/50 p-7"
                >
                  <p className="text-muted-foreground">
                    Hover or tap a zone on the map to explore its tier, outlook and active projects.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
              {(Object.keys(TIER_META) as unknown as Tier[]).map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: `hsl(var(--tier-${t}))` }}
                  />
                  {TIER_META[t as Tier].sub}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/70 mt-8 italic">
          Source: Dubai 2040 Urban Master Plan, RTA, DXB Airport, DP World, Emaar, DDA, Open Data Dubai. Map is illustrative and not to scale.
        </p>
      </div>
    </section>
  );
};

export default DubaiInvestmentMap;
