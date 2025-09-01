import React from "react";
import { motion } from "framer-motion";

const CTA: React.FC = () => (
  <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-[#8EB69B] to-[#DAF1DE] py-16 sm:py-20">
    {/* Enhanced background with neon effects */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,.05),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,0,0,.05),transparent_40%)]" />
    
    {/* Neon accent orbs */}
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ boxShadow: '0 0 50px rgba(255, 255, 255, 0.2)' }} />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', boxShadow: '0 0 60px rgba(255, 255, 255, 0.2)' }} />
    <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s', boxShadow: '0 0 40px rgba(255, 255, 255, 0.1)' }} />

    <div className="relative mx-auto max-w-4xl px-4">
      <motion.div 
        className="mx-auto max-w-2xl text-center text-black"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h3 
          className="text-3xl sm:text-4xl font-bold leading-tight mb-4 drop-shadow-[0_0_20px_rgba(0,0,0,0.1)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Ready to transform your business online?
        </motion.h3>
        <motion.p 
          className="text-base text-black/70 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Book a 20‑minute consultation. We'll map your complete digital transformation journey.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-consultation')); }} 
            className="rounded-xl bg-[#051F20] px-6 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:bg-[#0A2A2B] focus:outline-none focus:ring-2 focus:ring-black/20 backdrop-blur-sm"
            style={{ 
              boxShadow: '0 8px 32px rgba(5, 31, 32, 0.3), 0 0 0 1px rgba(5, 31, 32, 0.1)',
              filter: 'drop-shadow(0 0 8px rgba(5, 31, 32, 0.4))'
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Start Your Transformation
          </motion.a>
          <motion.a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ophiuschus.ai@gmail.com" 
            target="_blank" 
            rel="noopener" 
            aria-label="Email us at hello@ophiuschus.ai" 
            className="rounded-xl border border-[#051F20]/40 px-6 py-3 text-sm font-bold text-[#051F20] transition-all duration-300 hover:bg-[#051F20]/10 focus:outline-none focus:ring-2 focus:ring-black/10 backdrop-blur-sm"
            style={{ 
              boxShadow: '0 4px 20px rgba(5, 31, 32, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            or email us
          </motion.a>
        </motion.div>
        
        <motion.p 
          className="text-sm text-black/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          No obligation. 20 minutes.
        </motion.p>
      </motion.div>
    </div>
  </section>
);

export default CTA;










