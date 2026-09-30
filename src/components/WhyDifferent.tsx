import { motion } from "framer-motion";
import { TrendingUp, Building2, Shield, Banknote, DollarSign } from "lucide-react";
import dubaiSkyline from "@/assets/dubai-skyline.jpg";

const reasons = [
  {
    icon: TrendingUp,
    title: "Population-Driven Appreciation",
    description: "Strong appreciation driven by rapid population growth and sustained demand across all segments.",
  },
  {
    icon: Building2,
    title: "Mega Projects Reshaping the City",
    description: "Landmark developments are transforming Dubai's landscape, creating unprecedented investment corridors.",
  },
  {
    icon: Shield,
    title: "Safe & Transparent Market",
    description: "RERA-regulated market with robust legal frameworks ensuring investor protection and transparency.",
  },
  {
    icon: Banknote,
    title: "0% Property & Capital Gains Tax",
    description: "Zero property tax and zero capital gains tax — your returns stay yours, in full.",
  },
  {
    icon: DollarSign,
    title: "USD-Pegged Currency",
    description: "AED pegged to USD provides currency stability, eliminating foreign exchange risk for global investors.",
  },
];

const WhyDifferent = () => {
  return (
    <section id="why" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Editorial layout — image + text side-by-side */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-none overflow-hidden shadow-elevated">
              <img
                src={dubaiSkyline}
                alt="Dubai futuristic skyline"
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-foreground/30 rounded-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-body">
              Market Intelligence
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Why Dubai Continues to{" "}
              <em className="accent-word">Outperform Global{"\u00A0"}Markets</em>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-3">
              Dubai isn't just growing — it's accelerating.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-3">
              This is not driven by short-term sentiment or speculation. It reflects deeper structural strength built on long-term planning, global capital inflows, and sustained end-user demand.
            </p>
            <p className="text-foreground text-lg font-medium">
              This is not hype. It's fundamentals.
            </p>
          </motion.div>
        </div>

        {/* Reason cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-background rounded-lg p-8 border border-border hover:border-foreground/40 transition-all duration-500 group shadow-card ${
                index === 4 ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-none bg-secondary border border-border flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <reason.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDifferent;
