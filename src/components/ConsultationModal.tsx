import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ContactMethod = "email" | "phone";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// reCAPTCHA configuration
const RECAPTCHA_SITE_KEY = "6LdBwbsrAAAAADZQW88u6bnAT1RR4wNEWV7NbyfW";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyISu2Tzx8ZiPK_6wRIyqEalP8I98Ox61gWbOSuA0jf7q7OjKL7yg9CUAiQvfsW8MnxuA/exec";

const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    gmail: "",
    businessName: "",
    service: "",
    date: "",
    time: "",
    contactMethod: "email" as ContactMethod,
    phone: "",
    message: "",
    botField: "" // honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // Check if reCAPTCHA is loaded
  useEffect(() => {
    const checkRecaptcha = () => {
      if (typeof window !== 'undefined' && (window as any).grecaptcha) {
        setRecaptchaLoaded(true);
      } else {
        setTimeout(checkRecaptcha, 100);
      }
    };
    checkRecaptcha();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getRecaptchaToken = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!recaptchaLoaded) {
        console.error('reCAPTCHA not loaded');
        reject(new Error('reCAPTCHA not loaded'));
        return;
      }
      try {
        console.log('Calling grecaptcha.ready');
        (window as any).grecaptcha.ready(() => {
          console.log('Calling grecaptcha.execute');
          (window as any).grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: "submit" })
            .then((token: string) => {
              console.log('reCAPTCHA token received:', token);
              resolve(token);
            })
            .catch((error: any) => {
              console.error('reCAPTCHA execution error:', error);
              reject(error);
            });
        });
      } catch (error) {
        console.error('reCAPTCHA error:', error);
        reject(error);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.botField) {
      console.log('Bot detected');
      return;
    }

    // Validation
    if (!formData.name.trim() || !formData.gmail.trim()) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      // Get reCAPTCHA token
      const token = await getRecaptchaToken();
      console.log('Token to be sent with form:', token);

      // Build URL-encoded body
      const body = new URLSearchParams();
      body.set("name", formData.name.trim());
      body.set("gmail", formData.gmail.trim());
      body.set("businessName", formData.businessName.trim());
      body.set("service", formData.service);
      body.set("date", formData.date);
      body.set("time", formData.time);
      body.set("contactMethod", formData.contactMethod);
      body.set("phone", formData.contactMethod === "phone" ? formData.phone.trim() : "");
      body.set("message", formData.message.trim());
      body.set("botField", formData.botField);
      body.set("recaptchaToken", token);
      body.set("timestamp", new Date().toISOString());

      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Apps Script response:', result);
      
      if (result.success) {
        setStatus("success");
        // Reset form
        setFormData({
          name: "",
          gmail: "",
          businessName: "",
          service: "",
          date: "",
          time: "",
          contactMethod: "email",
          phone: "",
          message: "",
          botField: "",
        });
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setStatus("");
        }, 2000);
      } else {
        console.error("Apps Script error:", result);
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced background with neon effects */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8EB69B]/15 to-[#DAF1DE]/15 blur-2xl" style={{ boxShadow: '0 0 60px rgba(142, 182, 155, 0.2)' }} />
            
            <div className="relative bg-gradient-to-br from-[#0B2B26]/95 via-[#163832]/90 to-[#0B2B26]/95 border border-[#8EB69B]/40 rounded-2xl shadow-2xl backdrop-blur-xl" style={{ 
              boxShadow: '0 20px 60px rgba(142, 182, 155, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px)'
            }}>
              {/* Neon border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8EB69B]/20 via-transparent to-[#DAF1DE]/20 opacity-60" />
              
              {/* Header with enhanced glassmorphism */}
              <motion.div 
                className="relative flex items-center justify-between p-6 border-b border-[#8EB69B]/30 bg-gradient-to-r from-[#8EB69B]/10 to-transparent backdrop-blur-sm rounded-t-2xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(142,182,155,0.3)]">Start Your Digital Transformation</h2>
                  <p className="text-sm text-white/70 mt-1">Let's discuss your journey to going online</p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 backdrop-blur-sm"
                  aria-label="Close modal"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>

              {/* Form with enhanced glassmorphism */}
              <motion.form 
                onSubmit={handleSubmit} 
                className="relative p-6 space-y-4 bg-gradient-to-b from-transparent to-[#8EB69B]/5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Honeypot field */}
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <label htmlFor="name" className="block text-sm font-semibold text-white/90 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="w-full px-3 py-2 bg-gradient-to-r from-[#0B2B26]/60 to-[#163832]/60 border border-[#8EB69B]/40 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/60 focus:border-[#8EB69B] transition-all duration-300 text-sm backdrop-blur-sm"
                      style={{ boxShadow: '0 4px 20px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="gmail"
                      name="gmail"
                      placeholder="your@gmail.com"
                      value={formData.gmail}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="w-full px-3 py-2 bg-gradient-to-r from-[#0B2B26]/60 to-[#163832]/60 border border-[#8EB69B]/40 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/60 focus:border-[#8EB69B] transition-all duration-300 text-sm backdrop-blur-sm"
                      style={{ boxShadow: '0 4px 20px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                    />
                  </motion.div>
                </div>

                {/* Business Name and Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <label htmlFor="businessName" className="block text-sm font-semibold text-white/90 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      placeholder="Your company name"
                      value={formData.businessName}
                      onChange={handleChange}
                      autoComplete="organization"
                      className="w-full px-3 py-2 bg-gradient-to-r from-[#0B2B26]/60 to-[#163832]/60 border border-[#8EB69B]/40 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/60 focus:border-[#8EB69B] transition-all duration-300 text-sm backdrop-blur-sm"
                      style={{ boxShadow: '0 4px 20px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <label htmlFor="service" className="block text-sm font-semibold text-white/90 mb-2">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gradient-to-r from-[#0B2B26]/60 to-[#163832]/60 border border-[#8EB69B]/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/60 focus:border-[#8EB69B] transition-all duration-300 text-sm backdrop-blur-sm"
                      style={{ boxShadow: '0 4px 20px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                    >
                      <option value="">Select a service</option>
                      <option value="website">Website Development</option>
                      <option value="automation">Automation Integration (n8n)</option>
                      <option value="voice">AI Voice Agents</option>
                      <option value="ads">Ad Management</option>
                      <option value="consulting">Digital Strategy Consulting</option>
                      <option value="custom">Custom Solution</option>
                    </select>
                  </motion.div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <label htmlFor="date" className="block text-sm font-semibold text-white/90 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 bg-gradient-to-r from-[#0B2B26]/60 to-[#163832]/60 border border-[#8EB69B]/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/60 focus:border-[#8EB69B] transition-all duration-300 text-sm backdrop-blur-sm"
                      style={{ boxShadow: '0 4px 20px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <label htmlFor="time" className="block text-sm font-semibold text-white/90 mb-2">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gradient-to-r from-[#0B2B26]/60 to-[#163832]/60 border border-[#8EB69B]/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/60 focus:border-[#8EB69B] transition-all duration-300 text-sm backdrop-blur-sm"
                      style={{ boxShadow: '0 4px 20px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                    />
                  </motion.div>
                </div>

                {/* Contact Method */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <label className="block text-sm font-semibold text-white/90 mb-3">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="email"
                        checked={formData.contactMethod === "email"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#8EB69B] bg-[#0B2B26] border-[#8EB69B]/40 focus:ring-[#8EB69B]/60"
                      />
                      <span className="ml-2 text-white/90 text-sm font-medium">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        checked={formData.contactMethod === "phone"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#8EB69B] bg-[#0B2B26] border-[#8EB69B]/40 focus:ring-[#8EB69B]/60"
                      />
                      <span className="ml-2 text-white/90 text-sm font-medium">Phone</span>
                    </label>
                  </div>
                </motion.div>

                {/* Phone Number (conditional) */}
                <AnimatePresence>
                  {formData.contactMethod === "phone" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <label htmlFor="phone" className="block text-sm font-semibold text-white/90 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        className="w-full px-3 py-2 bg-gradient-to-r from-[#0B2B26]/60 to-[#163832]/60 border border-[#8EB69B]/40 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/60 focus:border-[#8EB69B] transition-all duration-300 text-sm backdrop-blur-sm"
                        style={{ boxShadow: '0 4px 20px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <label htmlFor="message" className="block text-sm font-semibold text-white/90 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project, goals, and requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-gradient-to-r from-[#0B2B26]/60 to-[#163832]/60 border border-[#8EB69B]/40 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/60 focus:border-[#8EB69B] transition-all resize-none duration-300 text-sm backdrop-blur-sm"
                    style={{ boxShadow: '0 4px 20px rgba(142, 182, 155, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                  />
                </motion.div>

                {/* reCAPTCHA Status */}
                {!recaptchaLoaded && (
                  <div className="text-xs text-yellow-400 text-center drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]">
                    Loading security verification...
                  </div>
                )}

                {/* Enhanced Submit Button with neon effects */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !recaptchaLoaded}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#8EB69B] to-[#DAF1DE] px-6 py-3 text-sm font-bold text-black shadow-xl transition-all duration-300 hover:from-[#7AA68A] hover:to-[#C5E5CC] focus:outline-none focus:ring-2 focus:ring-[#DAF1DE] focus:ring-offset-2 focus:ring-offset-[#8EB69B] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    boxShadow: '0 8px 32px rgba(142, 182, 155, 0.3), 0 0 0 1px rgba(142, 182, 155, 0.1)',
                    filter: 'drop-shadow(0 0 8px rgba(142, 182, 155, 0.4))'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Start My Transformation"
                  )}
                </motion.button>

                {/* Enhanced Status Messages with neon effects */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="p-3 bg-gradient-to-r from-[#8EB69B]/20 to-[#DAF1DE]/20 border border-[#8EB69B]/40 rounded-xl text-[#DAF1DE] text-sm text-center backdrop-blur-sm"
                      style={{ boxShadow: '0 4px 20px rgba(142, 182, 155, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}
                    >
                      Transformation request submitted successfully! We'll be in touch soon to start your journey online.
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="p-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/40 rounded-xl text-red-300 text-sm text-center backdrop-blur-sm"
                      style={{ boxShadow: '0 4px 20px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}
                    >
                      Something went wrong. Please try again or contact us directly at hello@ophiuschus.ai
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal;

