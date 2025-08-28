'use client'
import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [linesDrawn, setLinesDrawn] = useState(false)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const steps = [
    { id: 1, number: '01', title: 'Discovery', description: 'We analyze your business goals and technical requirements to understand your unique needs.' },
    { id: 2, number: '02', title: 'Strategy', description: 'Our experts craft a comprehensive roadmap and technical architecture for your AI solution.' },
    { id: 3, number: '03', title: 'Development', description: 'We build your AI solution with clean, scalable code and seamless integration.' },
    { id: 4, number: '04', title: 'Launch', description: 'After thorough testing, we deploy and continuously optimize your solution.' },
  ]

  useEffect(() => {
    if (inView && !linesDrawn) {
      setLinesDrawn(true)
    }
  }, [inView, linesDrawn])

  // Uniform, ascending animations
  const gridVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 0.5,
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 0.6
      }
    }
  }

  return (
    <section ref={ref} className="relative py-16 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8EB69B]/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#235347]/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        
        {/* Star field */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#DAF1DE]/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-[#8EB69B]/30 bg-[#8EB69B]/10 px-4 py-2 mb-4"
          >
            <span className="text-[#8EB69B] text-sm font-medium">Our Process</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
            The Ophiuschus Way
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Four simple steps to transform your business with AI.
          </motion.p>
        </div>

        {/* Constellation Container - Responsive */}
        <div className="relative max-w-6xl mx-auto">
          {/* Horizontal connecting lines (hidden on small screens) */}
          <div className="absolute top-1/2 left-0 right-0 h-px hidden md:block">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="absolute top-0 h-full w-32 bg-gradient-to-r from-[#8EB69B]/20 to-transparent"
                style={{ left: `${(index + 1) * 25}%` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: linesDrawn ? 1 : 0,
                  opacity: linesDrawn ? 1 : 0
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Process Steps - Responsive grid with ascending stagger */}
          <motion.div
            className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className="relative flex flex-col items-center text-center"
                variants={stepVariants}
              >
                {/* Step Node */}
                <div className="relative z-20 mb-4">
                  <motion.div
                    className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#8EB69B] to-[#235347] border-2 border-[#DAF1DE]/50 flex items-center justify-center shadow-2xl backdrop-blur-sm cursor-pointer"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 40px rgba(142, 182, 155, 0.6)"
                    }}
                    transition={{ duration: 0.2 }}
                    onHoverStart={() => setHoveredStep(step.id)}
                    onHoverEnd={() => setHoveredStep(null)}
                  >
                    <span className="text-xl font-bold text-white">{step.number}</span>
                    
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 w-full h-full rounded-full bg-[#8EB69B]/20 blur-xl"
                      animate={{
                        scale: hoveredStep === step.id ? [1, 1.3, 1] : [1, 1.1, 1],
                        opacity: hoveredStep === step.id ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>

                  {/* Particle burst on hover */}
                  {hoveredStep === step.id && (
                    <div className="absolute inset-0">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-[#8EB69B] rounded-full"
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                          initial={{ 
                            x: 0, 
                            y: 0, 
                            opacity: 1,
                            scale: 0
                          }}
                          animate={{
                            x: Math.cos((i * 60) * Math.PI / 180) * 50,
                            y: Math.sin((i * 60) * Math.PI / 180) * 50,
                            opacity: 0,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.5,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Step Title - Above the node */}
                <motion.h3 
                  className="text-lg font-bold text-white mb-2 transition-colors duration-300"
                  animate={{
                    color: hoveredStep === step.id ? "#8EB69B" : "#ffffff"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {step.title}
                </motion.h3>

                {/* Step Description - Below the title */}
                <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 100 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-6 rounded-2xl bg-gradient-to-r from-[#8EB69B]/10 to-[#235347]/10 border border-[#8EB69B]/30 backdrop-blur-md shadow-2xl">
            <motion.div 
              className="w-4 h-4 rounded-full bg-[#8EB69B]"
              animate={{
                scale: [1, 1.5, 1],
                boxShadow: ["0 0 0 0 rgba(142, 182, 155, 0.4)", "0 0 0 20px rgba(142, 182, 155, 0)"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-white/95 text-lg font-semibold">
              Complete your project in: <span className="text-[#8EB69B] font-bold">4-6 weeks</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
