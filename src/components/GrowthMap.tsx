import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Shield, TrendingUp, Target } from "lucide-react";
import dubaiMap from "@/assets/dubai-growth-map.png";

type Tier = 1 | 2 | 3;

interface Region {
  id: number;
  name: string;
  tier: Tier;
  fiveYear: number;
  tenYear: number;
  risk: string;
  idealFor: string;
  // position as % of image
  x: number;
  y: number;
  size?: number; // hotspot diameter in % of width
}

const TIER_META: Record<Tier, { label: string; definition: string; color: string; ring: string }> = {
  1: {
    label: "Tier 1",
    definition: "Highest Growth Potential",
    color: "bg-[#6366f1]/30 border-[#6366f1]/60",
    ring: "ring-[#6366f1]/40",
  },
  2: {
    label: "Tier 2",
    definition: "Strong Growth Potential",
    color: "bg-[#f59e0b]/30 border-[#f59e0b]/60",
    ring: "ring-[#f59e0b]/40",
  },
  3: {
    label: "Tier 3",
    definition: "Mature Growth Potential",
    color: "bg-[#a3a380]/30 border-[#a3a380]/60",
    ring: "ring-[#a3a380]/40",
  },
};

const REGIONS: Region[] = [
  { id: 1, name: "Dubai South", tier: 1, fiveYear: 5, tenYear: 5, risk: "Medium", idealFor: "Capital Appreciation (long term)", x: 37.2, y: 87, size: 9 },
  { id: 2, name: "Expo City Dubai", tier: 1, fiveYear: 5, tenYear: 5, risk: "Medium", idealFor: "Capital Appreciation (long term)", x: 36.6, y: 73.3, size: 5 },
  { id: 3, name: "Dubai Land", tier: 1, fiveYear: 5, tenYear: 5, risk: "Medium", idealFor: "Capital Appreciation (long term)", x: 58.6, y: 45, size: 7 },
  { id: 4, name: "Dubai Hills Estate", tier: 2, fiveYear: 4, tenYear: 4, risk: "Low-Medium", idealFor: "Balance of Yield and Growth", x: 50.8, y: 38.6, size: 5 },
  { id: 5, name: "Dubai Silicon Oasis", tier: 2, fiveYear: 4, tenYear: 4, risk: "Low-Medium", idealFor: "Balance of Yield and Growth", x: 59.9, y: 34.7, size: 5 },
  { id: 6, name: "Meydan / MBR City", tier: 2, fiveYear: 4, tenYear: 4, risk: "Low-Medium", idealFor: "Balance of Yield and Growth", x: 53.4, y: 30.3, size: 5 },
  { id: 7, name: "Downtown Dubai", tier: 3, fiveYear: 4, tenYear: 4, risk: "Low", idealFor: "Income and Wealth Preservation", x: 52.2, y: 13.7, size: 4 },
  { id: 8, name: "Business Bay", tier: 3, fiveYear: 4, tenYear: 4, risk: "Low", idealFor: "Income and Wealth Preservation", x: 51, y: 23, size: 4 },
  { id: 9, name: "Dubai Marina", tier: 3, fiveYear: 4, tenYear: 4, risk: "Low", idealFor: "Income and Wealth Preservation", x: 46.4, y: 25.4, size: 4 },
  { id: 10, name: "Palm Jumeirah", tier: 3, fiveYear: 4, tenYear: 4, risk: "Low", idealFor: "Income and Wealth Preservation", x: 34.6, y: 38.1, size: 5 },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < count ? "fill-primary text-primary" : "text-muted-foreground/30"
        }`}
      />
    ))}
  </div>
);

const GrowthMap = () => {
  const [active, setActive] = useState<Region | null>(null);
  const [hovered, setHovered] = useState<Region | null>(null);

  return (
    <section id="map" className="py-24 md:py-32 bg-section-alt relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-body">
            Growth Opportunity Map
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Where Dubai's Capital{" "}
            <span className="text-gradient-gold">Is Concentrating</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore the city's highest-conviction investment zones — tap any hotspot for the full outlook.
          </p>
        </motion.div>

        {/* Tier legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {(Object.keys(TIER_META) as unknown as Tier[]).map((t) => {
            const meta = TIER_META[t as Tier];
            return (
              <div
                key={t}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-sm"
              >
                <span className={`w-3 h-3 rounded-full border ${meta.color}`} />
                <span className="font-medium text-foreground">{meta.label}</span>
                <span className="text-muted-foreground hidden sm:inline">— {meta.definition}</span>
              </div>
            );
          })}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative w-full rounded-2xl overflow-hidden shadow-elevated border border-border bg-background"
        >
          <div className="relative w-full" style={{ aspectRatio: "1920 / 1023" }}>
            <img
              src={dubaiMap}
              alt="Dubai investment growth map showing tiered zones"
              className="absolute inset-0 w-full h-full object-contain select-none"
              draggable={false}
            />

            {/* Hotspots */}
            {REGIONS.map((r) => {
              const meta = TIER_META[r.tier];
              const size = r.size ?? 5;
              return (
                <button
                  key={r.id}
                  onClick={() => setActive(r)}
                  onMouseEnter={() => setHovered(r)}
                  onMouseLeave={() => setHovered(null)}
                  aria-label={`${r.name} — ${meta.label}`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${meta.color} backdrop-blur-[1px] transition-all duration-300 hover:scale-110 hover:ring-4 ${meta.ring} cursor-pointer`}
                  style={{
                    left: `${r.x}%`,
                    top: `${r.y}%`,
                    width: `${size}%`,
                    aspectRatio: "1 / 1",
                  }}
                >
                  <span className="sr-only">{r.name}</span>
                  <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current" />
                </button>
              );
            })}

            {/* Hover tooltip */}
            <AnimatePresence>
              {hovered && !active && (
                <motion.div
                  key={hovered.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-20 pointer-events-none w-60 -translate-x-1/2 -translate-y-[calc(100%+16px)] bg-background border border-border shadow-xl rounded-xl p-4"
                  style={{ left: `${hovered.x}%`, top: `${hovered.y}%` }}
                >
                  <div className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold mb-1">
                    {TIER_META[hovered.tier].label} · {TIER_META[hovered.tier].definition}
                  </div>
                  <div className="font-display text-base font-bold text-foreground mb-2">
                    {hovered.name}
                  </div>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center">
                      <span>Risk</span>
                      <span className="text-foreground font-medium">{hovered.risk}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>5-Year</span>
                      <Stars count={hovered.fiveYear} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>10-Year</span>
                      <Stars count={hovered.tenYear} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Detail overlay */}
            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 bg-background/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                  onClick={() => setActive(null)}
                >
                  <motion.div
                    initial={{ scale: 0.95, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-background border border-border rounded-2xl shadow-elevated w-full max-w-md p-6 md:p-8 relative"
                  >
                    <button
                      onClick={() => setActive(null)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-2">
                      {TIER_META[active.tier].label} · {TIER_META[active.tier].definition}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                      {active.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="rounded-xl border border-border p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <TrendingUp className="w-3.5 h-3.5" /> 5-Year Outlook
                        </div>
                        <Stars count={active.fiveYear} />
                      </div>
                      <div className="rounded-xl border border-border p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <TrendingUp className="w-3.5 h-3.5" /> 10-Year Outlook
                        </div>
                        <Stars count={active.tenYear} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4">
                        <Shield className="w-4 h-4 text-primary mt-0.5" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground">Risk Level</div>
                          <div className="font-medium text-foreground">{active.risk}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4">
                        <Target className="w-4 h-4 text-primary mt-0.5" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground">Ideal For</div>
                          <div className="font-medium text-foreground">{active.idealFor}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile-friendly region list */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:hidden">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r)}
              className="text-left p-3 rounded-lg bg-background border border-border hover:border-primary/40 transition-colors"
            >
              <div className="text-[10px] tracking-wider uppercase text-primary">
                {TIER_META[r.tier].label}
              </div>
              <div className="text-sm font-medium text-foreground">{r.name}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthMap;
