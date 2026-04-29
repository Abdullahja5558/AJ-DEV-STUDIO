"use client";

import React, { useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";

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

  const variants = useMemo(() => {
    return {
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.3 },
        },
      },
      item: {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: {
          opacity: 1, y: 0, filter: "blur(0px)",
          transition: { duration: 1.5, ease: luxuryEase },
        },
      } as any,
      spotlight: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
          opacity: 0.15, 
          scale: 1,
          transition: { 
            delay: 0.5,
            duration: 4, 
            ease: [0.16, 1, 0.3, 1] 
          } 
        } as any
      },
      heroImageLeft: {
        hidden: { opacity: 0, x: -100, rotate: -20 },
        visible: {
          opacity: 0.8,
          x: 0,
          rotate: -10,
          transition: { duration: 2, ease: luxuryEase, delay: 0.2 },
        },
      } as any,
      heroImageRight: {
        hidden: { opacity: 0, x: 100, rotate: 20 },
        visible: {
          opacity: 0.8,
          x: 0,
          rotate: 10,
          transition: { duration: 2, ease: luxuryEase, delay: 0.4 },
        },
      } as any,
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#000000] px-4 sm:px-6 py-20 selection:bg-white selection:text-black">
      
     
      <motion.div 
        variants={variants.spotlight}
        initial="hidden"
        animate="visible"
        className="absolute -top-[20%] -left-[10%] w-75 h-75 md:w-149.75 md:h-[600px] bg-white rounded-full blur-[120px] md:blur-[160px] pointer-events-none z-0 opacity-10" 
      />

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 transform-gpu" />

      <motion.div
        variants={variants.heroImageLeft}
        initial="hidden"
        animate="visible"
        // Desktop: left-[-10%] top-[-6%] w-[600px] | Mobile: scaled and pushed further left to avoid text overlap
        className="absolute left-[-24%] top-[-6%] md:left-[-10%] md:top-[-6%] w-[280px] sm:w-[400px] lg:w-[540px] opacity-60 md:opacity-80 z-0 pointer-events-none"
      >
        <Image src="/hero.png" alt="Hero Left" width={600} height={600} priority className="w-full h-auto object-contain" />
      </motion.div>

      <motion.div
        variants={variants.heroImageRight}
        initial="hidden"
        animate="visible"
        // Desktop: right-[-10%] bottom-[-5%] w-[600px] | Mobile: scaled
        className="absolute right-[-29%] bottom-[-6%] md:right-[-10%] md:bottom-[-5%] w-[280px] sm:w-[400px] lg:w-[600px] opacity-60 md:opacity-80 z-0 pointer-events-none"
      >
        <Image src="/hero.png" alt="Hero Right" width={600} height={600} priority className="w-full h-auto object-contain transform scale-x-[-1] rotate-90" />
      </motion.div>


      <motion.div
        variants={variants.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center transform-gpu"
      >
     
        {/* AVAILABILITY BADGE */}
        <motion.div 
          variants={variants.item} 
          className="flex items-center gap-3 mb-10 px-5 py-2 rounded-full border border-white/[0.05] bg-white/[0.02] backdrop-blur-2xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-medium text-zinc-400">
            Available for Q2 2026 Projects • Pakistan
          </span>
        </motion.div>

        {/* MAIN H1 - Desktop stays 110px, Mobile uses fluid text */}
        <motion.h1
          variants={variants.item}
          className="text-4xl sm:text-7xl md:text-8xl lg:text-[110px] font-bold leading-[1] md:leading-[0.9] tracking-tighter text-white mb-8 transform-gpu"
        >
          Engineering <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600">
            Full-Stack Solutions
          </span>
        </motion.h1>

        {/* H2 */}
        <motion.h2
          variants={variants.item}
          className="text-[10px] sm:text-lg md:text-xl text-zinc-500 max-w-3xl font-light leading-relaxed mb-14 px-4 tracking-[0.15em] uppercase"
        >
          Senior <span className="text-zinc-200">MERN Stack Developer</span> specializing in 
          <br className="hidden md:block" /> 
          robust architectures and premium <span className="text-zinc-200">digital craftsmanship.</span>
        </motion.h2>

        {/* BUTTONS */}
        <motion.div variants={variants.item} className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full sm:w-auto px-6 sm:px-0">
          <button className="group relative px-10 py-5 bg-white rounded-full overflow-hidden transition-all duration-700 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.03)]">
            <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[20%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-black rounded-[40%] group-hover:animate-[spin_6s_linear_infinite]" />
            <a className="relative z-10 text-black font-bold text-[10px] uppercase tracking-[0.3em] group-hover:text-white transition-colors duration-500" href="#work">
              Explore Portfolio
            </a>
          </button>

          <button className="group relative px-10 py-5 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all duration-700 active:scale-95">
            <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[20%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-white rounded-[40%] group-hover:animate-[spin_6s_linear_infinite]" />
            <a className="relative z-10 text-zinc-400 font-bold text-[10px] uppercase tracking-[0.3em] group-hover:text-black transition-colors duration-500" href="#contact">
              Let's Collaborate
            </a>
          </button>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: translateY(-45%) rotate(0deg); }
          to { transform: translateY(-45%) rotate(360deg); }
        }
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-stopped { overflow: hidden; }
      `}</style>
    </section>
  );
};

export default Hero;