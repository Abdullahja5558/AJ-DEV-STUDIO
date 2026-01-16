"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const QUESTIONS = [
  {
    id: "name",
    label: "01. IDENTITY",
    placeholder: "NAME",
    sub: "AUTHENTICATE_USER",
  },
  {
    id: "email",
    label: "02. ENDPOINT",
    placeholder: "EMAIL",
    sub: "ESTABLISH_LINK",
  },
  {
    id: "message",
    label: "03. OBJECTIVE",
    placeholder: "MESSAGE",
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEngaged && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEngaged, step]);

  const sendEmail = async (data: typeof formData) => {
    setIsSending(true);
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
        "ooavtmqpMYacsgYSg"
      )
      .then(() => setIsFinished(true))
      .catch((err) => {
        console.error("FAILED...", err);
      })
      .finally(() => setIsSending(false));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else sendEmail(formData);
  };

  return (
    <section
      className="relative h-[85vh] min-h-162.5 w-full bg-[#040014] flex flex-col overflow-hidden"
      id="contact"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex flex-col h-full w-full max-w-7xl mx-auto px-6 md:px-24 py-12"
      >
        {/* Header Section - Restored to Original Style */}
        <div className="z-20 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-cyan-500" />
            <span className="text-[10px] tracking-[1em] text-cyan-500/80 font-bold uppercase">
              CONNECT
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-[90px] font-black tracking-[-0.08em] text-white leading-[0.8] uppercase"
          >
            The Silent <br />{" "}
            <span className="text-white/5 font-bold italic">Moment.</span>
          </motion.h2>
        </div>

        {/* Interaction Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          <AnimatePresence mode="wait">
            {!isEngaged ? (
              <motion.div
                key="intro"
                exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                className="flex flex-col items-center gap-6"
              >
                <div
                  onClick={() => setIsEngaged(true)}
                  className="group relative h-28 w-28 flex items-center justify-center cursor-pointer"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border border-cyan-500/30"
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                      }}
                    />
                  ))}
                  <div className="relative h-14 w-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-xl group-hover:border-cyan-500/50 transition-all duration-500 shadow-inner">
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
                className="w-full max-w-3xl relative px-10"
              >
                {/* Side Accents */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px bg-linear-to-b from-transparent via-cyan-500/40 to-transparent" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-linear-to-b from-transparent via-cyan-500/40 to-transparent" />

                <form onSubmit={handleNext} className="text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono text-cyan-500/80 tracking-[0.5em] font-bold uppercase">
                          {QUESTIONS[step].label}
                        </span>
                        <div className="text-[8px] font-mono text-white/10 tracking-[0.3em] uppercase">
                          Task // {QUESTIONS[step].sub}
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          ref={inputRef}
                          disabled={isSending}
                          required
                          type={
                            QUESTIONS[step].id === "email" ? "email" : "text"
                          }
                          placeholder={QUESTIONS[step].placeholder}
                          value={
                            formData[
                              QUESTIONS[step].id as keyof typeof formData
                            ]
                          }
                          className="w-full bg-transparent border-none text-center text-3xl md:text-5xl text-white font-extralight placeholder:text-white/2 focus:ring-0 outline-none uppercase tracking-[0.2em] transition-all duration-700 disabled:opacity-30"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [QUESTIONS[step].id]: e.target.value,
                            })
                          }
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          className="h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent mt-4"
                        />
                      </div>

                      <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-2">
                          {QUESTIONS.map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 w-6 rounded-full transition-all duration-500 ${
                                i <= step ? "bg-cyan-500/60" : "bg-white/5"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">
                          {isSending ? "Transmitting..." : "Command: [Enter]"}
                        </p>
                      </div>
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
                <div className="h-16 w-px bg-linear-to-b from-cyan-500 to-transparent mb-8" />
                <h2 className="text-3xl font-light text-white tracking-[0.6em] uppercase">
                  Acknowledged
                </h2>
                <p className="text-white/20 font-mono text-[9px] mt-4 tracking-widest uppercase">
                  Signal Locked // Transmission Sent
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Decorative Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-cyan-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-[#040014] to-transparent" />
      </div>
    </section>
  );
};

export default ContactSection;
