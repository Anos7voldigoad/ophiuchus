import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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
                  <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(142,182,155,0.3)]">Terms of Service</h2>
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
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">1. Acceptance of Terms</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    By accessing and using the services provided by Ophiuschus AI ("we," "us," or "our"), you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">2. Services Description</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    Ophiuschus AI provides digital transformation services including:
                  </p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• Website development and design</li>
                    <li>• Automation integration (n8n workflows)</li>
                    <li>• AI voice agents and chatbots</li>
                    <li>• Digital advertising management</li>
                    <li>• Business process optimization</li>
                    <li>• Digital strategy consulting</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">3. Client Responsibilities</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">As a client, you agree to:</p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• Provide accurate and complete information</li>
                    <li>• Cooperate with our team during project development</li>
                    <li>• Provide timely feedback and approvals</li>
                    <li>• Maintain confidentiality of project details</li>
                    <li>• Pay agreed-upon fees in a timely manner</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">4. Payment Terms</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    Payment terms will be specified in individual project agreements. Generally:
                  </p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• 50% deposit required to begin work</li>
                    <li>• Remaining balance due upon project completion</li>
                    <li>• Additional work billed at agreed rates</li>
                    <li>• Late payments may incur additional fees</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">5. Intellectual Property</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    Upon full payment, you will own the rights to custom work created for your project. We retain rights to:
                  </p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• Our proprietary tools and frameworks</li>
                    <li>• Portfolio rights to showcase completed work</li>
                    <li>• Reusable code components and templates</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">6. Project Timeline</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    Project timelines will be established in project agreements. Delays may occur due to:
                  </p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• Client feedback delays</li>
                    <li>• Scope changes</li>
                    <li>• Technical challenges</li>
                    <li>• Force majeure events</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">7. Limitation of Liability</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    Our liability is limited to the amount paid for services. We are not liable for:
                  </p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• Indirect or consequential damages</li>
                    <li>• Loss of profits or business opportunities</li>
                    <li>• Third-party service issues</li>
                    <li>• Data loss or security breaches</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">8. Termination</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    Either party may terminate services with written notice. Upon termination:
                  </p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• Work completed will be delivered</li>
                    <li>• Outstanding payments become due</li>
                    <li>• Confidentiality obligations remain in effect</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">9. Confidentiality</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    We maintain strict confidentiality of your business information and project details. We will not disclose confidential information to third parties without your consent.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">10. Changes to Terms</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#8EB69B] mb-3">11. Contact Information</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    For questions about these terms, please contact us:
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

export default TermsModal;


