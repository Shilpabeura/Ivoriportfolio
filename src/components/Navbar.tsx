import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

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
              Real Estate Advisor
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
          <a href="#markets" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Markets
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Contact
          </a>
          <a
            href="https://wa.me/971569510061"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Shekhar on WhatsApp"
            className="group flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1ebe5d] hover:shadow-lg transition-all cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.89c0 2.1.55 4.15 1.6 5.96L0 24l6.31-1.66a11.87 11.87 0 0 0 5.74 1.46h.01c6.56 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.43-8.43zM12.06 21.4h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.21-3.74.98 1-3.64-.23-.37a9.49 9.49 0 0 1-1.46-5.05c0-5.25 4.28-9.53 9.54-9.53 2.55 0 4.94.99 6.74 2.8a9.46 9.46 0 0 1 2.79 6.74c0 5.26-4.28 9.53-9.53 9.53zm5.5-7.13c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.24-.24-.59-.49-.51-.68-.52l-.58-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
