"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const SKILLS = [
  { name: "Next.js 16", tag: "Framework" },
  { name: "TypeScript", tag: "Language" },
  { name: "MERN Stack", tag: "FullStack" }, 
  { name: "React 19", tag: "Library" },
  { name: "Tailwind CSS", tag: "Design" },
  { name: "Node.js", tag: "Backend" },
  { name: "PostgreSQL", tag: "Database" },
  { name: "MongoDB", tag: "NoSQL" }, 
  { name: "Framer Motion", tag: "Motion" },
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

  const stackY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const springY = useSpring(stackY, { stiffness: 40, damping: 20 });

  return (
    <div
      ref={containerRef as any}
      className="relative min-h-screen w-full bg-[#000000] py-40 overflow-hidden selection:bg-[#E2E8F0] selection:text-[#000000]"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          style={{ y: springY }}
          className="text-[35vw] font-black text-[#E2E8F0]/[0.03] leading-none tracking-tighter uppercase whitespace-nowrap select-none"
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
          className="inline-flex items-center gap-3 px-6 py-2 border border-[#E2E8F0]/25 rounded-full mb-8 bg-[#0A0A0A]"
        >
          <div className="w-8 h-[1px] bg-[#E2E8F0]/40" aria-hidden="true" />
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#E2E8F0] font-bold">
            Technical Prowess
          </span>
        </motion.div>
        
        <h2 id="skills-heading" className="text-6xl md:text-[7vw] font-bold tracking-tighter text-[#FAF4EC] leading-[0.85] uppercase">
          Modern <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E2E8F0] to-[#94A3B8]">
              Web Mastery
          </span>
        </h2>
        
        <p className="sr-only">Technical skills and engineering stack include Next.js, React, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, and Framer Motion.</p>
      </div>

      {/* 2. INFINITE RUNNING STREAMS */}
      <div 
        className="flex flex-col gap-0 w-full relative z-10"
        role="region"
        aria-label="Infinite scrolling list of technical skills"
      >
        {/* Top Row - DARK ELEGANT BLACK (Forward) */}
        <div className="flex overflow-hidden border-y border-[#E2E8F0]/15 py-14 bg-[#0A0A0A] group">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-24 items-center"
            aria-hidden="true"
          >
            {[...SKILLS, ...SKILLS].map((skill, index) => (
              <span 
                key={index} 
                className="text-[#D4C3B3]/40 text-6xl md:text-8xl font-black uppercase tracking-tighter hover:text-[#E2E8F0] transition-all duration-300 cursor-default"
              >
                {skill.name} <span className="text-[#E2E8F0]/30 ml-12">•</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - BOLD CREAM (Reverse) */}
        <div className="flex overflow-hidden py-14 bg-[#FAF4EC] group">
          <motion.div 
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-24 items-center"
            aria-hidden="true"
          >
            {[...SKILLS].reverse().concat([...SKILLS].reverse()).map((skill, index) => (
              <span 
                key={index} 
                className="text-[#000000] text-6xl md:text-8xl font-black uppercase tracking-tighter hover:opacity-50 transition-all duration-300 cursor-default"
              >
                {skill.name} <span className="text-black/20 ml-12">—</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* 3. CENTER GLASS OVERLAY */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 hidden lg:block" aria-hidden="true">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-[400px] h-[400px] rounded-full border border-[#E2E8F0]/20 backdrop-blur-2xl flex items-center justify-center bg-[#E2E8F0]/[0.03]"
          >
              <div className="w-[300px] h-[300px] rounded-full border border-[#E2E8F0]/30 flex items-center justify-center bg-[#000000] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  <span className="text-[#D4C3B3] font-mono text-center text-[10px] tracking-[0.4em] uppercase px-12 relative z-10 leading-relaxed font-semibold">
                      Precision in every <br /> <span className="text-[#E2E8F0] font-bold">Fullstack Layer</span>
                  </span>
              </div>
          </motion.div>
        </div>
      </div>

      {/* 4. FOOTER QUOTE */}
      <div className="mt-44 max-w-4xl mx-auto px-6 text-center relative z-10">
        <p className="text-2xl md:text-4xl font-light text-[#D4C3B3] leading-tight tracking-tighter italic">
          &quot;Architecting resilient systems that 
          <span className="text-[#FAF4EC] not-italic font-medium"> scale seamlessly </span> 
          from prototype to production.&quot;
        </p>
        
        <div className="mt-20 inline-flex items-center gap-4 bg-[#0A0A0A] border border-[#E2E8F0]/20 py-4 px-10 rounded-full">
          <div className="w-2 h-2 rounded-full bg-[#E2E8F0]" aria-hidden="true" />
          <span className="text-[10px] font-mono text-[#E2E8F0] tracking-[0.5em] uppercase font-bold">
            Engineered in Pakistan • 2026
          </span>
        </div>
      </div>

      <style jsx global>{`
        .font-outline {
          -webkit-text-stroke: 1px rgba(226,232,240,0.3);
        }
      `}</style>
    </div>
  );
};

export default TechnicalEcosystem;