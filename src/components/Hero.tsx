import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import shekharPhoto from "@/assets/shekhar-profile.jpg";
import dubaiMarina from "@/assets/dubai-marina.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background — clean white with subtle texture */}
      <div className="absolute inset-0 bg-background" />

      {/* Hairline ink rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-foreground/20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              The{"\u00A0"}Smart{"\u00A0"}Money{"\u00A0"}Is
              <br />
              <em className="accent-word">Moving to{"\u00A0"}Dubai</em>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-4 font-light leading-relaxed">
              Don't just follow the trend — invest with confidence.
            </p>
            <p className="text-foreground text-lg max-w-xl mb-10 font-medium">
              An investor-focused perspective on market opportunities, payment plans, and how to invest with clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <a
                href="#contact"
                className="flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-all shadow-press"
              >
                Talk to Ivori
              </a>
              <a
                href="#roi"
                className="flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-full text-base font-medium hover:border-primary/40 hover:text-primary transition-all"
              >
                View ROI Analysis
              </a>
            </div>

            {/* Shekhar intro strip */}
            <div className="flex items-center gap-4">
              <img
                src={shekharPhoto}
                alt="Shekhar Beura - Dubai Real Estate Advisor"
                className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
              />
              <div>
                <p className="font-display text-base font-bold text-foreground">
                  Shekhar Beura
                </p>
                <p className="text-xs text-muted-foreground tracking-wide">
                  Founder &amp; Lead Advisor, Ivori
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Dubai image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-none overflow-hidden shadow-elevated">
              <img
                src={dubaiMarina}
                alt="Dubai Marina luxury waterfront"
                className="w-full h-[560px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-background rounded-none p-5 shadow-elevated border border-border"
            >
              <p className="label-folio mb-1">Avg. ROI</p>
              <p className="font-display text-3xl font-bold text-primary">50%+</p>
              <p className="text-xs text-muted-foreground mt-1">Based on last 5 year trend</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#why" className="text-muted-foreground/50 hover:text-primary transition-colors">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
