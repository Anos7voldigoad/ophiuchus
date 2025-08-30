import React from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "../ui";
import viperr from "../../assets/viperr.png";
import { IconWebsite, IconAutomation, IconVoice, IconAdManagement } from "../icons/Icons";

const services = [
  { 
    title: "Website Development", 
    desc: "Full-stack websites and e-commerce solutions that convert visitors into customers.",
    icon: IconWebsite,
    features: ["Responsive Design", "E-commerce Integration", "SEO Optimized"]
  },
  { 
    title: "Automation Integration", 
    desc: "n8n workflow automation to streamline operations and boost productivity.",
    icon: IconAutomation,
    features: ["Workflow Automation", "API Integration", "Process Optimization"]
  },
  { 
    title: "AI Voice Agents", 
    desc: "AI receptionists and voice assistants that handle calls and customer interactions 24/7.",
    icon: IconVoice,
    features: ["24/7 Availability", "Natural Conversations", "Call Handling"]
  },
  { 
    title: "Ad Management", 
    desc: "Complete Meta/Google Ads management for maximum ROI and business growth.",
    icon: IconAdManagement,
    features: ["Campaign Optimization", "ROI Tracking", "Performance Analytics"]
  },
];

const Services: React.FC = () => (
  <section id="services" className="py-16 sm:py-20 relative">
    {/* Enhanced background with neon effects */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#8EB69B]/3 via-transparent to-[#DAF1DE]/3" />
      {/* Neon accent orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8EB69B]/5 rounded-full blur-3xl animate-pulse" style={{ boxShadow: '0 0 50px rgba(142, 182, 155, 0.2)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#DAF1DE]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', boxShadow: '0 0 60px rgba(218, 241, 222, 0.2)' }} />
    </div>

    <div className="mx-auto max-w-7xl px-4 relative z-10">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-5">
          <img src={viperr} alt="watermark" className="h-24 w-24 object-contain" />
        </div>
        <SectionTitle
          eyebrow="Complete Digital Solutions"
          title="Everything You Need Online"
          subtitle="From website development to AI automation - we handle your entire digital transformation journey."
        />
      </motion.div>

      <motion.div 
        className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4" 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, amount: 0.2 }} 
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {services.map((service, i) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.15, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              }}
              className="group relative"
            >
              {/* Enhanced glassmorphism card with neon effects */}
              <div className="relative rounded-2xl border border-[#8EB69B]/30 bg-gradient-to-br from-[#163832]/40 via-[#0B2B26]/30 to-[#163832]/40 p-6 hover:bg-gradient-to-br hover:from-[#163832]/60 hover:via-[#0B2B26]/50 hover:to-[#163832]/60 transition-all duration-500 hover:shadow-2xl backdrop-blur-xl" style={{ 
                boxShadow: '0 8px 32px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
              }}>
                
                {/* Neon border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8EB69B]/10 via-transparent to-[#DAF1DE]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Enhanced icon container with neon glow */}
                <motion.div 
                  className="relative mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8EB69B]/30 to-[#8EB69B]/15 p-4 flex items-center justify-center border border-[#8EB69B]/40 group-hover:border-[#8EB69B]/60 transition-all duration-500 backdrop-blur-sm"
                  style={{ 
                    boxShadow: '0 4px 20px rgba(142, 182, 155, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                  }}
                >
                  <IconComponent />
                  {/* Neon glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-[#8EB69B]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                {/* Service title with neon text effect */}
                <h3 className="relative text-lg font-semibold text-[#8EB69B] mb-3 group-hover:text-[#DAF1DE] transition-colors duration-500 text-center drop-shadow-[0_0_8px_rgba(142,182,155,0.3)]">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-4 group-hover:text-white/80 transition-colors duration-500 text-center">
                  {service.desc}
                </p>

                {/* Feature highlights with neon accents */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <motion.div
                       key={idx}
                       initial={{ opacity: 0, x: -10 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ 
                         duration: 0.5, 
                         delay: (i * 0.15) + (idx * 0.1) + 0.3,
                         ease: [0.16, 1, 0.3, 1]
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
    </div>
  </section>
);

export default Services;
