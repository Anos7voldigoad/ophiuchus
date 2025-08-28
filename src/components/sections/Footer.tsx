import React from "react";
import viperLogo from "../../assets/viperr.png";

const Footer: React.FC = () => (
  <footer className="py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-white/60 sm:flex-row">
      <div className="flex items-center gap-2">
        <img src={viperLogo} alt="Ophiuschus" className="h-5 w-5 object-contain opacity-80" />
        <span>© {new Date().getFullYear()} Ophiuschus AI. All rights reserved.</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-[#8EB69B]">Privacy</a>
        <a href="#" className="hover:text-[#8EB69B]">Terms</a>
      </div>
    </div>
  </footer>
);

export default Footer;










