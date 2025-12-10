import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Send, User, Mail, Building, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus");
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.post(`${API}/leads`, formData);
      setSubmitted(true);
      toast.success("Nachricht gesendet! Wir melden uns bald bei Ihnen.");
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Fehler beim Senden. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding bg-void-black relative overflow-hidden"
      data-testid="contact-section"
    >
      <div className="max-w-4xl mx-auto relative z-10 px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">
            Kontakt
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
            Haben Sie Fragen?
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Schreiben Sie uns eine Nachricht und unser Team meldet sich innerhalb von 24 Stunden bei Ihnen.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {submitted ? (
            <div className="bg-void-paper border border-white/10 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8 text-green-400" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-4">
                Nachricht gesendet!
              </h3>
              <p className="text-gray-400">
                Vielen Dank für Ihre Anfrage. Wir melden uns zeitnah unter {formData.email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-void-paper border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-10">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Vollständiger Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Max Mustermann"
                      className="w-full pl-10 md:pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all text-sm md:text-base"
                      data-testid="contact-name-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">E-Mail-Adresse *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="max@unternehmen.de"
                      className="w-full pl-10 md:pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all text-sm md:text-base"
                      data-testid="contact-email-input"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Unternehmen</label>
                <div className="relative">
                  <Building className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Ihr Unternehmen GmbH"
                    className="w-full pl-10 md:pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all text-sm md:text-base"
                    data-testid="contact-company-input"
                  />
                </div>
              </div>
              
              <div className="mb-6 md:mb-8">
                <label className="block text-sm font-medium text-gray-400 mb-2">Nachricht *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 md:left-4 top-4 w-5 h-5 text-gray-500" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Erzählen Sie uns von Ihrem Projekt oder stellen Sie uns Ihre Fragen..."
                    rows={5}
                    className="w-full pl-10 md:pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all resize-none text-sm md:text-base"
                    data-testid="contact-message-input"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-electric-blue hover:bg-electric-blue-hover disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all glow-blue glow-blue-hover"
                data-testid="contact-submit-btn"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Nachricht senden
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
