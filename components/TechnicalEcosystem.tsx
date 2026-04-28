"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactLenis } from "lenis/react";

const SKILLS = [
  { name: "Next.js 15", tag: "Framework" },
  { name: "TypeScript", tag: "Language" },
  { name: "MERN Stack", tag: "FullStack" }, 
  { name: "React", tag: "Library" },
  { name: "Tailwind", tag: "Design" },
  { name: "Node.js", tag: "Backend" },
  { name: "PostgreSQL", tag: "Database" },
  { name: "MongoDB", tag: "NoSQL" }, 
  { name: "Framer", tag: "Motion" },
  { name: "GSAP", tag: "Animation" },
  { name: "Git", tag: "Version" },
  { name: "JavaScript", tag: "Language" },
];

export const TechnicalEcosystem = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth parallax for the background "STACK" text
  const stackY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const springY = useSpring(stackY, { stiffness: 40, damping: 20 });

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5 }}>
      <section
        id="skills"
        ref={containerRef}
        className="relative min-h-screen w-full bg-[#000000] py-40 overflow-hidden selection:bg-white selection:text-black"
        aria-labelledby="skills-heading"
      >
        {/* ATMOSPHERIC GLOWS - Subtle & Premium */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_70%)] blur-[100px] pointer-events-none" aria-hidden="true" />
        
        {/* BACKGROUND "STACK" TEXT */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.div
            style={{ y: springY }}
            className="text-[35vw] font-black text-white/[0.015] leading-none tracking-tighter uppercase whitespace-nowrap select-none"
            aria-hidden="true"
          >
            STACK
          </motion.div>
        </div>

        {/* 1. HEADER SECTION */}
        <div className="max-w-7xl mx-auto px-6 mb-32 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-2 border border-white/5 rounded-full mb-8 bg-white/[0.01] backdrop-blur-md"
          >
            <div className="w-8 h-[1px] bg-zinc-800" aria-hidden="true" />
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500">
              Technical Prowess
            </span>
          </motion.div>
          
          {/* SEO Fix: Proper semantic H2 for page hierarchy */}
          <h2 id="skills-heading" className="text-6xl md:text-[7vw] font-bold tracking-tighter text-white leading-[0.85] uppercase">
            Modern <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-800 font-outline">
                Web Mastery
            </span>
          </h2>
          
          {/* Hidden text for screen readers (SEO value) */}
          <span className="sr-only">My technical skills and stack include Next.js 15, TypeScript, MERN Stack, React, PostgreSQL, and more.</span>
        </div>

        {/* 2. INFINITE RUNNING STREAMS */}
        {/* SEO/A11y Fix: Added region role and proper labels for screen readers for the auto-scrolling part */}
        <div 
          className="flex flex-col gap-0 w-full relative z-10"
          role="region"
          aria-label="Infinite scrolling list of my technical skills"
        >
          {/* Top Row - DARK (Forward) */}
          <div className="flex overflow-hidden border-y border-white/[0.03] py-14 bg-white/[0.01] backdrop-blur-sm group">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap gap-24 items-center"
              aria-hidden="true"
            >
              {[...SKILLS, ...SKILLS].map((skill, index) => (
                /* SEO Fix: Changed H3 to Span as these are list items, not page headings */
                <span 
                  key={index} 
                  className="text-zinc-600 text-6xl md:text-8xl font-black uppercase tracking-tighter hover:text-white transition-all duration-500 cursor-default"
                >
                  {skill.name} <span className="text-zinc-900 ml-12">•</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Bottom Row - BOLD WHITE (Reverse) */}
          <div className="flex overflow-hidden py-14 bg-white group">
            <motion.div 
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap gap-24 items-center"
              aria-hidden="true"
            >
              {[...SKILLS].reverse().concat([...SKILLS].reverse()).map((skill, index) => (
                /* SEO Fix: Changed H3 to Span */
                <span 
                  key={index} 
                  className="text-black text-6xl md:text-8xl font-black uppercase tracking-tighter hover:opacity-40 transition-all duration-500 cursor-default"
                >
                  {skill.name} <span className="text-black/10 ml-12">—</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* 3. CENTER GLASS OVERLAY - Precision Focus */}
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 hidden lg:block" aria-hidden="true">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="w-[400px] h-[400px] rounded-full border border-white/10 backdrop-blur-2xl flex items-center justify-center bg-white/[0.02] shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            >
                <div className="w-[300px] h-[300px] rounded-full border border-white/10 flex items-center justify-center bg-black shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <span className="text-zinc-500 font-mono text-center text-[10px] tracking-[0.4em] uppercase px-12 relative z-10 leading-relaxed">
                        Precision in every <br /> <span className="text-white">Fullstack Layer</span>
                    </span>
                </div>
            </motion.div>
          </div>
        </div>

        {/* 4. FOOTER QUOTE */}
        <div className="mt-44 max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-2xl md:text-4xl font-light text-zinc-600 leading-tight tracking-tighter italic">
            "Architecting resilient systems that 
            <span className="text-white not-italic font-medium"> scale seamlessly </span> 
            from prototype to production."
          </p>
          
          <div className="mt-20 inline-flex items-center gap-4 bg-white/[0.01] border border-white/[0.05] py-4 px-10 rounded-full backdrop-blur-3xl">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="text-[10px] font-mono text-zinc-500 tracking-[0.5em] uppercase">
              Engineered in Pakistan • 2026
            </span>
          </div>
        </div>

        <style jsx global>{`
          .font-outline {
            -webkit-text-stroke: 1px rgba(255,255,255,0.08);
          }
          html {
            background-color: #000000;
          }
        `}</style>
      </section>
    </ReactLenis>
  );
};

export default TechnicalEcosystem;