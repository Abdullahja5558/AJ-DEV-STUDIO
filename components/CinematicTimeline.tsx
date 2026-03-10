"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";
import { ReactLenis } from "lenis/react";

// Original Experience Data
const EXPERIENCES = [
  {
    year: "2025",
    role: "Backend Developer Journey",
    company: "Global Tech Solutions",
    location: "REMOTE • USA",
    details: "Architecting high-performance server logic and optimizing database queries for real-time applications.",
  },
  {
    year: "2023",
    role: "React-Native / Three.js Developer",
    company: "Creative Vision Studio",
    location: "DUBAI • UAE",
    details: "Crafted immersive mobile experiences and AR-driven interfaces with seamless performance.",
  },
  {
    year: "2022",
    role: "Frontend Developer",
    company: "NextGen Systems",
    location: "FAISALABAD • PK",
    details: "Developing sophisticated web architectures with Next.js, focusing on micro-interactions and atomic design.",
  },
];

const ExperienceJourney = () => {
  const targetRef = useRef<HTMLElement>(null);
  
  // High vertical height to allow for read-locking space
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Sticky-like horizontal movement logic. 
  // We use slightly narrower range on scroll to create visual "dwell" time.
  const xRaw = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "-70%"]);
  // Spring makes it feel smooth like the 0.05 lerp
  const x = useSpring(xRaw, { stiffness: 45, damping: 22 });

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5 }}>
      <section 
        ref={targetRef} 
        className="relative h-[400vh] bg-[#070707] selection:bg-black selection:text-white"
        id="experience"
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          
          {/* Subtle Atmospheric Glows */}
          <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-[140px] pointer-events-none" />
          
          {/* Giant Background Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
            <h2 className="text-[40vw] font-black text-white uppercase tracking-tighter">PATH</h2>
          </div>

          <motion.div style={{ x }} className="flex items-center">
            
            {/* 1. Header Section */}
            <div className="min-w-[50vw] md:min-w-[45vw] px-10 md:px-24 flex flex-col justify-center gap-10 relative z-10">
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.8em] text-zinc-600 block">The Journey</span>
                <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter text-white leading-[0.85] uppercase">
                  WORK <br /> <span className="italic font-outline opacity-20 text-white">History</span>
                </h2>
              </div>
              
              <div className="flex items-center gap-8 mt-12 border-t border-white/5 pt-10">
                  <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.4em]">Scroll to Navigate</p>
                  <motion.div 
                      animate={{ x: [0, 20, 0] }} 
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="text-white opacity-30"
                  >
                      <MoveRight size={40} strokeWidth={1} />
                  </motion.div>
              </div>
            </div>

            {/* Visual Spacer */}
            <div className="min-w-[10vw] md:min-w-[15vw]" /> 

            {/* 2. Experience Cards Loop - Updated to High-Contrast White */}
            <div className="flex gap-24 md:gap-40 pr-[20vw]">
              {EXPERIENCES.map((exp, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -15, scale: 1.01 }}
                  className="relative min-w-[360px] md:min-w-[550px] h-[600px] bg-white rounded-[60px] p-12 md:p-16 flex flex-col justify-between group cursor-pointer border border-black/5 shadow-2xl overflow-hidden"
                >
                  {/* Year Watermark */}
                  <span className="absolute -top-10 -right-5 text-[15vw] font-black text-black/[0.04] select-none transition-all group-hover:text-black/[0.08] duration-700">
                    {exp.year}
                  </span>

                  <div className="z-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 text-zinc-600 font-bold text-[10px] tracking-[0.4em] uppercase">
                       <div className="w-10 h-[1.5px] bg-zinc-300 group-hover:w-16 group-hover:bg-zinc-800 transition-all duration-500" />
                       <span>{exp.location}</span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-[0.95] group-hover:italic transition-all duration-700">
                        {exp.role}
                    </h3>
                    <p className="text-black/80 text-xl font-bold uppercase tracking-tight">
                        @ {exp.company}
                    </p>
                  </div>

                  <div className="z-10">
                    {/* Increased visibility description p-tag */}
                    <p className="text-black/70 font-medium text-lg md:text-xl leading-relaxed mb-12 max-w-[420px]">
                        {exp.details}
                    </p>
                    <div className="w-18 h-18 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-zinc-800 transition-transform duration-500 shadow-2xl">
                        <ArrowRight size={30} strokeWidth={2}/>
                    </div>
                  </div>

                  {/* Vertical Sidebar Text Inside Card */}
                  <div className="absolute bottom-16 right-10">
                      <span className="text-[9px] font-mono font-black text-black/10 uppercase tracking-[0.6em] [writing-mode:vertical-lr]">
                          Archive No. 0{index + 1}
                      </span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* 3. Closing Chapter Space */}
            <div className="min-w-[60vw] px-24">
              <h2 className="text-[9vw] font-black text-white tracking-tighter leading-none uppercase">
                Engineering <br /> <span className="opacity-10 font-outline">Mastery.</span>
              </h2>
            </div>

          </motion.div>
        </div>

        <style jsx global>{`
          .font-outline {
            -webkit-text-stroke: 1.5px white;
            color: transparent;
          }
        `}</style>
      </section>
    </ReactLenis>
  );
};

export default ExperienceJourney;