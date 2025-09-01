import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import viperLogo from "../../assets/viperr.png";
import { PrimaryBtn } from "../ui";

const Nav: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header 
      className="sticky top-0 z-50 border-b border-[#8EB69B]/30 bg-gradient-to-br from-[#0B2B26]/90 via-[#163832]/85 to-[#0B2B26]/90 backdrop-blur-xl"
      style={{ 
        boxShadow: '0 4px 20px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] rounded bg-[#8EB69B] px-3 py-2 text-black">Skip to content</a>
      <div className="container flex h-16 items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#8EB69B] to-[#DAF1DE] shadow-lg"
            style={{ 
              boxShadow: '0 4px 20px rgba(142, 182, 155, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              filter: 'drop-shadow(0 0 8px rgba(142, 182, 155, 0.4))'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={viperLogo} alt="Ophiuschus logo" className="h-6 w-6 object-contain" />
          </motion.div>
          <span className="text-lg font-semibold tracking-tight text-white drop-shadow-[0_0_8px_rgba(142,182,155,0.3)]">Ophiuschus AI</span>
        </motion.div>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-white/80 sm:flex">
          {["Services", "Process", "Results", "FAQ"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative transition-colors hover:text-[#8EB69B] font-medium"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.div 
            className="hidden sm:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <PrimaryBtn 
              href="#" 
              aria-label="Start your transformation" 
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-consultation')); }}
              className="transition-transform duration-300 hover:scale-105 backdrop-blur-sm"
              style={{ 
                boxShadow: '0 4px 20px rgba(142, 182, 155, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                filter: 'drop-shadow(0 0 8px rgba(142, 182, 155, 0.3))'
              }}
            >
              Get Started
            </PrimaryBtn>
          </motion.div>
          
          {/* Mobile menu button */}
          <motion.button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#8EB69B] sm:hidden transition-colors backdrop-blur-sm"
            style={{ 
              boxShadow: '0 2px 10px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ rotate: mobileOpen ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile dropdown with glassmorphism */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            className="sm:hidden border-t border-[#8EB69B]/30 bg-gradient-to-br from-[#0B2B26]/95 via-[#163832]/90 to-[#0B2B26]/95 backdrop-blur-xl"
            style={{ 
              boxShadow: '0 8px 32px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)'
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="container py-4">
              <ul className="flex flex-col gap-2 text-white/90">
                {["Services", "Process", "Results", "FAQ"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a 
                      onClick={() => setMobileOpen(false)} 
                      href={`#${item.toLowerCase()}`} 
                      className="block rounded-lg px-3 py-2 hover:bg-[#8EB69B]/10 transition-colors font-medium backdrop-blur-sm"
                      style={{ 
                        boxShadow: '0 2px 10px rgba(142, 182, 155, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.02)'
                      }}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
                <motion.li 
                  className="pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PrimaryBtn 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-consultation')); }}
                    className="w-full justify-center backdrop-blur-sm"
                    style={{ 
                      boxShadow: '0 4px 20px rgba(142, 182, 155, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      filter: 'drop-shadow(0 0 8px rgba(142, 182, 155, 0.3))'
                    }}
                  >
                    Get Started
                  </PrimaryBtn>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Nav;



