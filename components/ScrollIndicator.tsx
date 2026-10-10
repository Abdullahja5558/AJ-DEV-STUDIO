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

  return (
    <div className="fixed bottom-10 right-10 z-100 flex items-center justify-center">
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute h-17.5 w-17.5 rounded-full border border-dashed border-[#DEBA75]/35"
      />

      <div 
        className="relative h-11 w-11 flex items-center justify-center rounded-full border border-[#DEBA75]/30 bg-[#2E0006]"
      >
        <svg className="absolute inset-0 h-full w-full -rotate-90 p-1" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="goldLuxury" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DEBA75" /> 
              <stop offset="100%" stopColor="#FAF4EC" /> 
            </linearGradient>
          </defs>

          <circle cx="50" cy="50" r="44" stroke="rgba(222,186,117,0.15)" strokeWidth="4" fill="none" />

          <motion.circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#goldLuxury)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength: scaleProgress }}
          />
        </svg>

        <div className="flex flex-col items-center justify-center z-10">
          <motion.span 
            className="text-[12px] font-black text-[#FAF4EC] font-mono tracking-tighter"
          >
            {percent.toString().padStart(2, '0')}
          </motion.span>
          <div className="h-[1.5px] w-3 bg-[#DEBA75] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default UltraPremiumScroll;