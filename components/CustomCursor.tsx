"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse Positions
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-Smooth Spring Config (Liquid Feel)
  const springConfig = { damping: 35, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const cursorSize = useSpring(isHovered ? 80 : 16, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("button, a, input, [role='button'], .premium-hover");
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleInteraction);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleInteraction);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 1. MAIN CURSOR (The Inverter) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorSize,
          height: cursorSize,
          backgroundColor: "white", // Invert mode mein ye white background ko black aur black ko white karega
        }}
      >
        {/* Subtle dot inside when not hovering */}
        {!isHovered && (
          <div className="w-1 h-1 bg-black rounded-full" />
        )}
      </motion.div>

      {/* 2. OUTER GLOW (The Aesthetic Ring) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-white/20"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 100 : 40,
          height: isHovered ? 100 : 40,
          opacity: isHovered ? 0.5 : 0.2,
          transition: "width 0.5s ease, height 0.5s ease, opacity 0.5s ease",
        }}
      />

      <style jsx global>{`
        /* Hide default cursor only on desktop for better UX */
        @media (min-width: 1024px) {
          html, body {
            cursor: none !important;
          }
          a, button, input {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;