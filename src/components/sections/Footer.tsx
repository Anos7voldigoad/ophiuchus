import React, { useState } from "react";
import viperLogo from "../../assets/viperr.png";
import PrivacyModal from "../PrivacyModal";
import TermsModal from "../TermsModal";

const Footer: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
      <footer className="py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-white/60 sm:flex-row">
          <div className="flex items-center gap-2">
            <img src={viperLogo} alt="Ophiuschus" className="h-5 w-5 object-contain opacity-80" />
            <span>© {new Date().getFullYear()} Ophiuschus AI. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-[#8EB69B] transition-colors duration-300 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-[#8EB69B] transition-colors duration-300 cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
};

export default Footer;










