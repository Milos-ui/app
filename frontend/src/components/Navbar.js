import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_5eeb7c69-554b-42cc-a1a9-e49a05bba873/artifacts/ehc75kbw_image.png";

const navLinks = [
  { label: "So funktioniert es", href: "#how-it-works" },
  { label: "Branchen", href: "#industries" },
  { label: "Über uns", href: "#about" },
  { label: "Termin buchen", href: "#booking" },
  { label: "Kontakt", href: "#contact" },
];

export default function Navbar({ onDemoClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        data-testid="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-void-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3" data-testid="logo-link">
              <img
                src={LOGO_URL}
                alt="Solve Automations"
                className="h-8 md:h-10 w-auto invert"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium whitespace-nowrap"
                  data-testid={`nav-${link.href.replace('#', '')}`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={onDemoClick}
                className="flex items-center gap-2 bg-electric-blue hover:bg-electric-blue-hover text-white px-5 xl:px-6 py-2.5 xl:py-3 rounded-full font-semibold text-sm transition-all glow-blue glow-blue-hover whitespace-nowrap"
                data-testid="nav-demo-btn"
              >
                <Phone className="w-4 h-4" />
                Demo-Anruf
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
              data-testid="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-void-black pt-20 md:pt-24 px-4 md:px-6 lg:hidden overflow-y-auto"
          data-testid="mobile-menu"
        >
          <div className="flex flex-col gap-4 md:gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-lg md:text-xl text-white font-medium text-left py-3 border-b border-white/10"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onDemoClick();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-electric-blue text-white px-6 py-4 rounded-full font-semibold mt-4"
              data-testid="mobile-demo-btn"
            >
              <Phone className="w-5 h-5" />
              Demo-Anruf testen
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
