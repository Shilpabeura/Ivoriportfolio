import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
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
                  <p className="text-primary text-sm font-semibold mb-1 tracking-wide">
                    Dubai Real Estate Advisor
                  </p>
                  <p className="text-muted-foreground text-xs mb-4 tracking-wide uppercase">
                    Altira Aura Real Estate
                  </p>
                  <p className="text-muted-foreground text-sm mb-6">
                    In Dubai since 2012 · From Bhubaneswar, one of you
                  </p>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Just a real conversation to help you make the right call.
                    Happy to connect 1:1.
                  </p>
                </div>

                {/* Right: Contact details */}
                <div className="space-y-5 pt-16 md:pt-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">WhatsApp / Call</p>
                      <p className="text-foreground text-lg font-bold font-display tracking-wide">
                        +971 56 951 0061
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                      <p className="text-foreground text-sm font-medium">
                        shekhar@altiraaura.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Office</p>
                      <p className="text-foreground text-sm">
                        2007, Grosvenor Business Tower,
                        <br />
                        Barsha Heights, Dubai, UAE
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Available 7 days a week · Response within 1 hour
                    </p>
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
          <div>
            <span className="font-display text-sm text-foreground font-semibold">
              Shekhar Beura
            </span>
            <span className="text-muted-foreground text-sm ml-2">
              · Altira Aura Real Estate
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
