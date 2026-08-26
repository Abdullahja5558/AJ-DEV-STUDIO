"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";
import { ReactLenis } from "lenis/react";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Professional Experience Timeline",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Backend Developer Journey",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "React-Native / Three.js Developer",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Frontend Developer",
    },
  ],
};

const EXPERIENCES = [
  {
    year: "2025",
    role: "Backend Developer Journey",
    company: "Global Tech Solutions",
    location: "REMOTE • USA",
    details:
      "Architecting high-performance server logic and optimizing database queries for real-time applications.",
  },
  {
    year: "2023",
    role: "React-Native / Three.js Developer",
    company: "Creative Vision Studio",
    location: "DUBAI • UAE",
    details:
      "Crafted immersive mobile experiences and AR-driven interfaces with seamless performance.",
  },
  {
    year: "2022",
    role: "Frontend Developer",
    company: "NextGen Systems",
    location: "FAISALABAD • PK",
    details:
      "Developing sophisticated web architectures with Next.js, focusing on micro-interactions and atomic design.",
  },
];

const ExperienceJourney = () => {
  const targetRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const xRaw = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "-75%"]);
  const x = useSpring(xRaw, { stiffness: 50, damping: 25 });

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* DESKTOP & TABLET LANDSCAPE TIMELINE (Horizontal Scroll Layout - Hidden on Mobile) */}
      <div className="hidden md:block">
        <ReactLenis root={false} options={{ lerp: 0.07, duration: 1.4 }}>
          <section
            ref={targetRef}
            className="relative h-[400vh] bg-[#010101] selection:bg-white selection:text-black"
            id="experience"
            aria-label="Professional Experience Timeline"
          >
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
              
              {/* Background Glow */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-[160px] pointer-events-none"
              />

              {/* Decorative Background Text */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center opacity-[0.015] select-none pointer-events-none"
              >
                <span className="text-[35vw] font-black text-white uppercase tracking-tighter">
                  PATH
                </span>
              </div>

              <motion.div style={{ x }} className="flex items-center">
                
                {/* HEADER */}
                <header className="min-w-[45vw] lg:min-w-[40vw] px-8 lg:px-20 flex flex-col justify-center gap-8 relative z-10">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.8em] text-zinc-500 block">
                      The Journey
                    </span>

                    <h2 className="text-6xl lg:text-[9vw] font-black tracking-tighter text-white leading-[0.85] uppercase">
                      WORK <br />
                      <span className="italic font-outline opacity-20 text-white">
                        History
                      </span>
                    </h2>
                  </div>

                  <div className="flex items-center gap-6 mt-8 border-t border-white/10 pt-8">
                    <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.4em]">
                      Scroll to Navigate
                    </p>

                    <motion.div
                      animate={{ x: [0, 15, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "easeInOut",
                      }}
                      className="text-white opacity-40"
                      aria-hidden="true"
                    >
                      <MoveRight size={36} strokeWidth={1} />
                    </motion.div>
                  </div>
                </header>

                <div className="min-w-[8vw] lg:min-w-[12vw]" />

                {/* EXPERIENCE CARDS */}
                <section
                  className="flex gap-12 lg:gap-24 pr-[15vw]"
                  aria-label="Experience cards"
                >
                  {EXPERIENCES.map((exp, index) => (
                    <article
                      key={index}
                      className="relative min-w-[340px] lg:min-w-[520px] h-[520px] lg:h-[580px] bg-gradient-to-b from-[#121212]/90 to-[#080808]/90 border border-white/[0.06] hover:border-emerald-500/30 rounded-[36px] lg:rounded-[48px] p-8 lg:p-14 flex flex-col justify-between group cursor-pointer shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_90px_rgba(16,185,129,0.03)]"
                      aria-label={`${exp.role} at ${exp.company}`}
                    >
                      {/* Grid Pattern Overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                      {/* Ambient Glow */}
                      <div className="absolute -left-16 -top-16 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500" />

                      {/* Year background watermarked */}
                      <span
                        aria-hidden="true"
                        className="absolute -top-6 -right-2 text-[14vw] font-black text-white/[0.015] select-none transition-all group-hover:text-white/[0.04] duration-500"
                      >
                        {exp.year}
                      </span>

                      <div className="z-10 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          {/* Location Tag */}
                          <div className="flex items-center gap-3 text-zinc-500 font-bold text-[9px] tracking-[0.3em] uppercase">
                            <div className="w-6 h-[1.5px] bg-zinc-700 group-hover:w-10 group-hover:bg-emerald-500 transition-all duration-500" />
                            <span className="group-hover:text-zinc-300 transition-colors duration-300">{exp.location}</span>
                          </div>

                          {/* Year Badge */}
                          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/[0.03] text-zinc-400 border border-white/[0.08] group-hover:border-emerald-500/30 group-hover:text-emerald-400 group-hover:bg-emerald-500/[0.05] transition-all duration-300">
                            {exp.year}
                          </span>
                        </div>

                        <div className="space-y-2 mt-4">
                          <h3 className="text-2xl lg:text-[38px] font-black text-white tracking-tight leading-[1.1] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-zinc-200 group-hover:to-zinc-400 transition-all duration-300">
                            {exp.role}
                          </h3>

                          <p className="text-zinc-400 text-sm lg:text-base font-bold uppercase tracking-tight">
                            @ <span className="text-zinc-200 group-hover:text-white transition-colors duration-300">{exp.company}</span>
                          </p>
                        </div>
                      </div>

                      <div className="z-10 mt-6">
                        <p className="text-zinc-400 font-normal text-sm lg:text-base leading-relaxed mb-8 max-w-[400px] group-hover:text-zinc-300 transition-colors duration-300">
                          {exp.details}
                        </p>

                        <div
                          className="w-12 h-12 rounded-full border border-white/10 text-white flex items-center justify-center bg-white/[0.02] group-hover:scale-105 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-xl"
                          aria-hidden="true"
                        >
                          <ArrowRight size={18} strokeWidth={1.5} />
                        </div>
                      </div>

                      <div className="absolute bottom-10 right-8">
                        <span className="text-[9px] font-mono font-black text-white/10 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
                          Archive No. 0{index + 1}
                        </span>
                      </div>
                    </article>
                  ))}
                </section>

                {/* END TEXT */}
                <div className="min-w-[50vw] px-20" aria-hidden="true">
                  <h2 className="text-[8vw] font-black text-white tracking-tighter leading-none uppercase">
                    Engineering <br />
                    <span className="opacity-10 font-outline">Mastery.</span>
                  </h2>
                </div>
              </motion.div>
            </div>
          </section>
        </ReactLenis>
      </div>

      {/* MOBILE TIMELINE (Optimized Vertical Stack Layout) */}
      <section 
        className="block md:hidden bg-[#010101] py-16 px-5 sm:px-8 space-y-10 select-none selection:bg-white selection:text-black"
        id="experience-mobile"
        aria-label="Professional Experience Timeline Mobile"
      >
        {/* Header Title */}
        <header className="space-y-3">
          <span className="text-[9px] font-mono uppercase tracking-[0.6em] text-zinc-500 block">
            The Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white leading-[0.9] uppercase">
            WORK <br />
            <span className="italic font-outline opacity-20 text-white">
              History
            </span>
          </h2>
        </header>

        {/* Experience Stack */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp, index) => (
            <article
              key={index}
              className="relative w-full bg-gradient-to-b from-[#111111]/95 to-[#070707]/95 border border-white/[0.06] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-2xl overflow-hidden"
              aria-label={`${exp.role} at ${exp.company}`}
            >
              {/* Grid Background overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808004_1px,transparent_1px),linear-gradient(to_bottom,#80808004_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

              {/* Watermark Year */}
              <span
                aria-hidden="true"
                className="absolute -top-4 -right-2 text-[22vw] font-black text-white/[0.015] select-none pointer-events-none"
              >
                {exp.year}
              </span>

              {/* Card Meta details */}
              <div className="z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-500 font-bold text-[8px] tracking-wider uppercase">
                    <div className="w-4 h-[1.5px] bg-zinc-700" />
                    <span>{exp.location}</span>
                  </div>
                  <span className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] text-zinc-400 border border-white/[0.08]">
                    {exp.year}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {exp.role}
                  </h3>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                    @ <span className="text-zinc-300">{exp.company}</span>
                  </p>
                </div>
              </div>

              {/* Card Description & Callout */}
              <div className="z-10 space-y-5">
                <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
                  {exp.details}
                </p>

                <div className="flex items-center justify-between border-t border-white/[0.05] pt-4">
                  <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
                    Archive No. 0{index + 1}
                  </span>
                  <div className="w-9 h-9 rounded-full border border-white/10 text-white flex items-center justify-center bg-white/[0.02] shadow-md">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Global CSS for Stroke */}
      <style jsx global>{`
        .font-outline {
          -webkit-text-stroke: 1.5px white;
          color: transparent;
        }
      `}</style>
    </>
  );
};

export default ExperienceJourney;