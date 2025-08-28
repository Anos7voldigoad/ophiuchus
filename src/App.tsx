import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import { Nav, Hero } from "./components/sections";
const Services = lazy(() => import("./components/sections/Services"));
const Process = lazy(() => import("./components/sections/Process"));
const Results = lazy(() => import("./components/sections/Results"));
const FAQ = lazy(() => import("./components/sections/FAQ"));
const CTA = lazy(() => import("./components/sections/CTA"));
const Footer = lazy(() => import("./components/sections/Footer"));
import { LoadingSpinner } from "./components/ui";
import SplashScreen from "./components/SplashScreen";
import ErrorBoundary from "./components/ErrorBoundary";
import BackToTop from "./components/BackToTop";
import { motion, useReducedMotion } from "framer-motion";
import titleLogo from "./assets/ophiuschus.png";
import ConsultationModal from "./components/ConsultationModal";
import AmbientSparkles from "./components/AmbientSparkles";

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [mainContentReady, setMainContentReady] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Always show splash screen (remove sessionStorage check)
    // This ensures the splash screen shows every time
  }, []);

  // Set favicon (title logo) to viperr.png at runtime via Vite asset URL
  useEffect(() => {
    const ensureFavicon = (rel: string) => {
      let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = titleLogo;
    };
    ensureFavicon("icon");
    ensureFavicon("shortcut icon");
    // Optional: touch icon
    ensureFavicon("apple-touch-icon");
  }, []);

  useEffect(() => {
    const open = () => setShowConsultation(true);
    window.addEventListener('open-consultation', open as EventListener);
    return () => window.removeEventListener('open-consultation', open as EventListener);
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
    // Immediate transition to prevent white flash
    setMainContentReady(true);
  };

  return (
    <ErrorBoundary>
      {/* Unified seamless background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#051F20] via-[#0B2B26] to-[#163832] z-0" />
      
      {/* Additional subtle background elements for depth */}
      <div className="fixed inset-0 z-0">
        {/* Floating orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8EB69B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#235347]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-[#DAF1DE]/3 rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(142, 182, 155, 0.2) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>
      {/* Ambient sparkles */}
      <div className="fixed inset-0 z-0">
        <AmbientSparkles count={26} />
      </div>
      
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onFinish={handleSplashFinish} />
        )}
      </AnimatePresence>
      
      {mainContentReady && (
        <motion.div 
          className="relative z-10 min-h-screen text-white"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
        >
          <Suspense fallback={
            <div className="min-h-screen text-white flex items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <Nav />
            <Hero />
            <Services />
            <Process />
            <Results />
            <FAQ />
            <CTA />
            <Footer />
            <BackToTop />
          </Suspense>
          <ConsultationModal isOpen={showConsultation} onClose={() => setShowConsultation(false)} />
        </motion.div>
      )}
    </ErrorBoundary>
  );
};

export default App;








