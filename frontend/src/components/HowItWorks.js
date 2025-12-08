import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneIncoming, Bot, Workflow, BarChart3, Headphones } from "lucide-react";

const steps = [
  {
    icon: PhoneIncoming,
    title: "Call Comes In",
    description: "Your customer calls your business number. Our AI instantly picks up—no waiting.",
  },
  {
    icon: Bot,
    title: "AI Engages",
    description: "Natural voice conversation powered by advanced language models understands intent.",
  },
  {
    icon: Workflow,
    title: "Smart Routing",
    description: "Based on the conversation, AI handles the request or routes to the right department.",
  },
  {
    icon: BarChart3,
    title: "Action & Data",
    description: "Bookings are made, info is recorded, and insights are captured automatically.",
  },
  {
    icon: Headphones,
    title: "Seamless Handoff",
    description: "Complex cases are escalated to humans with full context—nothing is lost.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="section-padding bg-void-paper relative overflow-hidden"
      data-testid="how-it-works-section"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">
            How It Works
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Five steps to better calls
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From the moment your phone rings to resolution—see how our AI transforms every customer interaction.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-5 gap-6 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-electric-blue/50 via-electric-blue/30 to-electric-blue/50" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="relative"
            >
              {/* Step Number & Icon */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-void-black border border-white/10 flex items-center justify-center relative z-10">
                    <step.icon className="w-7 h-7 text-electric-blue" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-electric-blue flex items-center justify-center text-xs font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
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
