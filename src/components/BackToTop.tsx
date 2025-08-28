import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-[#8EB69B] to-[#235347] rounded-full border-2 border-[#DAF1DE]/50 shadow-2xl hover:shadow-[#8EB69B]/25 transition-all duration-300 hover:scale-110 group"
          aria-label="Back to top"
        >
          {/* Ophiuschus-inspired design elements */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Main arrow */}
            <svg 
              className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-y-[-2px]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            
            {/* Glow effect */}
            <div className="absolute inset-0 w-full h-full rounded-full bg-[#8EB69B]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Subtle border glow */}
            <div className="absolute inset-0 w-full h-full rounded-full border border-[#DAF1DE]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
