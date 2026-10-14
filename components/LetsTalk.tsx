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
      className="relative w-full pt-56 md:pt-72 lg:pt-96 pb-40 md:pb-56 lg:pb-72 bg-[#000000] overflow-hidden border-t border-[#E2E8F0]/15 flex items-center justify-center selection:bg-[#E2E8F0] selection:text-[#000000]"
    >
      {/* Background visual details */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[#000000]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
        {/* Subtle grid accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f00d_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f00d_1px,transparent_1px)] bg-[size:4rem_4rem]" />
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
              {/* Huge Bold Heading */}
              <h2 className="text-7xl sm:text-8xl md:text-[120px] lg:text-[160px] font-black tracking-tighter leading-none uppercase select-none text-[#FAF4EC] transition-all duration-500">
                <span className="inline-block transition-all duration-500">
                  LET&apos;S{" "}
                </span>
                <span className="block sm:inline sm:ml-4 font-[family-name:var(--font-ms-madi)] text-[#E2E8F0] transition-all duration-500 capitalize font-light tracking-normal lowercase italic">
                  talk
                </span>
              </h2>

              {/* Dynamic Center-Out Underline */}
              <div className="relative w-full max-w-[240px] sm:max-w-[360px] md:max-w-[500px] h-[2px] md:h-[3px] bg-[#E2E8F0]/20 overflow-hidden rounded-full transition-colors duration-500">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent origin-center"
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
