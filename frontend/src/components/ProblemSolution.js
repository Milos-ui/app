import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { XCircle, CheckCircle2 } from "lucide-react";

// Reduced to 3 items per category as requested
const problems = [
  "Verpasste Anrufe außerhalb der Geschäftszeiten",
  "Hohe Kosten für 24/7-Callcenter-Betrieb",
  "Inkonsistente Servicequalität bei hohem Anrufaufkommen",
];

const solutions = [
  "KI beantwortet jeden Anruf sofort – 24/7/365",
  "Reduzieren Sie Betriebskosten um bis zu 70%",
  "Gleichbleibend professionelle Antworten – jedes Mal",
];

export default function ProblemSolution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-void-black relative">
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">
            Das Problem
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 px-4">
            Ihre Kunden verdienen besseren Service
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            Traditioneller Telefon-Support kann mit modernen Kundenerwartungen nicht mithalten.
            So ändert sich das mit Solve Automations.
          </p>
        </motion.div>

        {/* Problem vs Solution Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 px-4">
          {/* Problems Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="font-heading text-lg md:text-xl font-semibold text-white">Ohne KI-Assistent</h3>
            </div>
            
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{problem}</p>
              </div>
            ))}
          </motion.div>

          {/* Solutions Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-electric-blue" />
              </div>
              <h3 className="font-heading text-lg md:text-xl font-semibold text-white">Mit Solve KI</h3>
            </div>
            
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-electric-blue/5 border border-electric-blue/20"
              >
                <CheckCircle2 className="w-5 h-5 text-electric-blue mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">{solution}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
