import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const ContactCTA = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-body">
              Get Started
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Let's Make It <span className="text-gradient-gold">Simple for You</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
              Whether you want to understand where real appreciation is happening, which developers
              are reliable, or how to enter smart and secure —
            </p>
            <p className="text-foreground text-lg font-medium">
              I'll guide you through it. Transparent, no pressure, no obligation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-card rounded-2xl p-8 md:p-12 border border-border shadow-card"
          >
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Shekhar Beura
                </h3>
                <p className="text-primary text-sm font-semibold mb-6 tracking-wide">
                  Altira Aura Real Estate
                </p>

                <div className="space-y-4">
                  <a
                    href="tel:+971569510061"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">(+971) 569 510 061</span>
                  </a>

                  <a
                    href="mailto:shekhar@altiraaura.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">shekhar@altiraaura.com</span>
                  </a>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">
                      2007, Grosvenor Business Tower,
                      <br />
                      Barsha Heights, Dubai, UAE
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground text-sm mb-6">
                  Just a real conversation to help you make the right call.
                </p>
                <a
                  href="https://wa.me/971569510061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-all shadow-gold w-full justify-center"
                >
                  <MessageCircle className="w-5 h-5" />
                  DM on WhatsApp
                </a>
                <p className="text-xs text-muted-foreground mt-4">
                  Available 7 days a week · Response within 1 hour
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-border pt-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-sm">A</span>
            </div>
            <span className="font-display text-sm text-muted-foreground">
              Altira Aura Real Estate
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Altira Aura Real Estate. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
