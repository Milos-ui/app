import { motion } from "framer-motion";
import { Phone, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

const HERO_BG = "https://images.pexels.com/photos/18545023/pexels-photo-18545023.jpeg";

const benefits = [
  "24/7 Erreichbarkeit",
  "Natürliche Sprachgespräche",
  "Individuelle Workflows",
];

export default function Hero({ onDemoClick }) {
  const scrollToBooking = () => {
    const element = document.querySelector("#booking");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black/90 via-void-black/85 to-void-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 lg:py-40">
        <div className="text-center max-w-4xl mx-auto">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-400">
              KI-Telefonassistent für Unternehmen
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 leading-tight"
            data-testid="hero-headline"
          >
            Ihr KI-Telefonassistent
            <br />
            <span className="text-electric-blue">für besseren Kundenservice</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
            data-testid="hero-subheadline"
          >
            Automatisieren Sie Ihre Kundenanrufe mit modernster KI-Technologie.
            Besserer Service bei niedrigeren Kosten – rund um die Uhr verfügbar.
          </motion.p>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm md:text-base text-gray-300"
              >
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-electric-blue flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onDemoClick}
              className="group flex items-center gap-3 bg-electric-blue hover:bg-electric-blue-hover text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all glow-blue glow-blue-hover w-full sm:w-auto justify-center"
              data-testid="hero-demo-btn"
            >
              <Phone className="w-5 h-5" />
              Demo-Anruf testen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={scrollToBooking}
              className="flex items-center gap-3 bg-transparent border border-white/20 hover:bg-white/10 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-base md:text-lg backdrop-blur-sm transition-all w-full sm:w-auto justify-center"
              data-testid="hero-book-btn"
            >
              <Calendar className="w-5 h-5" />
              Termin vereinbaren
            </button>
          </motion.div>

          {/* Trust Indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-xs md:text-sm text-gray-500"
          >
            DSGVO-konform • Enterprise-Sicherheit • Made in Germany
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white/40 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
