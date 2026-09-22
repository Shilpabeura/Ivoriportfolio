import { motion } from "framer-motion";
import shekharPhoto from "@/assets/shekhar-profile.jpg";

const expertise = [
  "Off-plan and ready properties",
  "Payment-plan structuring",
  "Investment and exit planning",
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-section-alt">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-5">
              About Ivori
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-7">
              Advice built around the investment — not the sale.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Ivori Portfolio Real Estate L.L.C is an investor-first Dubai property advisory. We help clients evaluate opportunities with clarity, from market and developer selection to payment-plan structure and long-term exit potential.
            </p>
            <p className="text-foreground leading-relaxed mb-9">
              Our approach brings together local market perspective and disciplined financial thinking, so every recommendation is grounded in what the property needs to achieve for you.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 border-t border-border pt-7">
              {expertise.map((item) => (
                <p key={item} className="text-sm text-foreground font-medium leading-snug">
                  {item}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="border-l-2 border-primary pl-7 md:pl-10 py-4"
          >
            <p className="font-display text-2xl md:text-3xl text-foreground leading-relaxed mb-8">
              “The right property decision starts with understanding the investor — their priorities, timeline and appetite for risk.”
            </p>
            <div className="flex items-center gap-4">
              <img
                src={shekharPhoto}
                alt="Shekhar Beura, Founder and Lead Advisor at Ivori"
                className="w-16 h-16 rounded-full object-cover border-2 border-background shadow-soft"
              />
              <div>
                <p className="font-display text-lg font-bold text-foreground">Shekhar Beura</p>
                <p className="text-sm text-muted-foreground">Founder &amp; Lead Advisor, Ivori</p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default About;