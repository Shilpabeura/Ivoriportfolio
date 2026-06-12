import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, StarHalf, ShieldCheck, Target, X, MapPin } from "lucide-react";
import { DUBAI_ZONES, TIER_META, type Tier, type Zone } from "@/lib/dubaiZones";
import DubaiMapSVG from "./DubaiMapSVG";

const TIER_HSL: Record<Tier, string> = {
  1: "hsl(var(--tier-1))",
  2: "hsl(var(--tier-2))",
  3: "hsl(var(--tier-3))",
};

const StarRow = ({ value, max = 5 }: { value: number; max?: number }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => {
        if (i < full)
          return <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />;
        if (i === full && half)
          return <StarHalf key={i} className="w-3.5 h-3.5 fill-gold text-gold" />;
        return <Star key={i} className="w-3.5 h-3.5 text-muted-foreground/30" />;
      })}
    </div>
  );
};

const TierChip = ({ tier }: { tier: Tier }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase"
    style={{
      backgroundColor: `hsl(var(--tier-${tier}) / 0.14)`,
      color: TIER_HSL[tier],
    }}
  >
    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: TIER_HSL[tier] }} />
    {TIER_META[tier].label}
  </span>
);

const DubaiInvestmentMap = () => {
  const [selected, setSelected] = useState<Zone | null>(null);
  const [hovered, setHovered] = useState<Zone | null>(null);
  const [activeTier, setActiveTier] = useState<Tier | "all">("all");

  return (
    <section id="map" className="py-24 md:py-32 bg-section-alt relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-4 font-medium">
            Dubai 2040 Master Plan
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-5">
            Where The Smart Money <span className="text-gradient-gold">Is Going</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A tier-ranked view of the ten growth corridors and urban centres shaping
            Dubai&rsquo;s next decade.
          </p>
        </motion.div>

        {/* Tier filter */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
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
                    className="inline-block w-1.5 h-1.5 rounded-full ml-2 align-middle"
                    style={{ backgroundColor: TIER_HSL[t] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-2xl overflow-hidden shadow-elevated border border-border/50 bg-background"
        >
          <DubaiMapSVG className="w-full h-auto block select-none" />


          {/* Hotspots overlay */}
          <div className="absolute inset-0">
            {DUBAI_ZONES.map((z) => {
              const dimmed = activeTier !== "all" && z.tier !== activeTier;
              const isHover = hovered?.id === z.id;
              const size = 7; // % of map width — hit area
              return (
                <button
                  key={z.id}
                  type="button"
                  onMouseEnter={() => setHovered(z)}
                  onMouseLeave={() => setHovered((h) => (h?.id === z.id ? null : h))}
                  onFocus={() => setHovered(z)}
                  onBlur={() => setHovered((h) => (h?.id === z.id ? null : h))}
                  onClick={() => setSelected(z)}
                  aria-label={`${z.name}, ${TIER_META[z.tier].label}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold"
                  style={{
                    left: `${z.pos.x}%`,
                    top: `${z.pos.y}%`,
                    width: `${size}%`,
                    aspectRatio: "1 / 1",
                    background: isHover
                      ? `radial-gradient(circle, ${TIER_HSL[z.tier]} 0%, transparent 70%)`
                      : "transparent",
                    opacity: dimmed ? 0.25 : 1,
                    cursor: "pointer",
                  }}
                >
                  <span
                    className="absolute inset-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white shadow-md transition-transform"
                    style={{
                      backgroundColor: TIER_HSL[z.tier],
                      transform: `translate(-50%, -50%) scale(${isHover ? 1.4 : 1})`,
                    }}
                  />
                </button>
              );
            })}

            {/* Hover tooltip */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key={hovered.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute z-10 pointer-events-none"
                  style={{
                    left: `${hovered.pos.x}%`,
                    top: `${hovered.pos.y}%`,
                    transform: `translate(-50%, calc(-100% - 14px))`,
                  }}
                >
                  <div className="min-w-[220px] max-w-[260px] bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-elevated p-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <TierChip tier={hovered.tier} />
                      <span className="text-[10px] text-muted-foreground tabular-nums">
                        0{hovered.id}
                      </span>
                    </div>
                    <p className="font-display text-base font-medium leading-tight">
                      {hovered.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground mb-2.5">
                      {TIER_META[hovered.tier].sub}
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
                      <div>
                        <p className="text-[9px] tracking-[0.18em] uppercase text-muted-foreground mb-0.5">5Y</p>
                        <StarRow value={TIER_META[hovered.tier].outlook5y} />
                      </div>
                      <div>
                        <p className="text-[9px] tracking-[0.18em] uppercase text-muted-foreground mb-0.5">10Y</p>
                        <StarRow value={TIER_META[hovered.tier].outlook10y} />
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2">
                      <span className="text-foreground/80">Risk:</span> {TIER_META[hovered.tier].riskLevel}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {([1, 2, 3] as Tier[]).map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TIER_HSL[t] }} />
              <span className="text-foreground/80 font-medium">{TIER_META[t].label}</span>
              <span>— {TIER_META[t].sub}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground/70 mt-6 italic">
          Source: Dubai 2040 Urban Master Plan, RTA, DXB Airport, DP World, Emaar, DDA, Open Data Dubai. Map is illustrative and not to scale.
        </p>
      </div>

      {/* Click — full detail overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-background rounded-2xl shadow-elevated border border-border/50 p-8"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <TierChip tier={selected.tier} />
                <span className="text-xs text-muted-foreground tabular-nums">0{selected.id}</span>
              </div>

              <h3 className="font-display text-3xl font-medium leading-tight mb-1">
                {selected.name}
              </h3>
              {selected.shortName && (
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {selected.shortName}
                </p>
              )}
              <p className="text-foreground/80 leading-relaxed mb-6">{selected.positioning}</p>

              <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-border/60">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                    5Y Outlook
                  </p>
                  <StarRow value={TIER_META[selected.tier].outlook5y} />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                    10Y Outlook
                  </p>
                  <StarRow value={TIER_META[selected.tier].outlook10y} />
                </div>
              </div>

              <div className="space-y-3 mb-2">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      Risk Level
                    </p>
                    <p className="text-sm text-foreground">{TIER_META[selected.tier].riskLevel}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      Ideal For
                    </p>
                    <p className="text-sm text-foreground">{TIER_META[selected.tier].idealFor}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 mt-0.5 shrink-0 rounded-full"
                    style={{ backgroundColor: TIER_HSL[selected.tier] }}
                  />
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      Tier Classification
                    </p>
                    <p className="text-sm text-foreground">
                      {TIER_META[selected.tier].label} — {TIER_META[selected.tier].sub}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DubaiInvestmentMap;
