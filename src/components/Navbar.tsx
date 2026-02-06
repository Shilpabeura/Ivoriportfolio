import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-lg">A</span>
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold text-foreground tracking-wide">
              Altira Aura
            </h1>
            <p className="text-xs text-muted-foreground tracking-widest uppercase">
              Real Estate
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#why" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Why Dubai
          </a>
          <a href="#investor" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            For Investors
          </a>
          <a href="#roi" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ROI Calculator
          </a>
          <a
            href="https://wa.me/971569510061"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-gold text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4" />
            WhatsApp Me
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
