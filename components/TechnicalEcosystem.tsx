"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactLenis } from "lenis/react";

const SKILLS = [
  { name: "Next.js 15", tag: "Framework" },
  { name: "TypeScript", tag: "Language" },
  { name: "HTML5", tag: "Markup" },
  { name: "React", tag: "Library" },
  { name: "Tailwind", tag: "Design" },
  { name: "Node.js", tag: "Backend" },
  { name: "PostgreSQL", tag: "Database" },
  { name: "Prisma", tag: "ORM" },
  { name: "Framer", tag: "Motion" },
  { name: "CSS", tag: "Styling" },
  { name: "Git", tag: "Version" },
  { name: "JavaScript", tag: "Language" },
];

export const TechnicalEcosystem = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const stackY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const springY = useSpring(stackY, { stiffness: 30, damping: 15 });

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5 }}>
      <section
        id="skills"
        ref={containerRef}
        className="relative min-h-screen w-full bg-[#070707] py-40 overflow-hidden selection:bg-white selection:text-black"
      >
        {/* ATMOSPHERIC GLOWS */}
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-[140px] pointer-events-none" />
        
        {/* BACKGROUND "STACK" TEXT */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.h2
            style={{ y: springY }}
            className="text-[30vw] font-black text-white/[0.02] leading-none tracking-tighter uppercase whitespace-nowrap"
          >
            STACK
          </motion.h2>
        </div>

        {/* 1. HEADER SECTION */}
        <div className="max-w-7xl mx-auto px-6 mb-32 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 border border-white/10 rounded-full mb-8 bg-white/[0.02] backdrop-blur-md"
          >
            <span className="w-8 h-[0.5px] bg-zinc-600" />
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400">
              Technical Prowess
            </span>
          </motion.div>
          
          <h2 className="text-6xl md:text-[8vw] font-bold tracking-tighter text-white leading-[0.85] uppercase">
            Modern <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-800 font-outline">
                Web Mastery
            </span>
          </h2>
        </div>

        {/* 2. INFINITE RUNNING STREAMS */}
        <div className="flex flex-col gap-0 w-full relative z-10">
          {/* Top Row - Dark Theme (Forward) */}
          <div className="flex overflow-hidden border-y border-white/[0.05] py-12 bg-white/[0.01] backdrop-blur-sm group">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap gap-20 items-center"
            >
              {[...SKILLS, ...SKILLS].map((skill, index) => (
                <h3 
                  key={index} 
                  className="text-zinc-500 text-6xl md:text-8xl font-black uppercase tracking-tighter hover:text-white transition-colors cursor-none"
                >
                  {skill.name} <span className="text-zinc-800 ml-10">•</span>
                </h3>
              ))}
            </motion.div>
          </div>

          {/* Bottom Row - WHITE BANNER (Reverse) */}
          <div className="flex overflow-hidden py-12 bg-white group">
            <motion.div 
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap gap-20 items-center"
            >
              {[...SKILLS].reverse().concat([...SKILLS].reverse()).map((skill, index) => (
                <h3 
                  key={index} 
                  className="text-black text-6xl md:text-8xl font-black uppercase tracking-tighter hover:opacity-50 transition-all cursor-none"
                >
                  {skill.name} <span className="text-black/20 ml-10">—</span>
                </h3>
              ))}
            </motion.div>
          </div>

          {/* 3. CENTER GLASS OVERLAY */}
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 hidden lg:block">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-[380px] h-[380px] rounded-full border border-white/10 backdrop-blur-xl flex items-center justify-center bg-white/[0.03] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                <div className="w-[280px] h-[280px] rounded-full border-[1px] border-white/20 flex items-center justify-center bg-black shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <span className="text-zinc-400 font-mono text-center text-[10px] tracking-[0.4em] uppercase px-12 relative z-10 leading-relaxed">
                        Precision in every <br /> <span className="text-white">single pixel</span>
                    </span>
                </div>
            </motion.div>
          </div>
        </div>

        {/* 4. FOOTER QUOTE */}
        <div className="mt-40 max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-2xl md:text-4xl font-light text-zinc-500 leading-tight tracking-tighter italic">
            "Building systems that scale seamlessly with 
            <span className="text-white not-italic font-medium"> user growth </span> 
            and high-performance expectations."
          </p>
          
          <div className="mt-16 inline-flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] py-4 px-8 rounded-full backdrop-blur-3xl">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
            <span className="text-[9px] font-mono text-zinc-500 tracking-[0.4em] uppercase">
              Status: Available 2026
            </span>
          </div>
        </div>

        <style jsx global>{`
          .font-outline {
            -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          }
          ::selection {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
        `}</style>
      </section>
    </ReactLenis>
  );
};

export default TechnicalEcosystem;