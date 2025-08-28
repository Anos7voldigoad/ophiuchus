import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import viperr from "../assets/viperr.png";

type ContactMethod = "email" | "phone";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Optional Google Forms integration
// Source form (preview): https://docs.google.com/forms/d/e/1FAIpQLSe7cd6_3UFHYEg-eGwDoHFEX7-MJQ4ynE3TxHY4tVLN-QWFZg/viewform
// Submission endpoint must use formResponse (not viewform)
const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSe7cd6_3UFHYEg-eGwDoHFEX7-MJQ4ynE3TxHY4tVLN-QWFZg/formResponse";
// Optional Apps Script JSON endpoint (preferred). Set to your deployed Web App URL, e.g.:
// const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYED_URL_HERE/exec";
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzkyjtEpZknr9Ai6dgLp5XCZyP0IdL74mwfLOUamzJBi0C7gzMOvyXhNUGD6un_DQ0d/exec";
const GOOGLE_FORM_ENTRIES = {
  name: "entry.665165831",
  email: "entry.132634577",
  business: "entry.269460461",
  service: "entry.1895920993",
  contactMethod: "entry.412173692",
  phone: "entry.1358709874",
  // date and time are special Google Form types that want split fields
  date: "entry.1200147961",
  time: "entry.501833383",
  message: "entry.645572225"
};

const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const useAppsScriptNativePost = Boolean(GOOGLE_APPS_SCRIPT_URL);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Debug helper: run `testSubmit()` in DevTools to send a sample submission
  useEffect(() => {
    // @ts-ignore attach for debugging only
    (window as any).testSubmit = () => {
      const fd = new FormData();
      fd.append("entry.665165831", "Test Name");
      fd.append("entry.132634577", "test@example.com");
      fd.append("entry.1200147961_year", "2025");
      fd.append("entry.1200147961_month", "08");
      fd.append("entry.1200147961_day", "29");
      fd.append("entry.501833383_hour", "10");
      fd.append("entry.501833383_minute", "15");
      fd.append("entry.501833383_ampm", "AM");
      fd.append("entry.645572225", "Just testing");
      console.log("Sending test submission...");
      fetch(GOOGLE_FORM_ACTION, { method: "POST", mode: "no-cors", body: fd });
    };
    return () => { try { delete (window as any).testSubmit; } catch {} };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🧪 Submit handler triggered");
    setAttempted(true);
    const missingRequired = !name || !email || !service || (contactMethod === "phone" && !phone);
    if (missingRequired) return;
    // Build payload via Apps Script / Google Forms only (no email fallback)
    // Prefer Apps Script JSON endpoint if provided
    if (GOOGLE_APPS_SCRIPT_URL) {
      const payload = {
        name,
        gmail: email,
        business,
        service,
        contact: contactMethod,
        date,
        time,
        notes: message,
        phone
      };
      try {
        // Debug: log payload and response text
        console.log("Sending to Apps Script:", JSON.stringify(payload));
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const text = await response.text().catch(() => "");
        if (text) console.log("Response from Apps Script:", text);
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); onClose(); }, 1200);
        return;
      } catch (err) {
        console.error('Apps Script submission failed:', err);
        // Fall through to Google Forms fallback
      }
    }

    if (GOOGLE_FORM_ACTION && GOOGLE_FORM_ENTRIES.name) {
      // More reliable cross-origin submission using a temporary form element
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_FORM_ACTION;
      form.target = '_self';
      form.style.position = 'fixed';
      form.style.left = '-9999px';

      const append = (name: string, value: string | undefined) => {
        if (!name || value == null || value === '') return;
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };

      append(GOOGLE_FORM_ENTRIES.name, name);
      append(GOOGLE_FORM_ENTRIES.email, email);
      append(GOOGLE_FORM_ENTRIES.business, business);
      append(GOOGLE_FORM_ENTRIES.service, service);
      append(GOOGLE_FORM_ENTRIES.contactMethod, contactMethod);
      if (contactMethod === 'phone') append(GOOGLE_FORM_ENTRIES.phone, phone);

      if (date) {
        const [yyyy, mm, dd] = date.split('-');
        append('entry.1200147961_month', mm || '');
        append('entry.1200147961_day', dd || '');
        append('entry.1200147961_year', yyyy || '');
      }
      if (time) {
        const [hhStr, minStr] = time.split(':');
        let hh = parseInt(hhStr || '0', 10);
        let ampm = 'AM';
        if (hh >= 12) { ampm = 'PM'; if (hh > 12) hh -= 12; }
        else if (hh === 0) { hh = 12; }
        append('entry.501833383_hour', String(hh));
        append('entry.501833383_minute', minStr || '00');
        append('entry.501833383_ampm', ampm);
      }
      append(GOOGLE_FORM_ENTRIES.message, message);
      // extras
      append('fvv', '1');
      append('draftResponse', '[]');
      append('pageHistory', '0');
      append('submit', 'Submit');

      document.body.appendChild(form);
      try {
        console.log('Submitting via form element...');
        form.submit();
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
          try { document.body.removeChild(form); } catch {}
        }, 1200);
        return;
      } catch (err) {
        console.error('Form element submission failed:', err);
        try { document.body.removeChild(form); } catch {}
      }
    }
    // No Gmail fallback. Show a non-intrusive error toast instead.
    setSubmitError("Submission failed. Please try again or contact us by email.");
    setTimeout(() => setSubmitError(""), 2500);
  };

  // Native POST to Apps Script using browser form submission (no JS fetch)
  const nativeSubmit = (e: React.FormEvent) => {
    console.log("🧪 Native submit triggered");
    setAttempted(true);
    const missingRequired = !name || !email || !service || (contactMethod === "phone" && !phone);
    if (missingRequired) {
      e.preventDefault();
      return;
    }
    // Let the browser submit the form to GOOGLE_APPS_SCRIPT_URL
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative z-[101] w-full max-w-xl rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 sm:p-7 text-white shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#8EB69B] to-[#DAF1DE] shadow">
                <img src={viperr} alt="logo" className="h-6 w-6 object-contain" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">Book a consultation</h3>
                <p className="text-white/70 text-sm">No obligation. 20 minutes.</p>
              </div>
            </div>
            <form
              onSubmit={useAppsScriptNativePost ? nativeSubmit : submit}
              action={useAppsScriptNativePost ? GOOGLE_APPS_SCRIPT_URL : undefined}
              method={useAppsScriptNativePost ? 'POST' : undefined}
              target={useAppsScriptNativePost ? '_blank' : undefined}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-white/80">Name <span className="text-[#8EB69B]">*</span></span>
                <input name="name" required placeholder="Jane Doe" className={`rounded-xl border bg-white/5 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#8EB69B] focus:bg-white/10 ${attempted && !name ? 'border-rose-400/60' : 'border-white/20'}`} value={name} onChange={(e) => setName(e.target.value)} />
                {attempted && !name && <span className="text-[12px] text-rose-300">Name is required.</span>}
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-white/80">Email (Gmail) <span className="text-[#8EB69B]">*</span></span>
                <input name="gmail" required type="email" placeholder="you@gmail.com" className={`rounded-xl border bg-white/5 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#8EB69B] focus:bg-white/10 ${attempted && !email ? 'border-rose-400/60' : 'border-white/20'}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                {attempted && !email && <span className="text-[12px] text-rose-300">Email is required.</span>}
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-[13px] font-medium text-white/80">Business name</span>
                <input name="business" placeholder="Ophiuschus AI" className="rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#8EB69B] focus:bg-white/10" value={business} onChange={(e) => setBusiness(e.target.value)} />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-[13px] font-medium text-white/80">Service of interest <span className="text-[#8EB69B]">*</span></span>
                <input name="service" required placeholder="Chatbots, Ads, Automation…" className={`rounded-xl border bg-white/5 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#8EB69B] focus:bg-white/10 ${attempted && !service ? 'border-rose-400/60' : 'border-white/20'}`} value={service} onChange={(e) => setService(e.target.value)} />
                {attempted && !service && <span className="text-[12px] text-rose-300">Service is required.</span>}
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-white/80">Preferred date</span>
                <input name="date" type="date" className="rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#8EB69B] focus:bg-white/10" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-white/80">Preferred time</span>
                <input name="time" type="time" className="rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#8EB69B] focus:bg-white/10" value={time} onChange={(e) => setTime(e.target.value)} />
              </label>
              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`${contactMethod === "email" ?
                    "border-[#8EB69B]/60 bg-[#8EB69B]/15 shadow-[0_0_24px_rgba(142,182,155,0.45)]" :
                    "border-white/10 bg-white/5 hover:bg-white/10"} group flex items-center gap-2 rounded-xl border px-3 py-2 transition`}
                >
                  <input type="radio" name="contactMethod" checked={contactMethod === "email"} onChange={() => setContactMethod("email")} />
                  <span className="text-[14px]">Contact by email</span>
                  {contactMethod === "email" && (
                    <svg className="ml-auto h-4 w-4 text-[#8EB69B]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  )}
                </label>
                <label
                  className={`${contactMethod === "phone" ?
                    "border-[#8EB69B]/60 bg-[#8EB69B]/15 shadow-[0_0_24px_rgba(142,182,155,0.45)]" :
                    "border-white/10 bg-white/5 hover:bg-white/10"} group flex items-center gap-2 rounded-xl border px-3 py-2 transition`}
                >
                  <input type="radio" name="contactMethod" checked={contactMethod === "phone"} onChange={() => setContactMethod("phone")} />
                  <span className="text-[14px]">Contact by phone</span>
                  {contactMethod === "phone" && (
                    <svg className="ml-auto h-4 w-4 text-[#8EB69B]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  )}
                </label>
                {contactMethod === "phone" && (
                  <div className="flex flex-col gap-1.5">
                    <input name="phone" placeholder="Phone number" className={`rounded-xl border bg-white/5 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#8EB69B] focus:bg-white/10 ${attempted && !phone ? 'border-rose-400/60' : 'border-white/20'}`} value={phone} onChange={(e) => setPhone(e.target.value)} />
                    {attempted && !phone && <span className="text-[12px] text-rose-300">Phone is required for phone contact.</span>}
                  </div>
                )}
                {/* Hidden field matching Apps Script expected key */}
                <input type="hidden" name="contact" value={contactMethod} />
              </div>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-[13px] font-medium text-white/80">Message / notes</span>
                <textarea name="notes" rows={4} placeholder="Tell us a bit about your goals…" className="rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#8EB69B] focus:bg-white/10" value={message} onChange={(e) => setMessage(e.target.value)} />
              </label>

              <div className="sm:col-span-2 mt-2 flex items-center justify-end gap-3">
                <button type="button" onClick={onClose} className="rounded-xl border border-white/20 px-4 py-2.5 text-[14px] text-white/85 hover:bg-white/10">Cancel</button>
                <button type="submit" onClick={() => console.log("🚀 Submit button clicked")} className="rounded-xl bg-[#8EB69B] px-5 py-2.5 text-[14px] font-semibold text-black hover:bg-[#8EB69B]/90">Submit</button>
              </div>
            </form>
          </motion.div>
          <AnimatePresence>
            {submitted && (
              <motion.div
                role="status"
                aria-live="polite"
                className="pointer-events-none fixed bottom-6 left-1/2 z-[102] -translate-x-1/2 rounded-xl border border-white/15 bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-md shadow-lg"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
              >
                Submitted! We'll be in touch shortly.
              </motion.div>
            )}
            {submitError && (
              <motion.div
                role="status"
                aria-live="polite"
                className="pointer-events-none fixed bottom-6 left-1/2 z-[102] -translate-x-1/2 rounded-xl border border-rose-300/20 bg-rose-400/20 px-4 py-2 text-sm text-rose-100 backdrop-blur-md shadow-lg"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
              >
                {submitError}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConsultationModal;


