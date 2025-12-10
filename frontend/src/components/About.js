import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Users, Globe } from "lucide-react";

const ABOUT_IMAGE = "https://images.pexels.com/photos/7644068/pexels-photo-7644068.jpeg";

const values = [
  {
    icon: Shield,
    title: "Enterprise-Sicherheit",
    description: "DSGVO-konform, ISO 27001, Ende-zu-Ende-Verschlüsselung.",
  },
  {
    icon: Zap,
    title: "Modernste KI",
    description: "Neueste Sprachmodelle für natürliche Gespräche.",
  },
  {
    icon: Users,
    title: "Mensch im Fokus",
    description: "KI, die Ihr Team unterstützt, nicht ersetzt.",
  },
  {
    icon: Globe,
    title: "Globale Reichweite",
    description: "Mehrsprachiger Support für weltweite Kunden.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-void-black relative overflow-hidden"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center px-4">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={ABOUT_IMAGE}
                alt="Solve Automations Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-void-black/40 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-void-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6 max-w-[200px] md:max-w-xs"
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-electric-blue mb-1">70%</div>
              <div className="text-xs md:text-sm text-gray-400">Durchschnittliche Kostenreduzierung für unsere Kunden</div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">
              Über uns
            </span>
            
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              Pioniere der KI-gestützten Geschäftskommunikation
            </h2>
            
            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
              Solve Automations ist ein Technologieunternehmen, das sich auf die Transformation 
              der telefonischen Unternehmenskommunikation spezialisiert hat. Wir kombinieren 
              modernste KI mit Enterprise-Zuverlässigkeit.
            </p>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 md:p-4 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-4 h-4 md:w-5 md:h-5 text-electric-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm md:text-base mb-1">{value.title}</h4>
                    <p className="text-xs md:text-sm text-gray-400">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
