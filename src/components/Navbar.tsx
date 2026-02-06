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
          <div>
            <h1 className="font-display text-xl font-bold text-foreground tracking-wide">
              Shekhar Beura
            </h1>
            <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
              Altira Aura Real Estate
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
          <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Contact
          </a>
          <div className="flex items-center gap-2 bg-gradient-gold text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold">
            <Phone className="w-4 h-4" />
            +971 56 951 0061
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
