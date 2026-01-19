"use client";

import React from "react";
import { motion } from "framer-motion";

const luxuryEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: luxuryEase as any },
  },
};

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030014] px-6">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="relative z-10 w-full max-w-300 flex flex-col items-start"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
          <div className="h-px w-8 bg-purple-500" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
            Based in Pakistan • Open for 2026 Projects
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-[110px] font-bold leading-[0.9] tracking-[-0.04em] text-white"
        >
          Architecting <br />
          <span className="text-white/20 inline-block hover:text-white/40 transition-colors duration-700">
            Digital Legacies.
          </span>
        </motion.h1>

        <div className="w-full flex flex-col md:flex-row justify-between items-end mt-16 gap-8">
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/40 max-w-120 font-light leading-relaxed"
          >
            Senior Frontend Engineer dedicated to the craft of
            <span className="text-white"> high-performance</span> interfaces and
            scalable systems.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-6">
            {/* --- EXPERIENCE BUTTON (Liquid Fill) --- */}
            <button className="group relative px-10 py-5 bg-purple-600 rounded-full overflow-hidden transition-all duration-500 border  hover:text-black">
              <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[5%] transition-transform duration-1200 ease-[cubic-bezier(0.19,1,0.22,1)] bg-white hover:text-black rounded-[40%] animate-none group-hover:animate-[spin_4s_linear_infinite]" />
              <a
                className="relative z-10 text-black font-bold text-xs group-hover:text-black uppercase tracking-widest  transition-colors duration-500 cursor-pointer"
                href="#experience"
              >
                View Experience
              </a>
            </button>

            {/* --- CONTACT BUTTON (Liquid Fill) --- */}
            <button className="group relative px-10 py-5 bg-transparent border  rounded-full overflow-hidden transition-all duration-500 ">
              <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[5n%] transition-transform duration-1200 ease-[cubic-bezier(0.19,1,0.22,1)] bg-white rounded-[40%] animate-none group-hover:animate-[spin_4s_linear_infinite]" />
              <a
                className="relative z-10 text-white/60 font-bold text-xs uppercase tracking-widest group-hover:text-black transition-colors duration-500 cursor-pointer"
                href="#contact"
              >
                Contact
              </a>
            </button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "100px" }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute bottom-0 left-1/2 w-px bg-linear-to-b from-transparent via-white/20 to-transparent"
      />

      {/* Global CSS for the Liquid Spin Effect */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: translateY(-35%) rotate(0deg); }
          to { transform: translateY(-35%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;