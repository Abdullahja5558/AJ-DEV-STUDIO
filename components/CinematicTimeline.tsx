"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { ReactLenis } from 'lenis/react';

const EXPERIENCES = [
  {
    title: "Backend Developer Journey",
    company: "Global Tech Solutions",
    period: "2025 — PRESENT",
    description: "Architecting high-performance server logic and optimizing database queries for real-time applications.",
  },
  {
    title: "React-Native / Three.js Developer",
    company: "Creative Vision Studio",
    period: "2023 — 2025",
    description: "Crafting immersive 3D mobile experiences and AR-driven user interfaces with seamless performance.",
  },
  {
    title: "Frontend Developer",
    company: "NextGen Systems",
    period: "2022 — 2023",
    description: "Developing sophisticated web architectures with Next.js, focusing on micro-interactions and atomic design.",
  },
];

const ExperienceCard = ({ exp, index, scrollProgress }: { exp: any, index: number, scrollProgress: MotionValue<number> }) => {
  const isEven = index % 2 === 0;
  const step = 1 / EXPERIENCES.length;
  const start = index * step;
  
  const opacity = useTransform(scrollProgress, [start, start + 0.1], [0, 1]);
  const y = useTransform(scrollProgress, [start, start + 0.1], [20, 0]);
  const lineWidth = useTransform(scrollProgress, [start, start + 0.1], ["0%", "80%"]);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`relative flex w-full mb-32 md:mb-[35vh] last:mb-0 ${isEven ? "md:justify-start" : "md:justify-end"} justify-start`}
    >
      <div className="w-full md:w-[42%] relative group px-2 md:px-0">
        <div className={`absolute -top-10 ${isEven ? "md:right-0 md:left-auto" : "md:left-0"} left-0 opacity-10`}>
           <span className="text-6xl md:text-[32px] font-black font-mono text-zinc-800 italic">0{index + 1}</span>
        </div>

        <div className="relative pt-6">
          <div className={`flex items-center gap-3 mb-4 ${!isEven && "md:flex-row-reverse"} flex-row`}>
            <span className="text-zinc-500 font-mono text-[10px] tracking-[0.45em] uppercase whitespace-nowrap">
              {exp.period}
            </span>
            <motion.div 
              style={{ width: lineWidth }}
              className="h-[0.5px] bg-zinc-800 hidden md:block"
            />
          </div>

          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-[0.9] transition-all duration-700 group-hover:italic group-hover:text-zinc-100">
            {exp.title}
          </h3>

          <div className="flex flex-col gap-4">
             <p className="text-zinc-400 font-bold uppercase tracking-[0.25em] text-[10px]">
               {exp.company}
             </p>
             <p className="text-zinc-600 font-light leading-relaxed text-base md:text-lg max-w-md border-l border-white/[0.04] pl-6 group-hover:border-white/20 transition-all duration-500">
               {exp.description}
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 30 });

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
      <section 
        ref={containerRef} 
        className="relative min-h-[250vh] md:min-h-[400vh] bg-[#000000] py-20 md:py-32 px-6 lg:px-24 overflow-hidden selection:bg-white selection:text-black"
        id="experience"
      >
        
        {/* NEW TOP OBSIDIAN OVERLAY: Matches Hero/Skills colors exactly */}
        <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-[#050505] via-[#060606]/40 to-transparent pointer-events-none z-0" />
        
        {/* ATMOSPHERIC TOP-RIGHT GLOW: Syncs with Hero light */}
        <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] blur-[140px] pointer-events-none z-0" />
        
        {/* SUBTLE GRID */}
        <div className="fixed inset-0 pointer-events-none">
           <div className="absolute inset-0 opacity-[0.01]" 
                style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`, backgroundSize: '60px 60px' }} />
        </div>

        <div className="max-w-7xl mx-auto mb-32 md:mb-60 relative z-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[0.5px] w-12 bg-zinc-800" />
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-zinc-500">
                THE JOURNEY
            </span>
          </div>
          <h2 className="text-5xl md:text-[100px] font-black leading-[0.85] tracking-[-0.05em] text-white">
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-900">Mastery.</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-full pointer-events-none hidden md:block">
            <svg width="100%" height="100%" viewBox="0 0 100 1200" preserveAspectRatio="none">
              <path 
                d="M50 0 C 80 150, 20 250, 50 400 C 80 550, 20 650, 50 800 C 80 950, 20 1050, 50 1200" 
                fill="none" 
                stroke="white" 
                strokeOpacity="0.02" 
                strokeWidth="0.5"
              />
              <motion.path 
                d="M50 0 C 80 150, 20 250, 50 400 C 80 550, 20 650, 50 800 C 80 950, 20 1050, 50 1200" 
                fill="none" 
                stroke="white" 
                strokeOpacity="0.15" 
                strokeWidth="0.8" 
                style={{ pathLength: smoothProgress }}
              />
            </svg>
          </div>

          <div className="absolute left-0.5 top-0 bottom-0 w-[0.5px] bg-white/[0.05] md:hidden" />

          <div className="relative z-10">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} scrollProgress={smoothProgress} />
            ))}
          </div>
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </section>

      <style jsx global>{`
        ::selection {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        ::-moz-selection {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
      `}</style>
    </ReactLenis>
  );
};

export default ExperienceTimeline;