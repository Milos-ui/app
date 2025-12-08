import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";

const problems = [
  "Missed calls during peak hours or after business hours",
  "High costs for 24/7 human call center operations",
  "Inconsistent customer service quality",
  "Language barriers limiting global reach",
  "Long wait times frustrating customers",
];

const solutions = [
  "AI answers every call instantly, 24/7/365",
  "Reduce operational costs by up to 70%",
  "Consistent, professional responses every time",
  "Multilingual support out of the box",
  "Zero wait time with instant AI response",
];

export default function ProblemSolution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-void-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">
            The Challenge
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your customers deserve better
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Traditional phone support can't keep up with modern customer expectations.
            Here's what changes with Solve Automations.
          </p>
        </motion.div>

        {/* Problem vs Solution Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Problems Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white">Without AI</h3>
            </div>
            
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400">{problem}</p>
              </motion.div>
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
              <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-electric-blue" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white">With Solve AI</h3>
            </div>
            
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-electric-blue/5 border border-electric-blue/20"
              >
                <CheckCircle2 className="w-5 h-5 text-electric-blue mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">{solution}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
