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

      if (!value?.trim()) {
        setError("FIELD_REQUIRED_FOR_TRANSMISSION");
        return;
      }

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
      className="relative h-screen min-h-[650px] w-full bg-[#3B0007] flex flex-col justify-center overflow-hidden selection:bg-[#DEBA75] selection:text-[#3B0007]"
    >
      <h2 className="sr-only">
        Contact a Full Stack Developer for modern web projects, React, Next.js, Node.js applications
      </h2>

      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col h-full w-full max-w-7xl mx-auto px-6 md:px-10 py-12 relative z-10"
      >
        <header className="mb-12 mt-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[0.5px] w-12 bg-[#DEBA75]/40" />
            <span className="text-[10px] tracking-[1em] text-[#DEBA75] font-bold uppercase">
              CONNECT
            </span>
          </div>

          <h1 className="text-5xl md:text-[75px] font-black tracking-tighter text-[#FAF4EC] leading-[0.85] uppercase">
            Let&apos;s Work <br />
            <span className="font-outline-contact italic font-light text-transparent">TOGETHER</span>
          </h1>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">

            {!isEngaged ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
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
                      className="absolute inset-0 rounded-full border border-[#DEBA75]/40"
                      animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                  <div className="relative h-16 w-16 rounded-full border border-[#DEBA75]/30 bg-[#2E0006] flex items-center justify-center">
                    <div className="h-2.5 w-2.5 bg-[#DEBA75] rounded-full" />
                  </div>
                </button>

                <span className="text-[9px] tracking-[1.2em] text-[#DEBA75] uppercase font-mono font-bold animate-pulse">
                  Click to Initialize
                </span>
              </motion.div>

            ) : !isFinished ? (

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
                    <div className="space-y-3">
                      <div className="inline-block px-4 py-1 border border-[#DEBA75]/25 rounded-full bg-[#DEBA75]/10">
                        <span className="text-[10px] font-mono text-[#DEBA75] tracking-[0.4em] uppercase font-bold">
                          {current.label}
                        </span>
                      </div>

                      <div className="text-[9px] font-mono text-[#D4C3B3]/60 tracking-[0.3em] uppercase font-semibold">
                        {current.sub}
                      </div>
                    </div>

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
                        className={`w-full bg-transparent text-center text-4xl md:text-6xl text-[#FAF4EC] placeholder-[#D4C3B3]/30 font-light outline-none uppercase tracking-tighter transition-all ${
                          error ? "text-red-400" : ""
                        }`}
                        aria-label={current.label}
                      />

                      <div className="mt-6 h-[0.5px] w-full bg-[#DEBA75]/20 overflow-hidden">
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "0%" }}
                          className={`h-full w-full bg-gradient-to-r from-transparent ${
                            error ? "via-red-500" : "via-[#DEBA75]"
                          } to-transparent`}
                        />
                      </div>

                      {error && (
                        <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[8px] font-mono text-red-400 uppercase tracking-[0.5em]">
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
                          className="text-[10px] font-mono text-[#D4C3B3] uppercase hover:text-[#DEBA75] transition-colors"
                        >
                          ← Prev
                        </button>
                      )}

                      <button
                        type="submit"
                        disabled={isSending}
                        className="px-10 py-2.5 border border-[#DEBA75]/40 bg-[#DEBA75]/10 text-[#DEBA75] hover:bg-[#DEBA75] hover:text-[#3B0007] transition-all text-[10px] font-mono uppercase tracking-[0.3em] font-bold rounded-full cursor-pointer"
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
                <h2 className="text-5xl md:text-7xl font-black text-[#FAF4EC] uppercase italic">
                  SUCCESS
                </h2>

                <p className="text-[#DEBA75] text-[9px] tracking-[0.6em] uppercase mt-6 font-bold">
                  Message delivered successfully
                </p>

                <button
                  onClick={resetForm}
                  className="mt-10 px-6 py-2 border border-[#DEBA75]/25 text-[#D4C3B3] hover:text-[#FAF4EC] text-[9px] uppercase rounded-full cursor-pointer"
                >
                  Reset
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style jsx global>{`
        .font-outline-contact {
          -webkit-text-stroke: 1.5px rgba(222, 186, 117, 0.4);
        }
      `}</style>
    </section>
  );
};

export default ContactSection;