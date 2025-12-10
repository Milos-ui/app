import { Phone, Mail, Linkedin, Twitter } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_5eeb7c69-554b-42cc-a1a9-e49a05bba873/artifacts/ehc75kbw_image.png";

const footerLinks = {
  product: [
    { label: "Funktionen", href: "#how-it-works" },
    { label: "Branchen", href: "#industries" },
    { label: "Preise", href: "#" },
    { label: "API", href: "#" },
  ],
  company: [
    { label: "Über uns", href: "#about" },
    { label: "Karriere", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Kontakt", href: "#contact" },
  ],
  legal: [
    { label: "Datenschutz", href: "#" },
    { label: "AGB", href: "#" },
    { label: "Impressum", href: "#" },
    { label: "Cookie-Richtlinie", href: "#" },
  ],
};

export default function Footer() {
  const scrollToSection = (href) => {
    if (href.startsWith("#") && href !== "#") {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-void-paper border-t border-white/10" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <img
              src={LOGO_URL}
              alt="Solve Automations"
              className="h-8 md:h-10 w-auto invert mb-4 md:mb-6"
            />
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-sm">
              Transformieren Sie Ihre Unternehmenskommunikation mit KI-gestützter Telefonautomatisierung.
              Enterprise-Zuverlässigkeit trifft modernste Technologie.
            </p>
            <div className="space-y-2 md:space-y-3">
              <a href="mailto:kontakt@solveautomations.de" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-electric-blue flex-shrink-0" />
                kontakt@solveautomations.de
              </a>
              <a href="tel:+4930123456789" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-electric-blue flex-shrink-0" />
                +49 30 123 456 789
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">Produkt</h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">Unternehmen</h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">Rechtliches</h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Solve Automations GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              data-testid="footer-linkedin"
            >
              <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              data-testid="footer-twitter"
            >
              <Twitter className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
