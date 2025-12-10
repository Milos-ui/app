import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, User, Mail, Building, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, isBefore, startOfToday } from "date-fns";
import { de } from "date-fns/locale";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BookingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (date) => {
    setSlotsLoading(true);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await axios.get(`${API}/bookings/available-slots?date=${formattedDate}`);
      setAvailableSlots(response.data.available_slots);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setAvailableSlots(["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]);
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast.error("Bitte wählen Sie Datum und Uhrzeit");
      return;
    }
    
    if (!formData.name || !formData.email) {
      toast.error("Bitte füllen Sie Name und E-Mail aus");
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.post(`${API}/bookings`, {
        ...formData,
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTime,
      });
      
      setSubmitted(true);
      toast.success("Termin bestätigt! Wir melden uns bei Ihnen.");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Fehler bei der Terminbuchung. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <section id="booking" className="section-padding bg-void-paper relative">
        <div className="max-w-2xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8 text-green-400" />
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-4">
              Termin bestätigt!
            </h3>
            <p className="text-gray-400 mb-2">
              {format(selectedDate, "EEEE, d. MMMM yyyy", { locale: de })} um {selectedTime} Uhr
            </p>
            <p className="text-gray-500 text-sm">
              Wir senden eine Kalendereinladung an {formData.email}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="booking"
      ref={ref}
      className="section-padding bg-void-paper relative overflow-hidden"
      data-testid="booking-section"
    >
      <div className="max-w-6xl mx-auto relative z-10 px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">
            Termin vereinbaren
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
            Persönliche Demo buchen
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Erleben Sie, wie Solve Automations Ihre Unternehmenskommunikation transformiert.
            Wählen Sie einen passenden Termin.
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-void-black border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-10"
        >
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Calendar Section */}
              <div>
                <h3 className="font-heading text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-electric-blue" />
                  Datum wählen
                </h3>
                <div className="bg-void-paper rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/5">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => isBefore(date, startOfToday()) || date.getDay() === 0 || date.getDay() === 6}
                    className="rounded-md"
                  />
                </div>
                
                {/* Time Slots */}
                {selectedDate && (
                  <div className="mt-5 md:mt-6">
                    <h3 className="font-heading text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-electric-blue" />
                      Uhrzeit wählen
                    </h3>
                    {slotsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 text-electric-blue animate-spin" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2.5 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl text-sm font-medium transition-all ${
                              selectedTime === slot
                                ? "bg-electric-blue text-white"
                                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                            }`}
                            data-testid={`time-slot-${slot}`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4 md:space-y-5">
                <h3 className="font-heading text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-electric-blue" />
                  Ihre Daten
                </h3>
                
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
                      data-testid="booking-name-input"
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
                      data-testid="booking-email-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Telefonnummer</label>
                  <div className="relative">
                    <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+49 123 456 7890"
                      className="w-full pl-10 md:pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all text-sm md:text-base"
                      data-testid="booking-phone-input"
                    />
                  </div>
                </div>
                
                <div>
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
                      data-testid="booking-company-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Anmerkungen</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Erzählen Sie uns von Ihren Anforderungen..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all resize-none text-sm md:text-base"
                    data-testid="booking-notes-input"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !selectedDate || !selectedTime}
                  className="w-full flex items-center justify-center gap-2 bg-electric-blue hover:bg-electric-blue-hover disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all glow-blue glow-blue-hover"
                  data-testid="booking-submit-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Wird gebucht...
                    </>
                  ) : (
                    "Termin bestätigen"
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
