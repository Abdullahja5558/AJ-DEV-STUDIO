"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const QUESTIONS = [
  { id: "name", label: "IDENTITY", placeholder: "TYPE YOUR NAME", sub: "AUTHENTICATE_USER" },
  { id: "email", label: "ENDPOINT", placeholder: "EMAIL@ADDRESS.COM", sub: "ESTABLISH_LINK" },
  { id: "message", label: "OBJECTIVE", placeholder: "WRITE MESSAGE...", sub: "DATA_TRANSFER" },
];

export const ContactSection = () => {
  const [isEngaged, setIsEngaged] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isFinished, setIsFinished] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEngaged && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEngaged, step]);

  const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const sendEmail = async (data: typeof formData) => {
    setIsSending(true);
    const templateParams = { name: data.name, email: data.email, message: data.message };

    emailjs
      .send("service_g7bny7o", "template_z26wq5d", templateParams, "-cPCd98Zumb6HWLnx")
      .then(() => setIsFinished(true))
      .catch((err) => console.error("FAILED...", err))
      .finally(() => setIsSending(false));
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setStep(0);
    setIsFinished(false);
    setIsEngaged(false);
    setError(null);
  };

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const currentVal = formData[QUESTIONS[step].id as keyof typeof formData];

    // 1. Khali field check
    if (!currentVal || currentVal.trim() === "") {
      setError("FIELD_REQUIRED_FOR_TRANSMISSION");
      return;
    }

    // 2. Email format check
    if (QUESTIONS[step].id === "email" && !validateEmail(formData.email)) {
      setError("INVALID_ENDPOINT_FORMAT");
      return;
    }

    setError(null);
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else sendEmail(formData);
  };

  const handleBack = () => {
    setError(null);
    if (step > 0) setStep(step - 1);
  };

  return (
    <section className="relative h-screen min-h-[650px] w-full bg-[#000000] flex flex-col justify-center overflow-hidden selection:bg-white selection:text-black" id="contact">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex flex-col h-full w-full max-w-7xl mx-auto px-6 md:px-10 py-12 relative z-10">
        
        {/* Header */}
        <div className="mb-12 mt-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[0.5px] w-12 bg-zinc-800" />
            <span className="text-[10px] tracking-[1em] text-zinc-500 font-bold uppercase">CONNECT</span>
          </div>
          <h2 className="text-5xl md:text-[75px] font-black tracking-tighter text-white leading-[0.85] uppercase">
            Let's Work <br />
            <span className="text-zinc-900 italic font-light">TOGETHER</span>
          </h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!isEngaged ? (
              <motion.div key="intro" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }} className="flex flex-col items-center gap-8">
                <div onClick={() => setIsEngaged(true)} className="group relative h-40 w-40 flex items-center justify-center cursor-pointer">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border border-white/40"
                      animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
                    />
                  ))}
                  <div className="relative h-16 w-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all duration-700">
                    <div className="h-2 w-2 bg-white rounded-full shadow-[0_0_15px_#fff]" />
                  </div>
                </div>
                <span className="text-[9px] tracking-[1.2em] text-zinc-600 uppercase font-mono animate-pulse">Click to Initialize</span>
              </motion.div>
            ) : !isFinished ? (
              <motion.div key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-4xl">
                <form onSubmit={handleNext} className="text-center space-y-12">
                  <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }} className="space-y-8">
                      <div className="space-y-3">
                        <div className="inline-block px-4 py-1 border border-white/10 rounded-full bg-white/[0.02]">
                           <span className="text-[10px] font-mono text-zinc-400 tracking-[0.4em] font-bold uppercase">{QUESTIONS[step].label}</span>
                        </div>
                        <div className="text-[9px] font-mono text-zinc-600 tracking-[0.3em] uppercase">{QUESTIONS[step].sub}</div>
                      </div>

                      <div className="relative max-w-2xl mx-auto">
                        <input
                          autoFocus
                          ref={inputRef as any}
                          disabled={isSending}
                          placeholder={QUESTIONS[step].placeholder}
                          value={formData[QUESTIONS[step].id as keyof typeof formData]}
                          className={`w-full bg-transparent border-none text-center text-4xl md:text-6xl text-white font-light placeholder:text-white/[0.03] focus:ring-0 outline-none uppercase tracking-tighter transition-all duration-500 ${error ? "text-red-500" : ""}`}
                          onChange={(e) => { setError(null); setFormData({ ...formData, [QUESTIONS[step].id]: e.target.value }); }}
                        />
                        <div className="relative mt-6 h-[0.5px] w-full bg-zinc-900 overflow-hidden">
                          <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1 }} className={`h-full w-full bg-gradient-to-r from-transparent ${error ? "via-red-600" : "via-zinc-500"} to-transparent`} />
                        </div>
                        
                        {/* VALIDATION MESSAGE POPUP */}
                        <AnimatePresence>
                          {error && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }} 
                              animate={{ opacity: 1, y: 0 }} 
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full"
                            >
                              <span className="text-[8px] font-mono text-red-500 tracking-[0.5em] uppercase">
                                [ Error: {error} ]
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex justify-center items-center gap-12 mt-12">
                        {step > 0 && (
                          <button type="button" onClick={handleBack} className="group flex items-center gap-2 text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.3em]">
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Prev
                          </button>
                        )}
                        <button type="submit" disabled={isSending} className="px-10 py-2.5 border border-white/10 bg-white/[0.02] hover:bg-white/10 text-white text-[10px] font-mono uppercase tracking-[0.3em] transition-all duration-300 rounded-sm">
                          {step === QUESTIONS.length - 1 ? (isSending ? "Transmitting..." : "Confirm") : "Next →"}
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </form>
              </motion.div>
            ) : (
              <motion.div key="finish" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
                <div className="relative mb-12">
                   <motion.div initial={{ height: 0 }} animate={{ height: 100 }} className="w-[1px] bg-gradient-to-b from-white via-zinc-500 to-transparent mx-auto" />
                   <motion.div animate={{ y: [0, 100, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-[-20px] w-[40px] h-[1px] bg-white/20 blur-sm" />
                </div>
                
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4 italic">SUCCESS.</h2>
                <div className="flex flex-col gap-6 items-center">
                    <p className="text-zinc-500 font-mono text-[9px] tracking-[0.6em] uppercase">Data Encrypted & Transmitted Successfully</p>
                    <button 
                      onClick={resetForm}
                      className="mt-8 px-6 py-2 border border-white/5 bg-white/[0.03] hover:bg-white/10 text-zinc-400 hover:text-white text-[9px] font-mono uppercase tracking-[0.4em] transition-all duration-500 rounded-full"
                    >
                      [ Re-initiate System ]
                    </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute top-10 right-10 flex flex-col items-end gap-1 opacity-10 text-right">
         <div className="text-[8px] text-white font-mono uppercase tracking-widest">Encrypted_Channel: Active</div>
         <div className="text-[8px] text-white font-mono uppercase tracking-widest">Protocol: V3_Secure</div>
      </div>
      
      <style jsx global>{`
        ::selection { background-color: #ffffff !important; color: #000000 !important; }
      `}</style>
    </section>
  );
};

export default ContactSection;