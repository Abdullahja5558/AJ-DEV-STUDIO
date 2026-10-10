"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const luxuryEase = [0.19, 1, 0.22, 1];

export const Hero = () => {
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
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
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
            ease: [0.16, 1, 0.3, 1],
          },
        } as any,
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
    <section 
      aria-label="Hero Introduction"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#3B0007] px-4 sm:px-6 py-20 selection:bg-[#DEBA75] selection:text-[#3B0007]"
    >
      <motion.div
        variants={variants.heroImageLeft}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="absolute left-[-24%] top-[-6%] md:left-[-10%] md:top-[-6%] w-70 sm:w-100 lg:w-135 opacity-70 md:opacity-90 z-0 pointer-events-none"
      >
        <Image
          src="/hero.png"
          alt="AJ Developer Hero Artwork Left"
          width={600}
          height={600}
          priority
          sizes="(max-width: 768px) 280px, 600px"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      <motion.div
        variants={variants.heroImageRight}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="absolute right-[-29%] bottom-[-6%] md:right-[-10%] md:bottom-[-5%] w-[280px] sm:w-[400px] lg:w-[600px] opacity-70 md:opacity-90 z-0 pointer-events-none"
      >
        <Image
          src="/hero.png"
          alt="AJ Developer Hero Artwork Right"
          width={600}
          height={600}
          priority
          sizes="(max-width: 768px) 280px, 600px"
          className="w-full h-auto object-contain transform scale-x-[-1] rotate-90"
        />
      </motion.div>

      <motion.div
        variants={variants.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center transform-gpu"
      >
        
        {/* Social Proof Badge */}
        <motion.div
          variants={variants.item}
          className="flex items-center justify-center gap-2 sm:gap-3 mb-8 select-none scale-90 sm:scale-100"
        >
          {/* Left Laurel */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-90 brightness-125 sepia contrast-125">
            <Image
              src="/weather-L.png"
              alt="Laurel Award Icon"
              fill
              sizes="56px"
              className="object-contain"
            />
          </div>

          {/* Avatars Overlap */}
          <div className="flex items-center" aria-label="Global Client Endorsements">
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-[#3B0007] ring-1 ring-[#DEBA75]/40 z-20 bg-[#2E0006] flex-shrink-0">
              <Image
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=Aria"
                alt="Client avatar Aria"
                width={28}
                height={28}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-[#3B0007] ring-1 ring-[#DEBA75]/40 -ml-2.5 z-10 bg-[#2E0006] flex-shrink-0">
              <Image
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=John"
                alt="Client avatar John"
                width={28}
                height={28}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-[#3B0007] ring-1 ring-[#DEBA75]/40 -ml-2.5 z-0 bg-[#2E0006] flex-shrink-0">
              <Image
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=Mia"
                alt="Client avatar Mia"
                width={28}
                height={28}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Text */}
          <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#D4C3B3] tracking-wider">
            Trusted by <strong className="text-[#FAF4EC] font-semibold">3k+ Global Clients</strong>
          </span>

          {/* Right Laurel */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-90 brightness-125 sepia contrast-125">
            <Image
              src="/weather-R.png"
              alt="Laurel Award Icon Right"
              fill
              sizes="56px"
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Semantic H1 with High-Value Ranking Keywords */}
        <motion.h1
          variants={variants.item}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[92px] font-bold leading-[1.05] md:leading-[1] tracking-tighter text-[#FAF4EC] mb-8 transform-gpu"
        >
          Engineering Digital <br className="hidden sm:block" />
          <span className="relative inline-block text-[#DEBA75] pb-2">
            Masterpieces
            {/* Animated Wavy Underline */}
            <div className="absolute left-[-8%] -bottom-3 w-[116%] overflow-hidden h-[33px] pointer-events-none select-none" aria-hidden="true">
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 1,
                  ease: [0.19, 1, 0.22, 1]
                }}
                className="w-full h-full"
              >
                <svg
                  width="100%"
                  height="33"
                  viewBox="0 0 240 16"
                  fill="none"
                  className="text-[#DEBA75] opacity-90"
                >
                  <motion.path
                    animate={{
                      d: [
                        "M 0 8 Q 15 14, 30 8 T 60 8 T 90 8 T 120 8 T 150 8 T 180 8 T 210 8 T 240 8",
                        "M 0 8 Q 15 2, 30 8 T 60 8 T 90 8 T 120 8 T 150 8 T 180 8 T 210 8 T 240 8",
                        "M 0 8 Q 15 14, 30 8 T 60 8 T 90 8 T 120 8 T 150 8 T 180 8 T 210 8 T 240 8"
                      ]
                    }}
                    transition={{
                      duration: 2.5,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            </div>
          </span>
        </motion.h1>

        {/* Subtitle / Core Role Keyword Target */}
        <motion.p
          variants={variants.item}
          className="text-[10px] sm:text-xs md:text-sm lg:text-[15px] text-[#D4C3B3] max-w-3xl font-light leading-relaxed mb-12 px-4 tracking-[0.16em] uppercase"
        >
          Senior <strong className="text-[#DEBA75] font-semibold">MERN STACK</strong> developer specializing in
          <br className="hidden md:block" />
          robust architectures and premium{" "}
          <strong className="text-[#DEBA75] font-semibold">DIGITAL</strong> craftsmanship.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={variants.item}
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full sm:w-auto px-6 sm:px-0"
        >
          <button
            aria-label="Explore Portfolio Projects"
            className="group relative px-8 py-4 bg-[#FAF4EC] rounded-full overflow-hidden transition-all duration-700 active:scale-95 cursor-pointer"
            onClick={() => {
              const section = document.getElementById("projects");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[20%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-[#3B0007] rounded-[40%] group-hover:animate-[spin_6s_linear_infinite]" />
            <span className="relative z-10 text-[#3B0007] font-bold text-[10px] uppercase tracking-[0.3em] group-hover:text-[#FAF4EC] transition-colors duration-500">
              Explore Portfolio
            </span>
          </button>

          <Link
            href="/contact"
            aria-label="Contact and Collaborate with AJ"
            className="group relative px-8 py-4 bg-transparent border border-[#DEBA75]/30 rounded-full overflow-hidden transition-all duration-700 active:scale-95 inline-flex items-center justify-center cursor-pointer"
          >
            <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[20%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-[#FAF4EC] rounded-[40%] group-hover:animate-[spin_6s_linear_infinite]" />
            <span className="relative z-10 text-[#DEBA75] font-bold text-[10px] uppercase tracking-[0.3em] group-hover:text-[#3B0007] transition-colors duration-500">
              Let&apos;s Collaborate
            </span>
          </Link>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: translateY(-45%) rotate(0deg);
          }
          to {
            transform: translateY(-45%) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
