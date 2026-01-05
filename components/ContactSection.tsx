"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  { id: "name", label: "What should I call you?", placeholder: "Your name" },
  { id: "email", label: "Where can I reach you?", placeholder: "email@domain.com" },
  { id: "message", label: "What are we building?", placeholder: "A brief vision..." },
];

export const ContactSection = () => {
  const [isEngaged, setIsEngaged] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically on step change
  useEffect(() => {
    if (isEngaged && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEngaged, step]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isEngaged) setIsEngaged(true);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEngaged]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <section className="relative h-screen w-full bg-[#030014] flex flex-col overflow-hidden py-5" id="contact">
      
      {/* 1. ELITE HEADING SECTION */}
      <div className="w-full px-6 md:px-24 pt-16 md:pt-24 z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-cyan-500" />
            <span className="text-[10px] tracking-[1em] text-cyan-500/80 font-bold uppercase">CONNECT</span>
          </motion.div>

          <div className="relative">
            <h2 className="text-5xl md:text-[100px] font-black tracking-[-0.08em] text-white leading-[0.8] relative z-10">
              The Silent <br /> <span className="text-white/5 italic">Moment.</span>
            </h2>
            <h2 className="text-5xl md:text-[100px] font-black tracking-[-0.08em] text-white/1 leading-[0.8] absolute -top-1 -left-1 select-none">
              The Silent <br /> Moment.
            </h2>
          </div>
        </div>
      </div>

      {/* 2. MAIN EXPERIENCE AREA */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {!isEngaged ? (
            /* PHASE 1: THE INVITATION */
            <motion.div 
              key="intro"
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <h3 className="text-lg md:text-5xl font-extralight text-white/80 tracking-tight leading-relaxed">
                  If this work resonates with you, <br />
                  <span className="text-white/20 italic">we should talk.</span>
                </h3>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                onClick={() => setIsEngaged(true)}
                className="mt-16 cursor-pointer group inline-block"
              >
                <div className="flex flex-col items-center">
                  <span className="text-[9px] tracking-[0.8em] text-white/30 group-hover:text-cyan-400 transition-all duration-500 uppercase mb-4">
                    Press Enter to Begin
                  </span>
                  <div className="h-10 w-px bg-linear-to-b from-cyan-500 to-transparent animate-pulse" />
                </div>
              </motion.div>
            </motion.div>
          ) : !isFinished ? (
            /* PHASE 2: THE CONVERSATION */
            <motion.div 
              key="form"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              className="w-full max-w-4xl px-8"
            >
              {/* STEP INDICATOR */}
              <div className="flex justify-center gap-3 mb-12">
                {QUESTIONS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-0.5 transition-all duration-1000 ${i === step ? "w-12 bg-cyan-500" : "w-4 bg-white/10"}`} 
                  />
                ))}
              </div>

              <form onSubmit={handleNext} className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="space-y-6 text-center"
                  >
                    <span className="text-cyan-500/40 text-xs font-mono tracking-widest uppercase">Question 0{step + 1}</span>
                    <label className="text-2xl md:text-4xl font-light text-white/90 block italic tracking-tight">
                      {QUESTIONS[step].label}
                    </label>
                    
                    <div className="relative group">
                      <input 
                        ref={inputRef}
                        required
                        type={QUESTIONS[step].id === "email" ? "email" : "text"}
                        placeholder={QUESTIONS[step].placeholder}
                        value={formData[QUESTIONS[step].id as keyof typeof formData]}
                        className="w-full bg-transparent border-none text-center text-4xl md:text-7xl text-white font-black placeholder:text-white/3 focus:ring-0 outline-none transition-all"
                        onChange={(e) => setFormData({ ...formData, [QUESTIONS[step].id]: e.target.value })}
                      />
                      {/* Interactive underline */}
                      <motion.div 
                        layoutId="underline"
                        className="h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent mt-4 w-3/4 mx-auto" 
                      />
                    </div>
                    
                    <div className="pt-8 opacity-40">
                      <span className="text-[10px] tracking-[0.3em] text-white uppercase animate-pulse">
                        Enter to Proceed
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </form>
            </motion.div>
          ) : (
            /* PHASE 3: THE FINALE */
            <motion.div 
              key="finish"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="text-center"
            >
              <div className="mb-8 flex justify-center">
                 <motion.div 
                  initial={{ rotate: -90, scale: 0 }} 
                  animate={{ rotate: 0, scale: 1 }}
                  className="h-16 w-16 rounded-full border border-cyan-500/30 flex items-center justify-center"
                 >
                    <div className="h-2 w-2 bg-cyan-500 rounded-full animate-ping" />
                 </motion.div>
              </div>
              <h2 className="text-3xl md:text-5xl font-extralight text-white tracking-widest uppercase">
                Acknowledged.
              </h2>
              <p className="text-white/20 italic mt-6 font-light text-xl">
                The connection is established. Wait for my signal.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. LUXURY BACKGROUND & ATMOSPHERE - SYNCED WITH OTHER SECTIONS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grain Overlay matching your site's texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Subtle Matte Glow to prevent it from being completely flat */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-cyan-500/2 rounded-full blur-[120px]" />
      </div>

     

    </section>
  );
};

export default ContactSection;