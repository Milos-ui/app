import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneIncoming, Bot, Workflow, BarChart3, Headphones } from "lucide-react";

const steps = [
  {
    icon: PhoneIncoming,
    title: "Anruf eingehend",
    description: "Ihr Kunde ruft an. Unsere KI nimmt sofort ab – ohne Wartezeit.",
  },
  {
    icon: Bot,
    title: "KI versteht",
    description: "Natürliche Spracherkennung erfasst das Anliegen des Kunden präzise.",
  },
  {
    icon: Workflow,
    title: "Intelligente Weiterleitung",
    description: "Die KI bearbeitet die Anfrage oder leitet an die richtige Abteilung weiter.",
  },
  {
    icon: BarChart3,
    title: "Aktion & Daten",
    description: "Termine werden gebucht, Infos erfasst und Erkenntnisse automatisch gespeichert.",
  },
  {
    icon: Headphones,
    title: "Nahtlose Übergabe",
    description: "Komplexe Fälle werden mit vollständigem Kontext an Mitarbeiter übergeben.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="section-padding bg-void-paper relative"
      data-testid="how-it-works-section"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 lg:mb-20 px-4"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-200 mb-6 drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
            So funktioniert es
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
            Fünf Schritte zu besserem Service
          </h2>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
            Vom Klingeln bis zur Lösung – so transformiert unsere KI jede Kundeninteraktion.
          </p>
        </motion.div>

        {/* Steps Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4 xl:gap-6 relative px-4">
          {/* Connector Line */}
          <div 
            className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-electric-blue/50 via-electric-blue/30 to-electric-blue/50"
            style={{ zIndex: 1 }}
          />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="relative z-10"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-2xl bg-void-black border border-white/10 flex items-center justify-center relative z-20">
                    <step.icon className="w-7 h-7 xl:w-8 xl:h-8 text-electric-blue" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-electric-blue flex items-center justify-center text-xs xl:text-sm font-bold text-white z-30">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="font-heading text-base xl:text-lg font-semibold text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                  {step.title}
                </h3>
                <p className="text-xs xl:text-sm text-gray-200 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Steps Grid - Tablet */}
        <div className="hidden md:grid md:grid-cols-3 lg:hidden gap-6 px-4 mb-8">
          {steps.slice(0, 3).map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center p-4 bg-void-black/50 rounded-2xl border border-white/5">
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-xl bg-void-black border border-white/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-electric-blue flex items-center justify-center text-xs font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-heading text-base font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6 px-4 max-w-xl mx-auto">
          {steps.slice(3, 5).map((step, index) => (
            <motion.div
              key={index + 3}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center p-4 bg-void-black/50 rounded-2xl border border-white/5">
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-xl bg-void-black border border-white/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-electric-blue flex items-center justify-center text-xs font-bold text-white">
                    {index + 4}
                  </div>
                </div>
                <h3 className="font-heading text-base font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Steps Grid - Mobile */}
        <div className="md:hidden space-y-4 px-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-void-black/50 rounded-xl border border-white/5"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-void-black border border-white/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-electric-blue" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-electric-blue flex items-center justify-center text-xs font-bold text-white">
                  {index + 1}
                </div>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
