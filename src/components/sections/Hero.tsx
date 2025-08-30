
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge, PrimaryBtn, GhostBtn } from "../ui";

const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const brands = [
    { name: "MERN Stack", icon: "M" },
    { name: "n8n", icon: "n" },
    { name: "Instagram", icon: "I" },
    { name: "Facebook", icon: "F" },
    { name: "Google Ads", icon: "G" },
    { name: "Meta Ads", icon: "M" },
    { name: "React", icon: "R" },
    { name: "Node.js", icon: "N" },
    { name: "MongoDB", icon: "M" },
    { name: "Express", icon: "E" },
    { name: "TypeScript", icon: "T" },
    { name: "Tailwind", icon: "T" },
  ];

  return (
  <section className="relative isolate overflow-hidden">
    {/* Enhanced background with neon effects */}
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Neon glow orbs */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#8EB69B]/20 blur-3xl animate-pulse" style={{ boxShadow: '0 0 60px rgba(142, 182, 155, 0.3)' }} />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#DAF1DE]/20 blur-3xl animate-pulse" style={{ animationDelay: '2s', boxShadow: '0 0 60px rgba(218, 241, 222, 0.3)' }} />
      
      {/* Additional neon accents */}
      <div className="absolute top-1/3 left-1/2 h-32 w-32 rounded-full bg-[#8EB69B]/10 blur-2xl animate-pulse" style={{ animationDelay: '1s', boxShadow: '0 0 40px rgba(142, 182, 155, 0.2)' }} />
      <div className="absolute bottom-1/3 right-1/3 h-24 w-24 rounded-full bg-[#DAF1DE]/10 blur-2xl animate-pulse" style={{ animationDelay: '3s', boxShadow: '0 0 30px rgba(218, 241, 222, 0.2)' }} />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(218,241,222,.04),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(142,182,155,.03),transparent_40%)]" />
    </div>

    <div className="container grid min-h-[65vh] items-center gap-8 py-12 sm:gap-12 sm:py-14 lg:grid-cols-2 lg:py-16">
      <motion.div 
        initial={shouldReduceMotion ? false : {opacity:0,y:30}} 
        animate={{opacity:1,y:0}} 
        transition={shouldReduceMotion ? {duration:0} : {duration:0.8, ease:[0.16, 1, 0.3, 1]}}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge>One-Stop Digital Solutions</Badge>
        </motion.div>
        <motion.h1 
          className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Transform your business online.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8EB69B] to-[#DAF1DE] drop-shadow-[0_0_20px_rgba(142,182,155,0.3)]">
            One solution, complete transformation
          </span>
        </motion.h1>
        <motion.p 
          className="mt-3 text-base text-white/75 sm:mt-4 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          From website development to AI automation, we provide everything you need to take your business online and scale it successfully.
        </motion.p>
        <motion.div 
          className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <PrimaryBtn href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-consultation')); }}>Get Started Today</PrimaryBtn>
          <GhostBtn href="#services">See Our Services</GhostBtn>
        </motion.div>
        <motion.div 
          className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#8EB69B] drop-shadow-[0_0_8px_rgba(142,182,155,0.6)]"/> 
            Full-Stack Websites
          </span>
          <span>n8n Automation</span>
          <span>AI Voice Agents</span>
          <span>Ad Management</span>
        </motion.div>
      </motion.div>

      {/* Enhanced analytic panel with glassmorphism */}
      <motion.div 
        initial={shouldReduceMotion ? false : {opacity:0,y:30}} 
        animate={{opacity:1,y:0}} 
        transition={shouldReduceMotion ? {duration:0} : {duration:0.8, delay:0.2, ease:[0.16, 1, 0.3, 1]}} 
        className="relative"
      >
        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-[#8EB69B]/30 bg-gradient-to-br from-[#0B2B26]/80 via-[#163832]/60 to-[#0B2B26]/80 shadow-2xl backdrop-blur-xl" style={{ boxShadow: '0 0 40px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
          {/* Neon border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8EB69B]/20 via-transparent to-[#DAF1DE]/20 opacity-50" />
          
          <div className="relative flex items-center gap-2 border-b border-[#8EB69B]/30 bg-gradient-to-r from-[#0B2B26]/90 to-[#163832]/90 backdrop-blur-sm px-4 py-3 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-rose-400 drop-shadow-[0_0_4px_rgba(248,113,113,0.6)]" />
            <span className="h-2 w-2 rounded-full bg-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]" />
            <span className="h-2 w-2 rounded-full bg-[#8EB69B] drop-shadow-[0_0_4px_rgba(142,182,155,0.6)]" />
            <span className="ml-2">assistant.ophiuschus.ai</span>
          </div>
          <div className="grid h-full grid-cols-5">
            <div className="col-span-3 p-6">
              <div className="mb-3 h-6 w-32 rounded bg-gradient-to-r from-[#8EB69B]/20 to-[#8EB69B]/10 backdrop-blur-sm border border-[#8EB69B]/20" />
              <div className="mb-6 h-4 w-56 rounded bg-gradient-to-r from-[#8EB69B]/15 to-[#8EB69B]/5 backdrop-blur-sm border border-[#8EB69B]/15" />
              <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-24 rounded-xl border border-[#8EB69B]/30 bg-gradient-to-br from-[#8EB69B]/10 to-[#DAF1DE]/10 backdrop-blur-sm shadow-lg" style={{ boxShadow: '0 4px 20px rgba(142, 182, 155, 0.1)' }} />
                ))}
              </div>
            </div>
            <div className="col-span-2 border-l border-[#8EB69B]/30 p-6">
              <div className="mb-3 h-6 w-36 rounded bg-gradient-to-r from-[#8EB69B]/20 to-[#8EB69B]/10 backdrop-blur-sm border border-[#8EB69B]/20" />
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 rounded bg-gradient-to-r from-[#8EB69B]/15 to-[#8EB69B]/5 backdrop-blur-sm border border-[#8EB69B]/15" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Enhanced Brand Carousel with neon effects */}
    <div className="relative overflow-hidden py-6 border-t border-[#8EB69B]/20">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B2B26] via-transparent to-[#0B2B26] z-10 pointer-events-none" />
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{
          x: [0, -50 * brands.length],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-br from-[#163832]/40 to-[#0B2B26]/40 border border-[#8EB69B]/30 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ 
              boxShadow: '0 4px 20px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <span className="text-sm font-bold text-[#8EB69B] drop-shadow-[0_0_8px_rgba(142,182,155,0.6)]">{brand.icon}</span>
            <span className="text-sm font-medium text-white/80">{brand.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
  );
}

export default Hero;
