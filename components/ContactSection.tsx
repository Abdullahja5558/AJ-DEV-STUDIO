"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const QUESTIONS = [
  {
    id: "name",
    label: "IDENTITY",
    placeholder: "TYPE YOUR NAME",
    sub: "AUTHENTICATE_USER",
  },
  {
    id: "email",
    label: "ENDPOINT",
    placeholder: "EMAIL@ADDRESS.COM",
    sub: "ESTABLISH_LINK",
  },
  {
    id: "message",
    label: "OBJECTIVE",
    placeholder: "WRITE MESSAGE...",
    sub: "DATA_TRANSFER",
  },
];

export const ContactSection = () => {
  const [isEngaged, setIsEngaged] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFinished, setIsFinished] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEngaged && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEngaged, step]);

  const sendEmail = async (data: typeof formData) => {
    setIsSending(true);

  
    const templateParams = {
      name: data.name,
      email: data.email, 
      message: data.message,
    };

    emailjs
      .send(
        "service_g7bny7o", 
        "template_z26wq5d", 
        templateParams,
        "-cPCd98Zumb6HWLnx"   
      )
      .then(() => {
        setIsFinished(true);
      })
      .catch((err) => {
        console.error("FAILED...", err);
      })
      .finally(() => setIsSending(false));
  };

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else sendEmail(formData);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <section
      className="relative h-screen min-h-162.5 w-full bg-[#040014] flex flex-col justify-center overflow-hidden selection:bg-cyan-500/30"
      id="contact"
    >
        <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex flex-col h-full w-full max-w-7xl mx-auto px-6 md:px-10 py-12 relative z-10"
      >
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-cyan-500/50" />
            <span className="text-[10px] tracking-[1em] text-cyan-400 font-bold uppercase">
              CONNECT
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-[70px] font-black tracking-tighter text-white leading-[0.85] uppercase"
          >
            Let's Work <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white/20 to-white/5 italic">
              TOGETHER
            </span>
          </motion.h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!isEngaged ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="flex flex-col items-center gap-8"
              >
                <div
                  onClick={() => setIsEngaged(true)}
                  className="group relative h-32 w-32 flex items-center justify-center cursor-pointer"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border border-cyan-500/20"
                      animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1.2,
                        ease: "linear",
                      }}
                    />
                  ))}
                  <div className="relative h-16 w-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl flex items-center justify-center group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-all duration-700">
                    <div className="h-2.5 w-2.5 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]" />
                  </div>
                </div>
                <span className="text-[10px] tracking-[1em] text-cyan-500/60 uppercase font-mono animate-pulse">
                  Initiate System
                </span>
              </motion.div>
            ) : !isFinished ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-4xl"
              >
                <form onSubmit={handleNext} className="text-center space-y-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-6"
                    >
                      <div className="space-y-3">
                        <div className="inline-block px-3 py-1 border border-cyan-500/20 rounded-full bg-cyan-500/5">
                           <span className="text-[10px] font-mono text-cyan-400 tracking-[0.4em] font-bold uppercase">
                            {QUESTIONS[step].label}
                          </span>
                        </div>
                        <div className="text-[9px] font-mono text-white/30 tracking-[0.3em] uppercase">
                        {QUESTIONS[step].sub}
                        </div>
                      </div>

                      <div className="relative max-w-2xl mx-auto">
                        <input
                          autoFocus
                          ref={inputRef as any}
                          disabled={isSending}
                          required
                          type={QUESTIONS[step].id === "email" ? "email" : "text"}
                          placeholder={QUESTIONS[step].placeholder}
                          value={formData[QUESTIONS[step].id as keyof typeof formData]}
                          className="w-full bg-transparent border-none text-center text-4xl md:text-6xl text-white font-light placeholder:text-white/5 focus:ring-0 outline-none uppercase tracking-tighter transition-all duration-500"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [QUESTIONS[step].id]: e.target.value,
                            })
                          }
                        />
                        
                        <div className="relative mt-6 h-px w-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 1 }}
                            className="h-full w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent"
                          />
                        </div>
                      </div>

                      <div className="flex justify-center items-center gap-12 mt-8">
                        {step > 0 && (
                          <button
                            type="button"
                            onClick={handleBack}
                            className="group flex items-center gap-2 text-[10px] font-mono text-white/40 hover:text-cyan-400 transition-colors uppercase tracking-[0.3em]"
                          >
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Prev
                          </button>
                        )}
                        
                        <button
                          type="submit"
                          disabled={isSending}
                          className="px-8 py-2 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.3em] transition-all duration-300 rounded-sm"
                        >
                          {step === QUESTIONS.length - 1 ? (isSending ? "Sending..." : "Confirm") : "Next →"}
                        </button>
                      </div>

                      <div className="flex flex-col items-center gap-8 mt-4">
                        <div className="flex gap-3">
                          {QUESTIONS.map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 rounded-full transition-all duration-700 ease-out ${
                                i === step 
                                ? "w-12 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" 
                                : i < step ? "w-6 bg-cyan-500/30" : "w-6 bg-white/5"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-[9px] font-mono text-white/40 uppercase tracking-[0.5em] h-4">
                          {isSending ? (
                            <span className="text-cyan-400">Transmitting Data...</span>
                          ) : (
                            "Press [Enter] to proceed"
                          )}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="finish"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: 80 }} 
                  className="w-px bg-linear-to-b from-cyan-400 to-transparent mb-10" 
                />
                <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-[0.4em] uppercase mb-4">
                  SUCCESS
                </h2>
                <p className="text-cyan-500/50 font-mono text-[10px] tracking-[0.6em] uppercase">
                  Transmission Received - Will Respond Shortly
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute top-10 right-10 flex flex-col items-end gap-1 opacity-20 md:flex">
         <div className="text-[8px] text-white font-mono uppercase tracking-widest">System_Status: Online</div>
         <div className="text-[8px] text-white font-mono uppercase tracking-widest">Link: Secure_SSL</div>
      </div>
    </section>
  );
};

export default ContactSection;