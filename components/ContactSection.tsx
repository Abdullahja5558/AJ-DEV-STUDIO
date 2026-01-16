"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const QUESTIONS = [
  { id: "name", label: "01. IDENTITY", placeholder: "NAME" },
  { id: "email", label: "02. ENDPOINT", placeholder: "EMAIL" },
  { id: "message", label: "03. OBJECTIVE", placeholder: "MESSAGE" },
];

export const ContactSection = () => {
  const [isEngaged, setIsEngaged] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isFinished, setIsFinished] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEngaged && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEngaged, step]);

  const sendEmail = async (data: typeof formData) => {
    setIsSending(true);

    // This is the most stable way to call EmailJS in Next.js
    const templateParams = {
      from_name: data.name,
      reply_to: data.email,
      message: data.message,
    };

    emailjs
      .send(
        "service_v8kid69", 
        "template_4psl2m6", 
        templateParams, 
        "ooavtmqpMYacsgYSg" // <--- DONT FORGET THIS!
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsFinished(true);
        },
        (err) => {
          console.error("FAILED...", err);
          alert("Transmission Error: Please check your Public Key.");
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      sendEmail(formData);
    }
  };

  return (
    <section className="relative h-187.5 w-full bg-[#040014] flex flex-col overflow-hidden pt-12 pb-20" id="contact">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col h-full w-full"
      >
        <div className="w-full px-6 md:px-24 pt-4 z-20">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="h-px w-12 bg-cyan-500" />
              <span className="text-[10px] tracking-[1em] text-cyan-500/80 font-bold uppercase">CONNECT</span>
            </motion.div>

            <div className="relative">
              <motion.h2 
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1 }}
                className="text-6xl md:text-[90px] font-black tracking-[-0.08em] text-white leading-[0.8] relative z-10 uppercase"
              >
                The Silent <br /> <span className="text-white/5 font-bold italic">Moment.</span>
              </motion.h2>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
          <AnimatePresence mode="wait">
            {!isEngaged ? (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                className="flex flex-col items-center gap-12"
              >
                <div 
                  onClick={() => setIsEngaged(true)}
                  className="group relative h-32 w-32 flex items-center justify-center cursor-pointer"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border border-cyan-500/40"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
                    />
                  ))}
                  <div className="relative h-16 w-16 rounded-full border border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-sm group-hover:border-cyan-500/50 transition-colors duration-500">
                    <div className="h-2 w-2 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]" />
                  </div>
                </div>
                <span className="text-[10px] tracking-[0.8em] text-white/30 uppercase font-mono animate-pulse">
                  Initiate Connection
                </span>
              </motion.div>
            ) : !isFinished ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl"
              >
                <form onSubmit={handleNext} className="text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <span className="text-[10px] font-mono text-cyan-500/50 tracking-[0.4em] uppercase">
                        {isSending ? "TRANSMITTING..." : `Process_Request // 0${step + 1}`}
                      </span>
                      <div className="relative border-b border-white/5 py-4">
                        <input 
                          ref={inputRef}
                          disabled={isSending}
                          required
                          type={QUESTIONS[step].id === "email" ? "email" : "text"}
                          placeholder={QUESTIONS[step].placeholder}
                          value={formData[QUESTIONS[step].id as keyof typeof formData]}
                          className="w-full bg-transparent border-none text-center text-3xl md:text-5xl text-white font-light placeholder:text-white/2 focus:ring-0 outline-none uppercase tracking-widest disabled:opacity-30"
                          onChange={(e) => setFormData({ ...formData, [QUESTIONS[step].id]: e.target.value })}
                        />
                      </div>
                      <p className="text-[8px] font-mono text-white/10 uppercase tracking-[0.5em] pt-4">
                        {isSending ? "DATA ENCRYPTING..." : "Execute via [Enter]"}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="finish"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: 100 }} 
                  className="w-px bg-gradient-to-b from-cyan-500 to-transparent mb-10"
                />
                <h2 className="text-3xl md:text-5xl font-light text-white tracking-[0.5em] uppercase">
                  Acknowledged
                </h2>
                <p className="text-white/20 font-mono text-[9px] mt-6 tracking-widest uppercase">
                  Secure Transmission Completed
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/2 to-transparent" />
      </div>
    </section>
  );
};

export default ContactSection;