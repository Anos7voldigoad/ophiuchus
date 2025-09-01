import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "../ui";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does it take to get my business online?",
      answer: "We can have your basic website live within 2-3 weeks. Complete digital transformation including automation and AI systems typically takes 4-6 weeks. We work quickly to get you generating revenue online as soon as possible.",
      category: "Timeline"
    },
    {
      question: "Do I own my website and digital systems?",
      answer: "Absolutely. We build everything on open-source platforms and provide you with full ownership of your website, code, and digital assets. No vendor lock-in, ever.",
      category: "Ownership"
    },
    {
      question: "What if I don't have technical knowledge?",
      answer: "No problem! We handle all the technical aspects and provide you with simple, user-friendly dashboards to manage your online presence. We also offer training and ongoing support.",
      category: "Technical"
    },
    {
      question: "Can you work with my existing business processes?",
      answer: "Yes! We analyze your current operations and design digital solutions that enhance your existing workflows, not replace them. We integrate with your current systems and processes.",
      category: "Integration"
    },
    {
      question: "How do you ensure my online business is secure?",
      answer: "We implement enterprise-grade security measures including SSL certificates, secure payment processing, data encryption, and regular security updates. Your business and customer data are protected.",
      category: "Security"
    },
    {
      question: "What ongoing support do you provide?",
      answer: "We provide 30 days of post-launch support and offer flexible maintenance packages for ongoing updates, security patches, and feature additions. We're here to ensure your online success.",
      category: "Support"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
  <section id="faq" className="py-14 sm:py-16">
    <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <SectionTitle 
            eyebrow="FAQ" 
            title="Going Online Questions" 
            subtitle="Everything you need to know about transforming your business digitally." 
          />
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div 
                className="relative rounded-xl border border-[#8EB69B]/20 bg-[#0B2B26]/20 p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:border-[#8EB69B]/30 hover:bg-[#0B2B26]/30"
                onClick={() => toggleFAQ(index)}
              >
                {/* Category Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span className="text-[10px] sm:text-xs font-medium text-[#8EB69B] bg-[#8EB69B]/10 px-2 py-1 rounded-full">
                    {faq.category}
                  </span>
                </div>

                {/* Question */}
                <div className="flex items-center justify-between pr-10 sm:pr-16">
                  <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#8EB69B] transition-colors duration-300">
                    {faq.question}
                  </h3>
                  
                  {/* Animated Arrow */}
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#8EB69B] ml-4"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#8EB69B]/20">
                        <p className="text-white/70 leading-relaxed text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
        ))}
      </div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block p-6 border border-[#8EB69B]/20 rounded-xl bg-[#0B2B26]/20">
            <h3 className="text-xl font-bold text-white mb-3">Still have questions?</h3>
            <p className="text-white/60 mb-4 max-w-md">
              We're here to help. Schedule a call and we'll answer everything in detail.
            </p>
            <button 
              className="px-6 py-3 bg-[#8EB69B] text-black font-medium rounded-lg hover:bg-[#8EB69B]/90 transition-colors"
              onClick={() => window.dispatchEvent(new Event('open-consultation'))}
            >
              Schedule a Call
            </button>
          </div>
        </motion.div>
    </div>
  </section>
);
};

export default FAQ;











