"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const LetsTalk = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      id="talk-cta"
      aria-label="Let's Talk Transition CTA"
      className="relative w-full pt-56 md:pt-72 lg:pt-96 pb-40 md:pb-56 lg:pb-72 bg-[#000000] overflow-hidden border-t border-zinc-900/60 flex items-center justify-center"
    >
      {/* Background visual details (Subtle grain & grid overlay) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,24,27,0.8)_0%,rgba(0,0,0,1)_100%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
        {/* Subtle grid accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center cursor-pointer select-none"
      >
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Main Link Wrapper */}
          <Link href="/contact" className="block group relative z-10 w-full">
            <div className="inline-flex flex-col items-center justify-center gap-6">
              {/* Huge Bold Heading (Perfectly stationary, bright by default) */}
              <h2 className="text-7xl sm:text-8xl md:text-[120px] lg:text-[160px] font-black tracking-tighter leading-none uppercase select-none text-white transition-all duration-500">
                <span className="inline-block transition-all duration-500">
                  LET'S{" "}
                </span>
                <span className="block sm:inline sm:ml-4 font-[family-name:var(--font-ms-madi)] text-zinc-100 transition-all duration-500 capitalize font-light tracking-normal lowercase italic drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                  talk
                </span>
              </h2>

              {/* Dynamic Center-Out Glowing Underline */}
              <div className="relative w-full max-w-[240px] sm:max-w-[360px] md:max-w-[500px] h-[2px] md:h-[3px] bg-zinc-800/40 overflow-hidden rounded-full transition-colors duration-500">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full bg-gradient-to-r from-transparent via-white/80 to-transparent origin-center shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LetsTalk;
