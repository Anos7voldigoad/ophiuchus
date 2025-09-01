import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-thin"
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
              
              {/* Header */}
              <motion.div 
                className="relative flex items-center justify-between p-6 border-b border-[#8EB69B]/30 bg-gradient-to-r from-[#8EB69B]/10 to-transparent backdrop-blur-sm rounded-t-2xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(142,182,155,0.3)]">Privacy Policy</h2>
                  <p className="text-sm text-white/70 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
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

              {/* Content */}
              <motion.div 
                className="relative p-6 space-y-6 bg-gradient-to-b from-transparent to-[#8EB69B]/5 backdrop-blur-sm max-h-[70vh] overflow-y-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">1. Information We Collect</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• Contact us through our consultation form</li>
                    <li>• Sign up for our services</li>
                    <li>• Request information about our digital transformation services</li>
                    <li>• Communicate with us via email or phone</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">2. Types of Information</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">We may collect the following types of information:</p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• <strong>Personal Information:</strong> Name, email address, phone number, business name</li>
                    <li>• <strong>Business Information:</strong> Company details, project requirements, goals</li>
                    <li>• <strong>Technical Information:</strong> IP address, browser type, device information</li>
                    <li>• <strong>Usage Information:</strong> How you interact with our website and services</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">3. How We Use Your Information</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">We use the information we collect to:</p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• Provide and improve our digital transformation services</li>
                    <li>• Communicate with you about your projects</li>
                    <li>• Send you relevant information and updates</li>
                    <li>• Analyze website usage and improve user experience</li>
                    <li>• Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">4. Information Sharing</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:
                  </p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• To trusted service providers who assist us in operating our business</li>
                    <li>• When required by law or to protect our rights</li>
                    <li>• In connection with a business transfer or merger</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">5. Data Security</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">6. Your Rights</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">You have the right to:</p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• Access and update your personal information</li>
                    <li>• Request deletion of your personal information</li>
                    <li>• Opt-out of marketing communications</li>
                    <li>• Request information about how we process your data</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">7. Cookies and Tracking</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    We use cookies and similar technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">8. Contact Us</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="bg-[#8EB69B]/10 border border-[#8EB69B]/30 rounded-lg p-4">
                    <p className="text-white/90 text-sm">
                      <strong>Email:</strong> hello@ophiuschus.ai<br />
                      <strong>Address:</strong> Ophiuschus AI Digital Transformation Services
                    </p>
                  </div>
                </section>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyModal;


