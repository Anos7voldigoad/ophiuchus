
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge, PrimaryBtn, GhostBtn } from "../ui";
// ✅ Correct path

const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
  <section className="relative isolate overflow-hidden">
    {/* background glow */}
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#8EB69B]/15 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#DAF1DE]/15 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(218,241,222,.06),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(142,182,155,.04),transparent_40%)]" />
    </div>

    <div className="container grid min-h-[65vh] items-center gap-8 py-12 sm:gap-12 sm:py-14 lg:grid-cols-2 lg:py-16">
      <motion.div initial={shouldReduceMotion ? false : {opacity:0,y:24}} animate={{opacity:1,y:0}} transition={shouldReduceMotion ? {duration:0} : {duration:0.6, ease:[0.25,0.46,0.45,0.94]}}>
        <Badge>AI Agency for Growth</Badge>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-white sm:mt-4 sm:text-5xl">
          Build once. Scale always.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8EB69B] to-[#DAF1DE]">
            AI that sells & serves
          </span>
        </h1>
        <p className="mt-3 text-base text-white/75 sm:mt-4 sm:text-lg">
          We design chatbots, automate workflows, and run smarter ad campaigns so you can focus on building your business.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
          <PrimaryBtn href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-consultation')); }}>Book a consultation</PrimaryBtn>
          <GhostBtn href="#services">See Services</GhostBtn>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-white/60">
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#8EB69B]"/> 24/7 Chatbots</span>
          <span>Automation · n8n</span>
          <span>Meta/Google Ads</span>
        </div>
      </motion.div>

      {/* mock analytic panel */}
      <motion.div initial={shouldReduceMotion ? false : {opacity:0,y:24}} animate={{opacity:1,y:0}} transition={shouldReduceMotion ? {duration:0} : {duration:0.7, delay:0.1, ease:[0.25,0.46,0.45,0.94]}} className="relative">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl border border-[#8EB69B]/20 bg-[#0B2B26]/50 shadow-xl">
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={false}
            animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="flex items-center gap-2 border-b border-[#8EB69B]/20 bg-[#0B2B26]/50 px-4 py-3 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-[#8EB69B]" />
            <span className="ml-2">assistant.ophiuschus.ai</span>
          </div>
          <div className="grid h-full grid-cols-5">
            <div className="col-span-3 p-6">
              <div className="mb-3 h-6 w-32 rounded bg-[#8EB69B]/15" />
              <div className="mb-6 h-4 w-56 rounded bg-[#8EB69B]/10" />
              <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-24 rounded-xl border border-[#8EB69B]/20 bg-gradient-to-br from-[#8EB69B]/10 to-[#DAF1DE]/10" />
                ))}
              </div>
            </div>
            <div className="col-span-2 border-l border-[#8EB69B]/20 p-6">
              <div className="mb-3 h-6 w-36 rounded bg-[#8EB69B]/15" />
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 rounded bg-[#8EB69B]/10" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#8EB69B]/30 blur-2xl" />
      </motion.div>
    </div>
  </section>
  );
}

export default Hero;
