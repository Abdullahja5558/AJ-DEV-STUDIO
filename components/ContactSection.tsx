"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
    if (isEngaged) inputRef.current?.focus();
  }, [isEngaged, step]);

  
  const validateEmail = useCallback((email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
  }, []);

  // ✅ optimized email send (no blocking UI)
  const sendEmail = useCallback(
    async (data: typeof formData) => {
      try {
        setIsSending(true);

        const templateParams = {
          name: data.name.trim(),
          email: data.email.trim(),
          message: data.message.trim(),
        };

        await emailjs.send(
          "service_g7bny7o",
          "template_z26wq5d",
          templateParams,
          "-cPCd98Zumb6HWLnx"
        );

        setIsFinished(true);
      } catch (err) {
        setError("FAILED_TO_SEND");
      } finally {
        setIsSending(false);
      }
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData({ name: "", email: "", message: "" });
    setStep(0);
    setIsFinished(false);
    setIsEngaged(false);
    setError(null);
  }, []);

  const handleNext = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();

      const key = QUESTIONS[step].id;
      const value = formData[key as keyof typeof formData];

      // empty validation
      if (!value?.trim()) {
        setError("FIELD_REQUIRED_FOR_TRANSMISSION");
        return;
      }

      // email validation
      if (key === "email" && !validateEmail(value)) {
        setError("INVALID_ENDPOINT_FORMAT");
        return;
      }

      setError(null);

      if (step < QUESTIONS.length - 1) {
        setStep((s) => s + 1);
      } else {
        sendEmail(formData);
      }
    },
    [step, formData, validateEmail, sendEmail]
  );

  const handleBack = useCallback(() => {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const current = QUESTIONS[step];

  return (
    <section
      id="contact"
      aria-label="Contact section"
      className="relative h-screen min-h-[650px] w-full bg-[#000000] flex flex-col justify-center overflow-hidden selection:bg-white selection:text-black"
    >
      {/* SEO SAFE HEADINGS (hidden but accessible) */}
      <h2 className="sr-only">
        Contact a Full Stack Developer for modern web projects, React, Next.js, Node.js applications
      </h2>

      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col h-full w-full max-w-7xl mx-auto px-6 md:px-10 py-12 relative z-10"
      >
        {/* HEADER (unchanged design) */}
        <header className="mb-12 mt-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[0.5px] w-12 bg-zinc-800" />
            <span className="text-[10px] tracking-[1em] text-zinc-500 font-bold uppercase">
              CONNECT
            </span>
          </div>

          <h1 className="text-5xl md:text-[75px] font-black tracking-tighter text-white leading-[0.85] uppercase">
            Let's Work <br />
            <span className="text-zinc-900 italic font-light">TOGETHER</span>
          </h1>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">

            {/* INTRO */}
            {!isEngaged ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                className="flex flex-col items-center gap-8"
              >
                <button
                  onClick={() => setIsEngaged(true)}
                  className="group relative h-40 w-40 flex items-center justify-center cursor-pointer"
                  aria-label="Start contact form"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border border-white/40"
                      animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                  <div className="relative h-16 w-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full shadow-[0_0_15px_#fff]" />
                  </div>
                </button>

                <span className="text-[9px] tracking-[1.2em] text-zinc-600 uppercase font-mono animate-pulse">
                  Click to Initialize
                </span>
              </motion.div>

            ) : !isFinished ? (

              /* FORM */
              <motion.form
                key="form"
                onSubmit={handleNext}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-4xl text-center space-y-12"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    {/* LABEL */}
                    <div className="space-y-3">
                      <div className="inline-block px-4 py-1 border border-white/10 rounded-full bg-white/[0.02]">
                        <span className="text-[10px] font-mono text-zinc-400 tracking-[0.4em] uppercase">
                          {current.label}
                        </span>
                      </div>

                      <div className="text-[9px] font-mono text-zinc-600 tracking-[0.3em] uppercase">
                        {current.sub}
                      </div>
                    </div>

                    {/* INPUT */}
                    <div className="relative max-w-2xl mx-auto">
                      <input
                        ref={inputRef as any}
                        disabled={isSending}
                        value={formData[current.id as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            [current.id]: e.target.value,
                          }))
                        }
                        placeholder={current.placeholder}
                        className={`w-full bg-transparent text-center text-4xl md:text-6xl text-white font-light outline-none uppercase tracking-tighter transition-all ${
                          error ? "text-red-500" : ""
                        }`}
                        aria-label={current.label}
                      />

                      <div className="mt-6 h-[0.5px] w-full bg-zinc-900 overflow-hidden">
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "0%" }}
                          className={`h-full w-full bg-gradient-to-r from-transparent ${
                            error ? "via-red-600" : "via-zinc-500"
                          } to-transparent`}
                        />
                      </div>

                      {error && (
                        <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[8px] font-mono text-red-500 uppercase tracking-[0.5em]">
                          [ {error} ]
                        </p>
                      )}
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-center items-center gap-12 mt-12">
                      {step > 0 && (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="text-[10px] font-mono text-zinc-500 uppercase"
                        >
                          ← Prev
                        </button>
                      )}

                      <button
                        type="submit"
                        disabled={isSending}
                        className="px-10 py-2.5 border border-white/10 bg-white/[0.02] text-white text-[10px] font-mono uppercase tracking-[0.3em]"
                      >
                        {step === QUESTIONS.length - 1
                          ? isSending
                            ? "Sending..."
                            : "Confirm"
                          : "Next →"}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.form>

            ) : (

              /* SUCCESS */
              <motion.div
                key="finish"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic">
                  SUCCESS
                </h2>

                <p className="text-zinc-500 text-[9px] tracking-[0.6em] uppercase mt-6">
                  Message delivered successfully
                </p>

                <button
                  onClick={resetForm}
                  className="mt-10 px-6 py-2 border border-white/5 text-zinc-400 text-[9px] uppercase"
                >
                  Reset
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;