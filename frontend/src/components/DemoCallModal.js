import { useState } from "react";
import { motion } from "framer-motion";
import { X, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function DemoCallModal({ onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [callStatus, setCallStatus] = useState(null); // null, 'success', 'mock'
  const [telephonyStatus, setTelephonyStatus] = useState(null);

  // Check telephony status on mount
  useState(() => {
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
      toast.error("Please enter a phone number");
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
        toast.info("Demo call logged (Twilio not configured)");
      } else {
        setCallStatus("success");
        toast.success("Call initiated successfully!");
      }
    } catch (error) {
      console.error("Call error:", error);
      toast.error("Failed to initiate call. Please try again.");
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
        className="relative w-full max-w-md bg-void-paper border border-white/10 rounded-3xl p-8"
        data-testid="demo-call-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          data-testid="modal-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        {callStatus ? (
          <div className="text-center py-6">
            <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${
              callStatus === "success" ? "bg-green-500/20" : "bg-yellow-500/20"
            }`}>
              {callStatus === "success" ? (
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              ) : (
                <AlertCircle className="w-8 h-8 text-yellow-400" />
              )}
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              {callStatus === "success" ? "Call Initiated!" : "Demo Logged"}
            </h3>
            <p className="text-gray-400 mb-6">
              {callStatus === "success"
                ? `We're calling ${phoneNumber} now. Please answer your phone.`
                : `Call request to ${phoneNumber} has been logged. Twilio integration is pending configuration.`}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-electric-blue/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-electric-blue" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Try Our AI Assistant
              </h3>
              <p className="text-gray-400">
                Enter your phone number and experience our AI call assistant firsthand.
              </p>
            </div>

            {/* Status Indicator */}
            {telephonyStatus && (
              <div className={`mb-6 p-3 rounded-xl flex items-center gap-3 ${
                telephonyStatus.mode === "production"
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-yellow-500/10 border border-yellow-500/20"
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  telephonyStatus.mode === "production" ? "bg-green-400" : "bg-yellow-400"
                }`} />
                <span className="text-sm text-gray-400">
                  {telephonyStatus.message}
                </span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all text-lg"
                    data-testid="demo-phone-input"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Include country code for international numbers
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-electric-blue hover:bg-electric-blue-hover disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold text-lg transition-all glow-blue glow-blue-hover"
                data-testid="demo-call-btn"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Initiating Call...
                  </>
                ) : (
                  <>
                    <Phone className="w-5 h-5" />
                    Call Me Now
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
