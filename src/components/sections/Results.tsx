import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import viperr from "../../assets/viperr.png";
import { SectionTitle } from "../ui";

const Results: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState(0);

  const metrics = [
    { value: "-60%", label: "Response Time" },
    { value: "+38%", label: "Qualified Leads" },
    { value: "-27%", label: "Support Costs" },
    { value: "+22", label: "NPS Score" }
  ];

  const caseStudies = [
    {
      company: "TechFlow Solutions",
      challenge: "Manual customer support was overwhelming their small team",
      solution: "AI-powered chatbot with intelligent routing",
      results: ["60% reduction in response time", "38% increase in qualified leads"]
    },
    {
      company: "GreenLeaf Retail",
      challenge: "Inventory management was causing stockouts and overstock",
      solution: "Predictive analytics for demand forecasting",
      results: ["45% improvement in conversion rate", "35% reduction in processing time"]
    }
  ];

  // Auto-advance slideshow for Success Stories
  useEffect(() => {
    const id = setInterval(() => {
      setSelectedCase((prev) => (prev + 1) % caseStudies.length);
    }, 6000);
    return () => clearInterval(id);
  }, [caseStudies.length]);

  return (
    <section id="results" className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <SectionTitle 
            eyebrow="Results" 
            title="Measurable Impact" 
            subtitle="Real outcomes from real businesses." 
          />
        </motion.div>

        {/* Simple Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 mb-12 sm:mb-16"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center p-4 sm:p-6 border border-[#8EB69B]/20 rounded-lg bg-[#0B2B26]/20"
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#8EB69B] mb-1 sm:mb-2">{metric.value}</div>
              <div className="text-xs sm:text-sm text-white/60">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Studies */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-5">
              <img src={viperr} alt="watermark" className="h-24 w-24 object-contain" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">Success Stories</h3>
          </div>
          
          {/* Case Study Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6">
            {caseStudies.map((study, i) => (
              <button
                key={i}
                onClick={() => setSelectedCase(i)}
                className={`px-4 py-2 sm:px-6 rounded-lg font-medium transition-colors ${
                  selectedCase === i
                    ? 'bg-[#8EB69B] text-black'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {study.company}
              </button>
            ))}
          </div>

          {/* Case Study Content - slideshow */}
          <div className="relative bg-[#0B2B26]/20 rounded-lg border border-[#8EB69B]/20 p-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCase}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">The Challenge</h4>
                    <p className="text-white/70 mb-4">{caseStudies[selectedCase].challenge}</p>
                    <h4 className="text-xl font-semibold text-white mb-3">Our Solution</h4>
                    <p className="text-white/70">{caseStudies[selectedCase].solution}</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">Results</h4>
                    <div className="space-y-2">
                      {caseStudies[selectedCase].results.map((result, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#8EB69B]" />
                          <span className="text-white/70">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev/Next controls */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
              <button
                aria-label="Previous case study"
                onClick={() => setSelectedCase((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)}
                className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button
                aria-label="Next case study"
                onClick={() => setSelectedCase((prev) => (prev + 1) % caseStudies.length)}
                className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>

            {/* Pagination dots */}
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
              {caseStudies.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setSelectedCase(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${selectedCase === i ? 'bg-[#8EB69B] w-6' : 'bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Simple CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <div className="inline-block p-6 border border-[#8EB69B]/20 rounded-lg bg-[#0B2B26]/20">
            <h3 className="text-xl font-bold text-white mb-3">Ready to see similar results?</h3>
            <button className="px-6 py-3 bg-[#8EB69B] text-black font-medium rounded-lg hover:bg-[#8EB69B]/90 transition-colors" onClick={() => window.dispatchEvent(new Event('open-consultation'))}>
              Book a consultation
            </button>
            <p className="mt-2 text-sm text-white/70">No obligation. Quick 20‑minute fit check.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;











