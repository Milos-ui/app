import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const industries = [
  {
    image: "https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg",
    label: "Logistik & Lieferkette",
    description: "Sendungsverfolgung, Lieferanfragen und Disposition automatisch bearbeiten.",
  },
  {
    image: "https://images.pexels.com/photos/6914031/pexels-photo-6914031.jpeg",
    label: "Unternehmen & Konzerne",
    description: "Anrufe effizient routen, HR-Anfragen bearbeiten, IT-Support-Tickets verwalten.",
  },
  {
    image: "https://images.pexels.com/photos/7562088/pexels-photo-7562088.jpeg",
    label: "Technologie & SaaS",
    description: "Leads qualifizieren, technischen Support bieten und Abonnement-Anfragen bearbeiten.",
  },
];

export default function Industries() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="industries"
      ref={ref}
      className="section-padding bg-void-paper relative overflow-hidden"
      data-testid="industries-section"
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
            Branchen
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
            Für jede Branche geeignet
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Unsere KI passt sich Ihren spezifischen Geschäftsanforderungen an –
            ob Logistik, Enterprise oder Technologie.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              data-testid={`industry-card-${index}`}
            >
              {/* Image */}
              <img
                src={industry.image}
                alt={industry.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/50 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                <h3 className="font-heading text-lg md:text-xl font-semibold text-white mb-2">
                  {industry.label}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {industry.description}
                </p>
              </div>
              
              {/* Border Glow on Hover */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-electric-blue/50 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
