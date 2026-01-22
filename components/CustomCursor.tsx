"use client";
import React, { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
 
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  
  const springConfig = { damping: 28, stiffness: 400, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(smoothX, springConfig); // Initial sync
  const cursorSize = useMotionValue(20);

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("button, a, input, [role='button']");
      
      if (isInteractive) {
        cursorSize.set(50);
        if (cursorRef.current) {
          cursorRef.current.style.backgroundColor = "rgba(30, 64, 175, 0.4)"; // Brighten on hover
          cursorRef.current.style.borderColor = "rgba(147, 197, 253, 0.5)";
        }
      } else {
        cursorSize.set(20);
        if (cursorRef.current) {
          cursorRef.current.style.backgroundColor = "rgba(30, 64, 175, 0.8)"; // Deep blue
          cursorRef.current.style.borderColor = "rgba(255, 255, 255, 0.1)";
        }
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleInteraction);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleInteraction);
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-9999 border flex items-center justify-center transition-colors duration-300"
      style={{
        x: smoothX,
        y: useSpring(mouseY, springConfig),
        translateX: "-50%",
        translateY: "-50%",
        width: cursorSize,
        height: cursorSize,
        backgroundColor: "rgba(30, 64, 175, 0.8)", 
        borderColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 20px rgba(29, 78, 216, 0.3)",
      }}
    >
      
      <div className="w-1 h-1 bg-white/40 rounded-full" />
      
      
      <motion.div 
        className="absolute -inset-2 border border-blue-500/10 rounded-full"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};
export default CustomCursor;