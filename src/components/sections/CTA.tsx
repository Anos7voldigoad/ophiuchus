import React from "react";

const CTA: React.FC = () => (
  <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-[#8EB69B] to-[#DAF1DE] py-14 sm:py-16">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,0,0,.12),transparent_40%)]" />
    <div className="relative mx-auto max-w-6xl px-4">
      <div className="mx-auto max-w-2xl text-center text-black">
        <h3 className="text-3xl sm:text-4xl font-semibold leading-tight">Let's design your AI advantage</h3>
        <p className="mt-2 text-base text-black/70">Book a 20‑minute consultation. We'll map the fastest path to ROI.</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-consultation')); }} className="rounded-2xl bg-[#051F20] px-6 py-3 text-sm font-semibold text-white shadow transition-colors hover:bg-[#0A2A2B] focus:outline-none focus:ring-2 focus:ring-black/20">Book a consultation</a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@ophiuschus.ai" target="_blank" rel="noopener" aria-label="Email us at hello@ophiuschus.ai" className="rounded-2xl border border-[#051F20]/20 px-6 py-3 text-sm font-semibold text-[#051F20] transition-colors hover:bg-[#051F20]/10 focus:outline-none focus:ring-2 focus:ring-black/10">or email us</a>
        </div>
        <p className="mt-2 text-xs text-black/70">No obligation. 20 minutes.</p>
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
        <div className="mt-6 grid gap-3 text-left text-sm text-black/85 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-white/40 px-4 py-3">
            <p className="font-semibold leading-tight">What will we cover?</p>
            <p className="text-black/70">Goals, current stack, quick wins, and a tailored next step.</p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white/40 px-4 py-3">
            <p className="font-semibold leading-tight">Any commitment?</p>
            <p className="text-black/70">No. It's an advisory call—keep the plan even if you don't hire us.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;










