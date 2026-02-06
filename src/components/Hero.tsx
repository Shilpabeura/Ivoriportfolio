import { motion } from "framer-motion";
import { ArrowDown, Phone } from "lucide-react";
import heroImage from "@/assets/dubai-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Dubai skyline at golden hour"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero-overlay)" }}
        />
      </div>

      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-gold opacity-60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-primary font-body text-sm md:text-base tracking-[0.3em] uppercase mb-6">
            Dubai Investment Opportunity 2026
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1] mb-6">
            Dubai's Real Estate
            <br />
            <span className="text-gradient-gold">Bull Run Is Here</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Don't watch it from the sidelines. <span className="text-foreground font-medium">Profit from it.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/971569510061"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-all shadow-gold"
          >
            <Phone className="w-5 h-5" />
            Start a Conversation
          </a>
          <a
            href="#roi"
            className="flex items-center gap-2 border border-primary/30 text-primary px-8 py-4 rounded-full text-base font-medium hover:bg-primary/5 transition-all"
          >
            View ROI Analysis
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#why" className="text-primary/50 hover:text-primary transition-colors">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
