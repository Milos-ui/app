import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneIncoming, Bot, Workflow, XCircle, CheckCircle2, Clock, Zap, Users, Brain } from "lucide-react";

const comparisonSteps = [
  {
    step: 1,
    title: "Anrufannahme",
    icon: PhoneIncoming,
    without: {
      title: "Ohne KI",
      description: "Kunde wartet in der Warteschleife. Bei hohem Aufkommen oder außerhalb der Geschäftszeiten geht der Anruf verloren.",
      icon: Clock,
    },
    with: {
      title: "Mit Solve KI",
      description: "Sofortige Annahme – jeder Anruf wird in Sekundenbruchteilen beantwortet, 24 Stunden am Tag, 365 Tage im Jahr.",
      icon: Zap,
    },
  },
  {
    step: 2,
    title: "Anliegen verstehen",
    icon: Bot,
    without: {
      title: "Ohne KI",
      description: "Mitarbeiter muss nachfragen, Missverständnisse entstehen. Qualität hängt von Tagesform und Erfahrung ab.",
      icon: Users,
    },
    with: {
      title: "Mit Solve KI",
      description: "Modernste Spracherkennung versteht Kontext und Intention sofort. Konsistente Qualität bei jedem Gespräch.",
      icon: Brain,
    },
  },
  {
    step: 3,
    title: "Bearbeitung & Weiterleitung",
    icon: Workflow,
    without: {
      title: "Ohne KI",
      description: "Manuelle Weiterleitung, oft an falsche Abteilung. Kunde muss Anliegen mehrfach erklären.",
      icon: XCircle,
    },
    with: {
      title: "Mit Solve KI",
      description: "Intelligente Analyse und sofortige Bearbeitung oder zielgenaue Weiterleitung mit vollständigem Kontext.",
      icon: CheckCircle2,
    },
  },
];

export default function ProcessComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="section-padding bg-void-black relative overflow-hidden"
      data-testid="process-comparison-section"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">
            Direkter Vergleich
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
            So arbeitet unsere KI für Sie
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Sehen Sie den Unterschied: Die ersten drei Schritte im direkten Vergleich
            zwischen traditionellem Support und unserem KI-Assistenten.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="space-y-8 md:space-y-12 px-4">
          {comparisonSteps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="relative"
            >
              {/* Step Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 md:w-7 md:h-7 text-electric-blue" />
                </div>
                <div>
                  <span className="text-electric-blue text-sm font-mono">Schritt {item.step}</span>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Comparison Grid */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* Without AI */}
                <div className="p-5 md:p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <item.without.icon className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="font-semibold text-red-400">{item.without.title}</span>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {item.without.description}
                  </p>
                </div>

                {/* With AI */}
                <div className="p-5 md:p-6 rounded-2xl bg-electric-blue/5 border border-electric-blue/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                      <item.with.icon className="w-4 h-4 text-electric-blue" />
                    </div>
                    <span className="font-semibold text-electric-blue">{item.with.title}</span>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {item.with.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
