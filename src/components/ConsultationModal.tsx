import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryBtn } from "./ui";

type ContactMethod = "email" | "phone";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const SITE_KEY = "6LcRrrcrAAAAAFsPoitByrEX6gd6PBgbRfmm_yuc"; // reCAPTCHA v3 site key
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw75BF6ItpCU90ZFnSnpnUAhBV8BBPMUFVbl6w7IFBVYL21YXfhDcjuU3dvhgN66BKe8A/exec";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Honeypot
  if (formData.botField) return;

  setIsSubmitting(true);
  setStatus("");

  try {
    // Get reCAPTCHA v3 token
    const token = await new Promise<string>((resolve, reject) => {
      // @ts-ignore
      window.grecaptcha.ready(() => {
        // @ts-ignore
        window.grecaptcha
          .execute(SITE_KEY, { action: "submit" })
          .then((token: string) => {
            console.log("Generated token:", token); // Debug log
            resolve(token);
          })
          .catch(reject);
      });
    });

    // Build URL-encoded body (no custom headers -> no CORS preflight)
    const body = new URLSearchParams();
    body.set("name", formData.name);
    body.set("gmail", formData.gmail);               // <-- map email -> gmail (your sheet header)
    body.set("business", formData.businessName);
    body.set("service", formData.service);
    body.set("date", formData.date);
    body.set("time", formData.time);
    body.set("contactMethod", formData.contactMethod);
    body.set("phone", formData.contactMethod === "phone" ? formData.phone : "");
    body.set("message", formData.message);
    body.set("botField", formData.botField);
    body.set("token", token);

    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body, // IMPORTANT: no headers -> browser sets x-www-form-urlencoded and avoids preflight
    });

    const json = await res.json().catch(() => ({}));

    if (res.ok && json.success) {
      setStatus("success");
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
      setTimeout(() => {
        onClose();
        setStatus("");
      }, 2000);
    } else {
      console.error("Apps Script error:", json);
      setStatus("error");
    }
  } catch (err) {
    console.error(err);
    setStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};

  const resetForm = () => {
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
      botField: ""
    });
    setStatus("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
          onClick={onClose}
        >
                      <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Enhanced glassmorphism background effects */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#8EB69B]/15 to-[#DAF1DE]/10 blur-2xl" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tl from-[#163832]/20 to-transparent" />
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#8EB69B]/20 via-transparent to-[#DAF1DE]/20 blur-lg opacity-50" />
            
            <div className="relative bg-gradient-to-br from-[#0B2B26]/80 to-[#163832]/90 border border-[#8EB69B]/30 rounded-3xl shadow-2xl backdrop-blur-2xl">
                              {/* Header with enhanced glassmorphism */}
                <div className="flex items-center justify-between p-6 border-b border-[#8EB69B]/20 bg-gradient-to-r from-[#8EB69B]/5 to-transparent backdrop-blur-sm">
                  <div>
                    <h2 className="text-2xl font-semibold text-white drop-shadow-sm">Book a Consultation</h2>
                    <p className="text-sm text-white/70 mt-1 drop-shadow-sm">Let's discuss your AI automation needs</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white/60 hover:text-white transition-all duration-200 p-2 rounded-full hover:bg-white/10 hover:shadow-lg hover:shadow-[#8EB69B]/20 backdrop-blur-sm"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

              {/* Form with glassmorphism effects */}
              <form 
                onSubmit={handleSubmit} 
                className="p-6 space-y-3 bg-gradient-to-b from-transparent to-[#8EB69B]/5 backdrop-blur-sm"
              >
                {/* Honeypot field */}
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                />

                {/* Name and Email in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1">
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
                      className="w-full px-3 py-2 bg-[#0B2B26]/40 border border-[#8EB69B]/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/50 focus:border-[#8EB69B] transition-all text-sm backdrop-blur-sm shadow-inner"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
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
                      className="w-full px-3 py-2 bg-[#0B2B26]/40 border border-[#8EB69B]/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/50 focus:border-[#8EB69B] transition-all text-sm backdrop-blur-sm shadow-inner"
                    />
                  </div>
                </div>

                {/* Business Name and Service in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-white/90 mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      placeholder="Your company name"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#0B2B26]/40 border border-[#8EB69B]/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/50 focus:border-[#8EB69B] transition-all text-sm backdrop-blur-sm shadow-inner"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-white/90 mb-1">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#0B2B26]/40 border border-[#8EB69B]/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/50 focus:border-[#8EB69B] transition-all text-sm backdrop-blur-sm shadow-inner"
                    >
                      <option value="">Select a service</option>
                      <option value="chatbot">AI Chatbot Development</option>
                      <option value="automation">Workflow Automation</option>
                      <option value="ads">Meta/Google Ads Management</option>
                      <option value="consulting">AI Strategy Consulting</option>
                      <option value="custom">Custom AI Solution</option>
                    </select>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-white/90 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#0B2B26]/40 border border-[#8EB69B]/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/50 focus:border-[#8EB69B] transition-all text-sm backdrop-blur-sm shadow-inner"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-white/90 mb-1">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#0B2B26]/40 border border-[#8EB69B]/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/50 focus:border-[#8EB69B] transition-all text-sm backdrop-blur-sm shadow-inner"
                    />
                  </div>
                </div>

                {/* Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="email"
                        checked={formData.contactMethod === "email"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#8EB69B] bg-[#0B2B26] border-[#8EB69B]/30 focus:ring-[#8EB69B]/50"
                      />
                      <span className="ml-2 text-white/90 text-sm">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        checked={formData.contactMethod === "phone"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#8EB69B] bg-[#0B2B26] border-[#8EB69B]/30 focus:ring-[#8EB69B]/50"
                      />
                      <span className="ml-2 text-white/90 text-sm">Phone</span>
                    </label>
                  </div>
                </div>

                {/* Phone Number (conditional) */}
                {formData.contactMethod === "phone" && (
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#0B2B26]/40 border border-[#8EB69B]/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/50 focus:border-[#8EB69B] transition-all text-sm backdrop-blur-sm shadow-inner"
                    />
                  </div>
                )}

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project, goals, and requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-[#0B2B26]/40 border border-[#8EB69B]/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/50 focus:border-[#8EB69B] transition-all resize-none text-sm backdrop-blur-sm shadow-inner"
                  />
                </div>



                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#8EB69B] to-[#DAF1DE] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#8EB69B]/30 transition hover:from-[#7AA68A] hover:to-[#C5E5CC] focus:outline-none focus:ring-2 focus:ring-[#DAF1DE] focus:ring-offset-2 focus:ring-offset-[#8EB69B] disabled:opacity-50 disabled:cursor-not-allowed"
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
                    "Book Consultation"
                  )}
                </button>

                {/* Status Messages with glassmorphism */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-[#8EB69B]/20 border border-[#8EB69B]/30 rounded-2xl text-[#DAF1DE] text-sm text-center backdrop-blur-sm shadow-lg shadow-[#8EB69B]/20"
                  >
                    ✅ Consultation request submitted successfully! We'll be in touch soon.
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-300 text-sm text-center backdrop-blur-sm shadow-lg shadow-red-500/20"
                  >
                    ❌ Something went wrong. Please try again or contact us directly.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal;

