import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, User, Mail, Building, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, addDays, isBefore, startOfToday } from "date-fns";

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

  // Fetch available slots when date changes
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
      // Default slots if API fails
      setAvailableSlots(["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]);
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }
    
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email");
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
      toast.success("Booking confirmed! We'll be in touch soon.");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <section id="booking" className="section-padding bg-void-black relative">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-12"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-white mb-4">
              Booking Confirmed!
            </h3>
            <p className="text-gray-400 mb-2">
              {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
            </p>
            <p className="text-gray-500">
              We'll send a calendar invite to {formData.email}
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
      className="section-padding bg-void-black relative overflow-hidden"
      data-testid="booking-section"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">
            Schedule a Call
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Book a personalized demo
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how Solve Automations can transform your business communication.
            Choose a time that works for you.
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-void-paper border border-white/10 rounded-3xl p-6 md:p-10"
        >
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar Section */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-electric-blue" />
                  Select a Date
                </h3>
                <div className="bg-void-black rounded-2xl p-4 border border-white/5">
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
                  <div className="mt-6">
                    <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-electric-blue" />
                      Select a Time
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
                            className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
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
              <div className="space-y-5">
                <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-electric-blue" />
                  Your Details
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Smith"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                      data-testid="booking-name-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@company.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                      data-testid="booking-email-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                      data-testid="booking-phone-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company Name"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                      data-testid="booking-company-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Tell us about your needs..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all resize-none"
                    data-testid="booking-notes-input"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !selectedDate || !selectedTime}
                  className="w-full flex items-center justify-center gap-2 bg-electric-blue hover:bg-electric-blue-hover disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold text-lg transition-all glow-blue glow-blue-hover"
                  data-testid="booking-submit-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Confirm Booking"
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
