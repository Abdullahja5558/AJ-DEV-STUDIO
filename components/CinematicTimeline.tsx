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
  
  // FIXED: Adjusted start/end range so content reveals earlier on the scroll
  const start = index * step;
  const end = start + 0.15; // Increased range for smoother, visible transitions

  const opacity = useTransform(scrollProgress, [start, start + 0.1], [0, 1]);
  const y = useTransform(scrollProgress, [start, start + 0.1], [20, 0]);
  const lineWidth = useTransform(scrollProgress, [start, start + 0.1], ["0%", "80%"]);

  return (
    <motion.div
      style={{ opacity, y }}
      // FIXED: mb-24 on mobile prevents the "dead space" gap, md:mb-[35vh] keeps your desktop look
      className={`relative flex w-full mb-32 md:mb-[35vh] last:mb-0 ${isEven ? "md:justify-start" : "md:justify-end"} justify-start`}
    >
      <div className="w-full md:w-[42%] relative group px-2 md:px-0">
        <div className={`absolute -top-10 ${isEven ? "md:right-0 md:left-auto" : "md:left-0"} left-0 opacity-10`}>
           <span className="text-6xl md:text-[32px] font-black font-mono text-white italic">0{index + 1}</span>
        </div>

        <div className="relative pt-6">
          <div className={`flex items-center gap-3 mb-4 ${!isEven && "md:flex-row-reverse"} flex-row`}>
            <span className="text-cyan-500 font-mono text-[10px] tracking-[0.4em] uppercase whitespace-nowrap">
              {exp.period}
            </span>
            <motion.div 
              style={{ width: lineWidth }}
              className="h-[0.5px] bg-cyan-500/30 hidden md:block"
            />
          </div>

          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-[0.9] transition-all duration-700 group-hover:tracking-tight">
            {exp.title}
          </h3>

          <div className="flex flex-col gap-4">
             <p className="text-cyan-500 font-bold uppercase tracking-[0.2em] text-[10px]">
               // {exp.company}
             </p>
             <p className="text-white/50 font-light leading-relaxed text-base md:text-lg max-w-md border-l border-white/10 pl-6">
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
  
  // FIXED: Changed offset to "start 80%" so the first item shows up sooner on screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 30 });

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
      <section 
        ref={containerRef} 
        // FIXED: Reduced mobile min-height to 250vh so the scroll isn't too long for only 3 items
        className="relative min-h-[250vh] md:min-h-[400vh] bg-[#030014] py-20 md:py-32 px-6 lg:px-24 overflow-hidden"
      >
        <div className="fixed inset-0 pointer-events-none">
           <div className="absolute inset-0 opacity-[0.03]" 
                style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto mb-32 md:mb-60 relative z-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-cyan-500" />
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-cyan-500">
                THE JOURNEY
            </span>
          </div>
          <h2 className="text-5xl md:text-[100px] font-black leading-[0.85] tracking-[-0.05em] text-white">
            Engineering <br />
            <span className="text-white/5">Mastery.</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* SVG path: Visible on desktop */}
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
                stroke="#22d3ee" 
                strokeWidth="0.8" 
                style={{ pathLength: smoothProgress }}
              />
            </svg>
          </div>

          {/* FIXED: Added a simple subtle line for mobile so the user has a visual guide */}
          <div className="absolute left-0.5 top-0 bottom-0 w-[1px] bg-cyan-500/10 md:hidden" />

          <div className="relative z-10">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} scrollProgress={smoothProgress} />
            ))}
          </div>
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </section>
    </ReactLenis>
  );
};

export default ExperienceTimeline;