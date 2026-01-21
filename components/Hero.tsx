"use client";

import React from "react";
import { motion } from "framer-motion";

const luxuryEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(15px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: luxuryEase as any },
  },
};

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#030014] px-6 py-20">
      {/* Premium Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
      
      {/* Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full" />
      <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center"
      >
        {/* Status Badge - Shifted down using mb-14 */}
        <motion.div 
          variants={itemVariants} 
          className="flex items-center gap-4 mb-7 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-white/60">
            Available for 2026 Projects • Pakistan
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-8xl lg:text-[120px] font-bold leading-[0.95] tracking-tight text-white mb-10"
        >
          Architecting <br />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-white/40 to-white/10">
            Digital Legacies
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/40 max-w-2xl font-light leading-relaxed mb-14"
        >
          Senior Frontend Engineer specializing in 
          <span className="text-white/80"> high-performance interfaces </span> 
          and the craft of scalable systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6">
          {/* Experience Button */}
          <button className="group relative px-10 py-5 bg-purple-600 rounded-full overflow-hidden transition-all duration-500 border border-purple-400/30">
            <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[20%] transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-white rounded-[40%] animate-none group-hover:animate-[spin_6s_linear_infinite]" />
            <a
              className="relative z-10 text-white font-bold text-xs group-hover:text-black uppercase tracking-[0.2em] transition-colors duration-500 cursor-pointer"
              href="#experience"
            >
              View Experience
            </a>
          </button>

          {/* Contact Button */}
          <button className="group relative px-10 py-5 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all duration-500">
            <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[20%] transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-white rounded-[40%] animate-none group-hover:animate-[spin_6s_linear_infinite]" />
            <a
              className="relative z-10 text-white/60 font-bold text-xs uppercase tracking-[0.2em] group-hover:text-black transition-colors duration-500 cursor-pointer"
              href="#contact"
            >
              Let's Talk
            </a>
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative Scroll Indicator */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: "80px", opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-linear-to-b from-transparent via-purple-500/40 to-transparent"
      />

      <style jsx global>{`
        @keyframes spin {
          from { transform: translateY(-45%) rotate(0deg); }
          to { transform: translateY(-45%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;