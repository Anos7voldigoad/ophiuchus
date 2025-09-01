'use client'
import React from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "../ui";
import viperr from "../../assets/viperr.png";
import { IconDiscovery, IconStrategy, IconDevelopment, IconLaunch } from "../icons/Icons";

const processSteps = [
  { 
    id: "01",
    title: "Discovery & Analysis", 
    desc: "Deep business analysis & market research to create your transformation roadmap.",
    icon: IconDiscovery,
    features: ["Business Analysis", "Market Research", "Goal Setting"]
  },
  { 
    id: "02",
    title: "Strategy & Planning", 
    desc: "Digital roadmap & technology planning tailored to your business needs.",
    icon: IconStrategy,
    features: ["Digital Roadmap", "Technology Stack", "Timeline Planning"]
  },
  { 
    id: "03",
    title: "Development & Build", 
    desc: "Building your complete digital ecosystem with cutting-edge technology.",
    icon: IconDevelopment,
    features: ["Website Development", "Automation Setup", "AI Integration"]
  },
  { 
    id: "04",
    title: "Launch & Optimize", 
    desc: "Deploy your transformation and continuously optimize for maximum performance.",
    icon: IconLaunch,
    features: ["Performance Testing", "SEO Optimization", "Analytics Setup"]
  },
];

const ProcessSection: React.FC = () => (
  <section id="process" className="py-14 sm:py-16 relative">
    {/* Background matching rest of website */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#8EB69B]/3 via-transparent to-[#DAF1DE]/3" />
      {/* Neon accent orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8EB69B]/5 rounded-full blur-3xl animate-pulse" style={{ boxShadow: '0 0 50px rgba(142, 182, 155, 0.2)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#DAF1DE]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', boxShadow: '0 0 60px rgba(218, 241, 222, 0.2)' }} />
    </div>

    <div className="mx-auto max-w-6xl px-4 relative z-10">
      {/* Header - matching Results section style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 sm:mb-12"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-5">
          <img src={viperr} alt="watermark" className="h-24 w-24 object-contain" />
        </div>
        <SectionTitle 
          eyebrow="Our Process" 
          title="Your Digital Transformation Journey" 
          subtitle="From initial discovery to scalable growth, we guide you through every step with proven methodology." 
        />
      </motion.div>

      {/* Process Steps - matching Results section grid style */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
      >
        {processSteps.map((step, i) => {
          const IconComponent = step.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative"
            >
              {/* Card - matching Results section style */}
              <div className="relative p-6 border border-[#8EB69B]/20 rounded-lg bg-[#0B2B26]/20 backdrop-blur-sm hover:bg-[#0B2B26]/30 transition-all duration-300">
                
                {/* Step number - matching Results metrics style */}
                <div className="text-3xl font-bold text-[#8EB69B] mb-4 text-center drop-shadow-[0_0_8px_rgba(142,182,155,0.3)]">
                  {step.id}
                </div>
                
                {/* Icon - matching Services section style */}
                <div className="relative mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8EB69B]/30 to-[#8EB69B]/15 p-4 flex items-center justify-center border border-[#8EB69B]/40 group-hover:border-[#8EB69B]/60 transition-all duration-500 backdrop-blur-sm"
                  style={{ 
                    boxShadow: '0 4px 20px rgba(142, 182, 155, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}>
                  <IconComponent />
                </div>

                {/* Title - matching Services section style */}
                <h3 className="text-lg font-semibold text-[#8EB69B] mb-3 group-hover:text-[#DAF1DE] transition-colors duration-500 text-center drop-shadow-[0_0_8px_rgba(142,182,155,0.3)]">
                  {step.title}
                </h3>

                {/* Description - matching Services section style */}
                <p className="text-white/70 text-sm leading-relaxed mb-4 group-hover:text-white/80 transition-colors duration-500 text-center">
                  {step.desc}
                </p>

                {/* Features - matching Services section style */}
                <div className="space-y-2">
                  {step.features.map((feature, idx) => (
                    <motion.div
                       key={idx}
                       initial={{ opacity: 0, x: -10 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ 
                         duration: 0.5, 
                         delay: (i * 0.12) + (idx * 0.1) + 0.3,
                         ease: [0.25, 0.46, 0.45, 0.94]
                       }}
                       className="flex items-center justify-center gap-2 text-xs text-white/50 group-hover:text-white/60 transition-colors duration-300"
                     >
                       <div className="w-1.5 h-1.5 rounded-full bg-[#8EB69B]/60 drop-shadow-[0_0_4px_rgba(142,182,155,0.6)]" />
                       <span className="font-medium">{feature}</span>
                     </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* CTA - matching CTA section style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mt-12 sm:mt-16"
      >
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-consultation')); }} 
            className="rounded-xl bg-[#8EB69B] px-6 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:bg-[#7AA58A] focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/20 backdrop-blur-sm"
            style={{ 
              boxShadow: '0 8px 32px rgba(142, 182, 155, 0.3), 0 0 0 1px rgba(142, 182, 155, 0.1)',
              filter: 'drop-shadow(0 0 8px rgba(142, 182, 155, 0.4))'
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Start Your Transformation
          </motion.a>
          <motion.a 
            href="#services" 
            className="rounded-xl border border-[#8EB69B]/40 px-6 py-3 text-sm font-bold text-[#8EB69B] transition-all duration-300 hover:bg-[#8EB69B]/10 focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/20 backdrop-blur-sm"
            style={{ 
              boxShadow: '0 4px 20px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            See Our Services
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default ProcessSection;

