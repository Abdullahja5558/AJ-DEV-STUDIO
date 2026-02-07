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
  const y2 = useSpring(useTransform(scrollY, [0, 800], [0, -150]), springConfig);

  
  const variants = useMemo(() => {
    return {
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { 
            staggerChildren: 0.08, 
            delayChildren: 0.2 
          },
        },
      },
      item: {
        hidden: { 
          opacity: 0, 
          y: 40, 
          scale: 0.98,
          filter: "blur(15px)" 
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { 
            duration: 1.2, 
            ease: luxuryEase,
            opacity: { duration: 0.8 }
          },
        },
      } as any, 
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#030014] px-4 sm:px-6 py-20">
      
      
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] h-[70%] bg-purple-600/10 blur-[140px] rounded-full mix-blend-screen transform-gpu will-change-transform" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full transform-gpu will-change-transform" 
      />

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 transform-gpu" />

      <motion.div
        variants={variants.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center transform-gpu -mt-6"
      >
     
        <motion.div 
          variants={variants.item} 
          className="flex items-center gap-3 mb-10 px-5 py-2 rounded-full border border-white/10 bg-white/2 backdrop-blur-xl shadow-2xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold text-white/60">
            Available for 2026 Projects • Pakistan
          </span>
        </motion.div>

        
        <motion.h1
          variants={variants.item}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[115px] font-bold leading-[0.95] tracking-tight text-white mb-10 transform-gpu"
        >
          Architecting <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-white via-white/60 to-white/10">
            Digital Legacies
          </span>
        </motion.h1>

       
        <motion.p
          variants={variants.item}
          className="text-base sm:text-lg md:text-xl text-white/40 max-w-2xl font-light leading-relaxed mb-14 px-4 tracking-wide"
        >
          Senior Frontend Engineer specializing in 
          <span className="text-white/80"> high-performance interfaces </span> 
          and the craft of scalable systems.
        </motion.p>

       
        <motion.div variants={variants.item} className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-8 w-full sm:w-auto">
          <button className="group relative px-10 py-5 bg-purple-600 rounded-full overflow-hidden transition-all duration-700 border border-purple-400/20 active:scale-95 transform-gpu shadow-xl shadow-purple-900/20">
            <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[20%] transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-white rounded-[40%] group-hover:animate-[spin_5s_linear_infinite]" />
            <a className="relative z-10 text-white font-bold text-[11px] group-hover:text-black uppercase tracking-[0.25em] transition-colors duration-500" href="#experience">
              View Experience
            </a>
          </button>

          <button className="group relative px-10 py-5 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all duration-700 active:scale-95 transform-gpu">
            <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[20%] transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-white rounded-[40%] group-hover:animate-[spin_5s_linear_infinite]" />
            <a className="relative z-10 text-white/60 font-bold text-[11px] uppercase tracking-[0.25em] group-hover:text-black transition-colors duration-500" href="#contact">
              Let's Talk
            </a>
          </button>
        </motion.div>
      </motion.div>

     
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: "80px", opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 1, duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-linear-to-b from-transparent via-purple-500/50 to-transparent"
      />

      <style jsx global>{`
        @keyframes spin {
          from { transform: translateY(-45%) rotate(0deg); }
          to { transform: translateY(-45%) rotate(360deg); }
        }
        html.lenis, html.lenis body {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;