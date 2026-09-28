import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import shekharPhoto from "@/assets/shekhar-profile.jpg";
import dubaiHero from "@/assets/dubai-hero.jpg";

const ContactCTA = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-body">
              Get Started
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Let's Make It <span className="text-gradient-gold">Simple for{"\u00A0"}You</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
              Whether you want to understand where real appreciation is happening, which developers
              are reliable, or how to enter smart and secure —
            </p>
            <p className="text-foreground text-lg font-medium">
               We'll guide you through it — transparent, no pressure, no obligation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background rounded-2xl border border-border shadow-elevated overflow-hidden"
          >
            {/* Dubai skyline banner */}
            <div className="relative h-32 overflow-hidden">
              <img
                src={dubaiHero}
                alt="Dubai skyline"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 to-foreground/60" />
            </div>

            <div className="p-8 md:p-12 -mt-16 relative">
              <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Left: Shekhar's info */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <img
                    src={shekharPhoto}
                    alt="Shekhar Beura"
                    className="w-28 h-28 rounded-full object-cover border-4 border-background shadow-elevated mb-5"
                  />

                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                    Shekhar Beura
                  </h3>
                  <p className="text-primary text-sm font-semibold mb-4 tracking-wide">
                     Founder &amp; Lead Advisor, Ivori
                  </p>
                </div>

                {/* Right: Contact details */}
                <div className="space-y-5 pt-16 md:pt-12">
                  <a
                    href="https://wa.me/971569510061"
                    target="_blank"
                    rel="noopener noreferrer"
                     aria-label="Chat with Ivori on WhatsApp"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/30 hover:shadow-gold transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-foreground" aria-hidden="true">
                        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.89c0 2.1.55 4.15 1.6 5.96L0 24l6.31-1.66a11.87 11.87 0 0 0 5.74 1.46h.01c6.56 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.43-8.43zM12.06 21.4h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.21-3.74.98 1-3.64-.23-.37a9.49 9.49 0 0 1-1.46-5.05c0-5.25 4.28-9.53 9.54-9.53 2.55 0 4.94.99 6.74 2.8a9.46 9.46 0 0 1 2.79 6.74c0 5.26-4.28 9.53-9.53 9.53zm5.5-7.13c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.24-.24-.59-.49-.51-.68-.52l-.58-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-primary uppercase tracking-wider mb-1">Chat on WhatsApp · Tap to open</p>
                      <p className="text-foreground text-lg font-bold font-display tracking-wide">
                        +971 56 951 0061
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                      <p className="text-foreground text-sm font-medium">
                        beura.shekhar@gmail.com
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-border pt-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src="/ivori-logo.png" alt="Ivori" className="h-7 w-auto" />
            <span className="text-muted-foreground text-xs">
              Dubai real estate investment advisory
            </span>
          </div>
          <div className="flex flex-col md:items-end gap-2 text-center md:text-right">
            <div className="flex items-center gap-4 text-sm">
              <a href="#roi" className="text-muted-foreground hover:text-primary transition-colors">ROI</a>
              <a href="https://wa.me/971569510061" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">WhatsApp</a>
              <a href="mailto:beura.shekhar@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">Email</a>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Ivori Portfolio Real Estate L.L.C. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
