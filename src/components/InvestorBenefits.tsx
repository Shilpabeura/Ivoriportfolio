import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Home, Award } from "lucide-react";
import dubaiInterior from "@/assets/dubai-interior.jpg";

const benefits = [
  {
    icon: ArrowUpRight,
    title: "Strong Appreciation",
    description: "Appreciation across prime and emerging areas with proven growth trajectories.",
    stat: "50%+",
    statLabel: "Avg. appreciation at handover",
  },
  {
    icon: Zap,
    title: "High Liquidity",
    description: "Faster exits with high demand ensuring your investment remains liquid.",
    stat: "Fast",
    statLabel: "Exit possibilities",
  },
  {
    icon: Home,
    title: "Low Entry Off-Plan",
    description: "Off-plan opportunities with low entry points — start with as little as 60/40 payment plans.",
    stat: "60/40",
    statLabel: "Payment plan available",
  },
  {
    icon: Award,
    title: "Golden Visa Eligibility",
    description: "Investments of AED 2M+ qualify for the UAE Golden Visa — your gateway to residency.",
    stat: "2M",
    statLabel: "AED for Golden Visa",
  },
];

const InvestorBenefits = () => {
  return (
    <section id="investor" className="py-24 md:py-32 bg-section-alt relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-body">
                Investor Advantage
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                What This Means{" "}
                <span className="text-gradient-gold">For You</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                You don't need millions to start — you need clarity.
              </p>
            </motion.div>

            <div className="space-y-5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-500 group shadow-card"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-11 h-11 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-2">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {benefit.title}
                        </h3>
                        <div className="text-right flex-shrink-0 ml-4">
                          <span className="font-display text-xl font-bold text-gradient-gold">
                            {benefit.stat}
                          </span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="sticky top-32 hidden lg:block"
          >
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={dubaiInterior}
                alt="Luxury Dubai villa interior"
                className="w-full h-[520px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-6 p-6 bg-background rounded-xl border border-border shadow-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Investment starts from
              </p>
              <p className="font-display text-2xl font-bold text-foreground">
                AED 500,000
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                With flexible 60/40 payment plans
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InvestorBenefits;
