import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Users, Globe } from "lucide-react";

const ABOUT_IMAGE = "https://images.pexels.com/photos/7644068/pexels-photo-7644068.jpeg";

const values = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "GDPR compliant, SOC 2 certified, end-to-end encryption.",
  },
  {
    icon: Zap,
    title: "Cutting-Edge AI",
    description: "Powered by the latest language models for natural conversations.",
  },
  {
    icon: Users,
    title: "Human-Centric",
    description: "AI that enhances your team, not replaces them.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Multilingual support for worldwide customer base.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-void-paper relative overflow-hidden"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
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
              className="absolute -bottom-6 -right-6 bg-void-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 max-w-xs"
            >
              <div className="text-4xl font-heading font-bold text-electric-blue mb-1">70%</div>
              <div className="text-sm text-gray-400">Average cost reduction for our clients</div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">
              About Us
            </span>
            
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Pioneering AI-powered business communication
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Solve Automations is a technology company focused on transforming how businesses 
              handle phone communications. We combine cutting-edge AI with enterprise-grade 
              reliability to deliver solutions that work.
            </p>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{value.title}</h4>
                    <p className="text-sm text-gray-400">{value.description}</p>
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
