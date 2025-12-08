import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";

// Components
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import Industries from "@/components/Industries";
import About from "@/components/About";
import BookingSection from "@/components/BookingSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import DemoCallModal from "@/components/DemoCallModal";

const LandingPage = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="min-h-screen bg-void-black relative">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navbar onDemoClick={() => setShowDemoModal(true)} />
      
      {/* Main Content */}
      <main>
        <Hero onDemoClick={() => setShowDemoModal(true)} />
        <ProblemSolution />
        <HowItWorks />
        <Industries />
        <About />
        <BookingSection />
        <ContactForm />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Demo Call Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <DemoCallModal onClose={() => setShowDemoModal(false)} />
        )}
      </AnimatePresence>
      
      {/* Toast Notifications */}
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
