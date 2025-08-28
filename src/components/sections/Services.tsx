import React from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "../ui";
import viperr from "../../assets/viperr.png";
import { IconBot, IconFlow, IconAds, IconChart } from "../icons/Icons";

const services = [
  { 
    title: "AI Chatbots", 
    desc: "Custom-trained bots that handle support & sales 24/7 with human-like conversations.",
    icon: IconBot,
    features: ["24/7 Availability", "Human-like responses", "Custom training"]
  },
  { 
    title: "Ad Management", 
    desc: "Run, analyze, and optimize ad campaigns for maximum ROI and growth.",
    icon: IconAds,
    features: ["Campaign optimization", "ROI tracking", "Performance analytics"]
  },
  { 
    title: "Content Automation", 
    desc: "Save hours with automated social content creation and smart posting schedules.",
    icon: IconFlow,
    features: ["Auto-posting", "Content scheduling", "Smart optimization"]
  },
  { 
    title: "Analytics Dashboards", 
    desc: "Real-time insights into leads, revenue, and engagement with actionable data.",
    icon: IconChart,
    features: ["Real-time data", "Actionable insights", "Custom reports"]
  },
];

const Services: React.FC = () => (
  <section id="services" className="py-14 sm:py-16 relative">
    {/* Subtle background pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(218,241,222,0.1) 0%, transparent 50%),
                         radial-gradient(circle at 75% 75%, rgba(142,182,155,0.1) 0%, transparent 50%)`
      }} />
    </div>

    <div className="mx-auto max-w-7xl px-4 relative z-10">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-5">
          <img src={viperr} alt="watermark" className="h-24 w-24 object-contain" />
        </div>
        <SectionTitle
          eyebrow="What we offer"
          title="Our Services"
          subtitle="High-impact solutions tailored for small businesses that drive real results."
        />
      </div>

      <motion.div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
        {services.map((service, i) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative rounded-3xl border border-[#8EB69B]/20 bg-[#163832]/30 p-5 text-center sm:p-6 hover:bg-[#163832]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-black/30"
            >
              {/* Enhanced icon container */}
              <motion.div
                className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8EB69B]/20 to-[#8EB69B]/10 p-4 flex items-center justify-center border border-[#8EB69B]/30 group-hover:border-[#8EB69B]/50 group-hover:from-[#8EB69B]/30 group-hover:to-[#8EB69B]/20 transition-all duration-500"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <IconComponent />
              </motion.div>

              {/* Service title with enhanced styling */}
              <h3 className="text-lg font-semibold text-[#8EB69B] mb-3 group-hover:text-[#DAF1DE] transition-colors duration-300">
                {service.title}
              </h3>

              {/* Enhanced description */}
              <p className="text-white/70 text-sm leading-relaxed mb-4 group-hover:text-white/80 transition-colors duration-300">
                {service.desc}
              </p>

              {/* Feature highlights */}
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <motion.div
                     key={idx}
                     initial={{ opacity: 0, x: -10 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.4, delay: (i * 0.12) + (idx * 0.08) + 0.25 }}
                     className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-white/50 group-hover:text-white/60 transition-colors duration-300"
                   >
                     <div className="w-1.5 h-1.5 rounded-full bg-[#8EB69B]/60" />
                     {feature}
                   </motion.div>
                ))}
              </div>

              {/* Hover effect indicator */}
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-green-400/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default Services;
