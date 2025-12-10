import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function DemoCallModal({ onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [callStatus, setCallStatus] = useState(null);
  const [telephonyStatus, setTelephonyStatus] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get(`${API}/calls/status`);
        setTelephonyStatus(response.data);
      } catch (error) {
        console.error("Error checking telephony status:", error);
      }
    };
    checkStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      toast.error("Bitte geben Sie eine Telefonnummer ein");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(`${API}/calls/initiate`, {
        phone_number: phoneNumber,
        call_type: "demo",
      });
      
      if (response.data.status === "mock_initiated") {
        setCallStatus("mock");
        toast.info("Demo-Anruf protokolliert (Twilio nicht konfiguriert)");
      } else {
        setCallStatus("success");
        toast.success("Anruf erfolgreich gestartet!");
      }
    } catch (error) {
      console.error("Call error:", error);
      toast.error("Fehler beim Starten des Anrufs. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-void-paper border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8"
        data-testid="demo-call-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          data-testid="modal-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        {callStatus ? (
          <div className="text-center py-4 md:py-6">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${
              callStatus === "success" ? "bg-green-500/20" : "bg-yellow-500/20"
            }`}>
              {callStatus === "success" ? (
                <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8 text-green-400" />
              ) : (
                <AlertCircle className="w-7 h-7 md:w-8 md:h-8 text-yellow-400" />
              )}
            </div>
            <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-2">
              {callStatus === "success" ? "Anruf gestartet!" : "Demo protokolliert"}
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-6">
              {callStatus === "success"
                ? `Wir rufen ${phoneNumber} jetzt an. Bitte nehmen Sie ab.`
                : `Anruf an ${phoneNumber} wurde protokolliert. Twilio-Integration ausstehend.`}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all"
            >
              Schließen
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-electric-blue/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 md:w-8 md:h-8 text-electric-blue" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
                KI-Assistenten testen
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                Geben Sie Ihre Telefonnummer ein und erleben Sie unseren KI-Telefonassistenten live.
              </p>
            </div>

            {/* Status Indicator */}
            {telephonyStatus && (
              <div className={`mb-6 p-3 rounded-xl flex items-center gap-3 ${
                telephonyStatus.mode === "production"
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-yellow-500/10 border border-yellow-500/20"
              }`}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  telephonyStatus.mode === "production" ? "bg-green-400" : "bg-yellow-400"
                }`} />
                <span className="text-xs md:text-sm text-gray-400">
                  {telephonyStatus.mode === "production" 
                    ? "Twilio konfiguriert und bereit" 
                    : "Demo-Modus – Anrufe werden protokolliert"}
                </span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Telefonnummer
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+49 123 456 7890"
                    className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all text-base md:text-lg"
                    data-testid="demo-phone-input"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Bitte Ländervorwahl für internationale Nummern angeben
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-electric-blue hover:bg-electric-blue-hover disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all glow-blue glow-blue-hover"
                data-testid="demo-call-btn"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Anruf wird gestartet...
                  </>
                ) : (
                  <>
                    <Phone className="w-5 h-5" />
                    Jetzt anrufen
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
