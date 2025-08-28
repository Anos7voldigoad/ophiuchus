import React, { useState } from "react";
import viperLogo from "../../assets/viperr.png";
import { PrimaryBtn } from "../ui";

const Nav: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-400/20 bg-base-900/80 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] rounded bg-brand-400 px-3 py-2 text-black">Skip to content</a>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#8EB69B] to-[#DAF1DE] shadow">
            <img src={viperLogo} alt="Ophiuschus logo" className="h-6 w-6 object-contain" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">Ophiuschus AI</span>
        </div>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-white/80 sm:flex">
          <a href="#services" className="transition-colors hover:text-brand-400">Services</a>
          <a href="#process" className="transition-colors hover:text-brand-400">Process</a>
          <a href="#results" className="transition-colors hover:text-brand-400">Results</a>
          <a href="#faq" className="transition-colors hover:text-brand-400">FAQ</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <PrimaryBtn href="#" aria-label="Book a consultation" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-consultation')); }}>Book a consultation</PrimaryBtn>
          </div>
          {/* Mobile menu button */}
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#8EB69B] sm:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-white/10 bg-base-900/95 backdrop-blur">
          <nav className="container py-3">
            <ul className="flex flex-col gap-2 text-white/90">
              <li><a onClick={() => setMobileOpen(false)} href="#services" className="block rounded-lg px-2 py-2 hover:bg-white/5">Services</a></li>
              <li><a onClick={() => setMobileOpen(false)} href="#process" className="block rounded-lg px-2 py-2 hover:bg-white/5">Process</a></li>
              <li><a onClick={() => setMobileOpen(false)} href="#results" className="block rounded-lg px-2 py-2 hover:bg-white/5">Results</a></li>
              <li><a onClick={() => setMobileOpen(false)} href="#faq" className="block rounded-lg px-2 py-2 hover:bg-white/5">FAQ</a></li>
              <li className="pt-2"><PrimaryBtn href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-consultation')); }}>Book a consultation</PrimaryBtn></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Nav;



