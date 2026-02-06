import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Home, Award } from "lucide-react";

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
    <section id="investor" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-body">
            Investor Advantage
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            What This Means <span className="text-gradient-gold">For You</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            You don't need millions to start — you need clarity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-gradient-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-500 group overflow-hidden shadow-card"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-right">
                    <p className="font-display text-3xl font-bold text-gradient-gold">
                      {benefit.stat}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {benefit.statLabel}
                    </p>
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestorBenefits;
