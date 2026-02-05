"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { ReactLenis } from 'lenis/react';


const EXPERIENCES = [
  {
    title: "Backend Developer Journey",
    company: "Global Tech Solutions",
    period: "2025 — PRESENT",
    description: "Currently learning backend development with a focus on Node.js, Express, and database design.",
  },
  {
    title: "React-Native / Three.js Developer",
    company: "Creative Vision Studio",
    period: "2023 — 2025",
    description: "Built immersive mobile experiences using React Native and Three.js, including AR features and interactive 3D visualizations for a major retail client.",
  },
  {
    title: "Frontend Developer",
    company: "NextGen Systems",
    period: "2022 — 2023",
    description: "Worked on complete front-end applications with React / Next.js. Focused on performance, reusable components, animations, and modern UI/UX practices.",
  },
];

interface CardProps {
  exp: typeof EXPERIENCES[0];
  index: number;
  scrollProgress: MotionValue<number>;
}

const ExperienceCard = React.memo(({ exp, index, scrollProgress }: CardProps) => {
  const step = 1 / EXPERIENCES.length;
  const startTrigger = index * step;
  const endTrigger = (index + 1) * step;

  const opacity = useTransform(scrollProgress, [startTrigger, startTrigger + 0.1, endTrigger - 0.05, endTrigger], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [startTrigger, startTrigger + 0.1], [0.92, 1]);
  const xTranslate = useTransform(scrollProgress, [startTrigger, startTrigger + 0.1], [index % 2 === 0 ? -40 : 40, 0]);

  const dotScale = useTransform(scrollProgress, [startTrigger, startTrigger + 0.05], [0, 1]);
  const dotColor = useTransform(scrollProgress, [startTrigger, startTrigger + 0.05], ["#111111", "#22d3ee"]);

  return (
    <motion.div
      style={{ opacity, scale, x: xTranslate }}
      className="relative flex flex-col md:flex-row items-center justify-between w-full mb-60 last:mb-0 will-change-transform"
    >
      <div className={`w-full md:w-[42%] ${index % 2 === 0 ? "md:mr-auto text-left md:text-right" : "md:ml-auto text-left"}`}>
        <div className="group relative p-10 rounded-[2.5rem] border border-white/5 bg-linear-to-br from-white/3 to-transparent backdrop-blur-3xl hover:border-cyan-500/30 transition-all duration-700">
          <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/2 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2.5rem] pointer-events-none" />
          
          <span className="text-[10px] font-mono tracking-[0.5em] text-cyan-500 uppercase">{exp.period}</span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mt-4 tracking-tighter">{exp.title}</h3>
          <p className="text-white/40 font-bold mb-6 uppercase tracking-[0.3em] text-[10px]">{exp.company}</p>
          <p className="text-white/30 font-light leading-relaxed text-base md:text-lg antialiased">
            {exp.description}
          </p>

          <div className="mt-8 flex md:justify-end">
             <div className="w-8 h-px bg-white/10 group-hover:w-16 group-hover:bg-cyan-500 transition-all duration-500" />
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 hidden md:flex items-center justify-center pointer-events-none">
         <motion.div 
            style={{ scale: dotScale, backgroundColor: dotColor }}
            className="w-3 h-3 rounded-full border border-cyan-500 shadow-[0_0_15px_#22d3ee] will-change-transform"
         />
      </div>
    </motion.div>
  );
});

ExperienceCard.displayName = "ExperienceCard";

export const ExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.0001
  });

  const beamCursorPos = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
      <section 
        id="experience"
        ref={containerRef} 
        className="relative min-h-[350vh] bg-[#030014] py-40 px-6 md:px-12 overflow-hidden select-none"
      >
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.05 }} 
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto mb-60 relative z-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-0.5 w-16 bg-cyan-500" />
              <span className="text-[11px] uppercase tracking-[0.7em] font-black text-cyan-500">
                  THE JOURNEY
              </span>
            </motion.div>

            <div className="relative">
              <motion.h2 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[120px] font-black leading-[0.8] tracking-[-0.06em] text-white relative z-10"
              >
                Engineering <br />
                <span className="text-white/10 hover:text-white/20 transition-colors duration-1000">Mastery.</span>
              </motion.h2>
            </div>
          </div>

          <div className="max-w-7xl mx-auto relative">
           
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-white/5 hidden md:block">
              <motion.div 
                style={{ scaleY: smoothProgress, originY: 0 }}
                className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-cyan-400 via-blue-600 to-transparent shadow-[0_0_25px_rgba(34,211,238,0.3)] will-change-transform"
              />
              <motion.div 
                style={{ top: beamCursorPos }}
                className="absolute left-1/2 -translate-x-1/2 w-px h-20 bg-linear-to-b from-white to-transparent blur-[1px] rounded-full will-change-transform"
              />
            </div>

            <div className="relative z-10">
              {EXPERIENCES.map((exp, i) => (
                <ExperienceCard key={i} exp={exp} index={i} scrollProgress={smoothProgress} />
              ))}
            </div>
          </div>
        </motion.div>

        
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
           <motion.div 
             animate={{ opacity: [0.08, 0.12, 0.08] }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="absolute top-1/2 left-0 w-full h-150 bg-cyan-900/10 blur-[200px] rounded-full will-change-transform"
           />
        </div>
      </section>
    </ReactLenis>
  );
};

export default ExperienceTimeline;