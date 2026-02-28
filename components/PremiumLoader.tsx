"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CinematicStarLoader({ onComplete }: { onComplete: () => void }) {
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanding(true);
      setTimeout(onComplete, 1150); 
    }, 1150);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#fafafa] overflow-hidden cursor-none pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isExpanding ? { 
          scale: 100, 
          opacity: 1,
          transition: { duration: 1.8, ease: [0.76, 0, 0.24, 1] } 
        } : { 
          scale: [0, 1.1, 1],
          opacity: 1,
          rotate: [0, 5, 0], 
          transition: { 
            scale: { duration: 1.2, ease: "easeOut" },
            rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" }
          }
        }}
        className="relative flex items-center justify-center w-full h-full"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-45 h-45 sm:w-75 sm:h-75 md:w-100 md:h-100 filter drop-shadow(0 0 20px rgba(255,255,255,0.1))"
        >
          <defs>
            <path
              id="starPath"
              d="M100 0 C105 70 130 95 200 100 C130 105 105 130 100 200 C95 130 70 105 0 100 C70 95 95 70 100 0 Z"
            />
          </defs>

         
          <use
            href="#starPath"
            fill="#00000"
            
          />

          
          <motion.path
            d="M100 0 C105 70 130 95 200 100 C130 105 105 130 100 200 C95 130 70 105 0 100 C70 95 95 70 100 0 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="opacity-80"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}