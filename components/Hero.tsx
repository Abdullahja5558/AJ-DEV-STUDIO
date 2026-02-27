"use client";

import React, { useMemo, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "lenis";

const luxuryEase = [0.19, 1, 0.22, 1]; 

export const Hero = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1, 
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const { scrollY } = useScroll();
  const springConfig = { stiffness: 60, damping: 20, mass: 0.5 }; 
  const y1 = useSpring(useTransform(scrollY, [0, 800], [0, 150]), springConfig);

  const variants = useMemo(() => {
    return {
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.2 },
        },
      },
      item: {
        hidden: { opacity: 0, y: 40, scale: 0.98, filter: "blur(15px)" },
        visible: {
          opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
          transition: { duration: 1.2, ease: luxuryEase },
        },
      } as any,
      // IMPROVED SPOTLIGHT ANIMATION
      spotlight: {
        hidden: { opacity: 0, x: -100, y: -100 },
        visible: { 
          opacity: 0.20, 
          x: 0, 
          y: 0,
          transition: { 
            delay: 1,
            duration: 3, 
            ease: [0.16, 1, 0.3, 1] 
          } 
        } as any
      }
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#000000] px-4 sm:px-6 py-20 selection:bg-white selection:text-black">
      
      {/* --- TOP CORNER PREMIUM LIGHT --- */}
      {/* Yeh light humburger menu wali side (top-left) se shine karegi */}
      <motion.div 
        variants={variants.spotlight}
        initial="hidden"
        animate="visible"
        className="absolute -top-40 -right-30 w-[400px] h-[500px] bg-white rounded-full blur-[140px] pointer-events-none z-0" 
      />

      
      {/* TEXTURE: Cinematic Grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 transform-gpu" />

      <motion.div
        variants={variants.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center transform-gpu -mt-6"
      >
     
        {/* LUXURY BADGE */}
        <motion.div 
          variants={variants.item} 
          className="flex items-center gap-3 mb-12 px-6 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-3xl"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zinc-200"></span>
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] font-bold text-zinc-500">
            Available for 2026 Projects • Pakistan
          </span>
        </motion.div>

        {/* TITLES */}
        <motion.h1
          variants={variants.item}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[115px] font-bold leading-[0.95] tracking-tighter text-white mb-10 transform-gpu"
        >
          Architecting <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-800">
            Digital Legacies
          </span>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          variants={variants.item}
          className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl font-light leading-relaxed mb-16 px-4 tracking-widest"
        >
          Senior Frontend Engineer specializing in 
          <span className="text-zinc-100"> high-performance interfaces </span> 
          and the craft of scalable systems.
        </motion.p>

        {/* BUTTONS */}
        <motion.div variants={variants.item} className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-8 w-full sm:w-auto">
          <button className="group relative px-12 py-5 bg-white rounded-full overflow-hidden transition-all duration-700 active:scale-95 transform-gpu shadow-[0_0_50px_rgba(255,255,255,0.05)] group-hover:text-white">
            <span className="absolute left-0 top-0 text-white w-full h-[300%] -translate-y-full group-hover:-translate-y-[20%] transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-black rounded-[40%] group-hover:animate-[spin_5s_linear_infinite] group-hover:text-white" />
            <a className="relative z-10 text-black font-bold text-[11px] uppercase tracking-[0.35em] group-hover:text-white" href="#experience">
              View Experience
            </a>
          </button>

          <button className="group relative px-12 py-5 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all duration-700 active:scale-95 transform-gpu">
            <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[20%] transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-white rounded-[40%] group-hover:animate-[spin_5s_linear_infinite]" />
            <a className="relative z-10 text-white/50 font-bold text-[11px] uppercase tracking-[0.35em] group-hover:text-black transition-colors duration-500" href="#contact">
              Let's Talk
            </a>
          </button>
        </motion.div>
      </motion.div>

     
      <style jsx global>{`
        @keyframes spin {
          from { transform: translateY(-45%) rotate(0deg); }
          to { transform: translateY(-45%) rotate(360deg); }
        }
        html.lenis, html.lenis body { height: auto; background-color: #000; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
      `}</style>
    </section>
  );
};

export default Hero;