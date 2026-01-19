"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const UltraPremiumScroll = () => {
  const [percent, setPercent] = useState(0);
  const { scrollYProgress } = useScroll();

  
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  
  const orbGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(88, 28, 135, 0)", "rgba(147, 51, 234, 0.2)", "rgba(192, 132, 252, 0.4)"]
  );

  return (
    <div className="fixed bottom-10 right-10 z-100 flex items-center justify-center">
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute h-17.5 w-17.5 rounded-full border border-dashed border-purple-500/20"
      />

    
      <motion.div 
        style={{ backgroundColor: orbGlow }}
        className="relative h-10 w-10 flex items-center justify-center rounded-full border border-white/10 backdrop-blur-2xl backdrop-saturate-150 shadow-[20px_20px_50px_rgba(0,0,0,0.5),inset_0_0_10px_rgba(255,255,255,0.05)]"
      >
      
        <svg className="absolute inset-0 h-full w-full -rotate-90 p-1" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="purpleNeon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b0764" /> 
              <stop offset="50%" stopColor="#a855f7" /> 
              <stop offset="100%" stopColor="#e9d5ff" /> 
            </linearGradient>
           
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          
          <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="none" />

          <motion.circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#purpleNeon)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
            style={{ pathLength: scaleProgress }}
          />
        </svg>

      
        <div className="flex flex-col items-center justify-center z-10">
          <motion.span 
            className="text-[13px] font-black text-white font-mono tracking-tighter"
          >
            {percent.toString().padStart(2, '0')}
          </motion.span>
          <div className="h-[1.5px] w-3 bg-purple-500 rounded-full shadow-[0_0_5px_#a855f7]" />
        </div>

        
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-purple-600/10 blur-xl"
        />
      </motion.div>
    </div>
  );
};

export default UltraPremiumScroll;