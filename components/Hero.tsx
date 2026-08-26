"use client";

import React, { useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";

const luxuryEase = [0.19, 1, 0.22, 1];

export const Hero = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#000000] px-4 sm:px-6 py-20 selection:bg-white selection:text-black">
      <motion.div
        variants={variants.spotlight}
        initial="hidden"
        animate="visible"
        className="absolute -top-[20%] -left-[10%] w-75 h-75 md:w-149.75 md:h-150 bg-white rounded-full blur-[120px] md:blur-[160px] pointer-events-none z-0 opacity-10"
      />

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 transform-gpu" />

      <motion.div
        variants={variants.heroImageLeft}
        initial="hidden"
        animate="visible"
      
        className="absolute left-[-24%] top-[-6%] md:left-[-10%] md:top-[-6%] w-70 sm:w-100 lg:w-135 opacity-60 md:opacity-80 z-0 pointer-events-none"
      >
        <Image
          src="/hero.png"
          alt="Hero Left"
          width={600}
          height={600}
          priority
          className="w-full h-auto object-contain"
        />
      </motion.div>

      <motion.div
        variants={variants.heroImageRight}
        initial="hidden"
        animate="visible"
        
        className="absolute right-[-29%] bottom-[-6%] md:right-[-10%] md:bottom-[-5%] w-[280px] sm:w-[400px] lg:w-[600px] opacity-60 md:opacity-80 z-0 pointer-events-none"
      >
        <Image
          src="/hero.png"
          alt="Hero Right"
          width={600}
          height={600}
          priority
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
        
        <motion.div
          variants={variants.item}
          className="flex items-center justify-center gap-2 sm:gap-3 mb-10 select-none scale-90 sm:scale-100"
        >
          {/* Left Laurel */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/weather-L.png"
            alt="Laurel Left"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain opacity-75"
          />

          {/* Avatars Overlap (No Box Wrapper) */}
          <div className="flex items-center">
            {/* Avatar 1 */}
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-black ring-1 ring-white/10 z-20 bg-zinc-900 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=Aria"
                alt="Partner 1"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Avatar 2 */}
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-black ring-1 ring-white/10 -ml-2.5 z-10 bg-zinc-900 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=John"
                alt="Partner 2"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Avatar 3 */}
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-black ring-1 ring-white/10 -ml-2.5 z-0 bg-zinc-900 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=Mia"
                alt="Partner 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-zinc-300 tracking-wider">
            Trusted by <span className="text-white">3k+ Global Clients</span>
          </span>

          {/* Right Laurel */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/weather-R.png"
            alt="Laurel Right"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain opacity-75"
          />
        </motion.div>

        <motion.h1
          variants={variants.item}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[92px] font-bold leading-[1.05] md:leading-[1] tracking-tighter text-white mb-8 transform-gpu"
        >
          Engineering Digital <br className="hidden sm:block" />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 pb-2">
            Masterpieces
            {/* Animated Wavy Underline */}
            <div className="absolute left-[-8%] -bottom-3 w-[116%] overflow-hidden h-[33px] pointer-events-none select-none">
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
                  className="text-zinc-400 opacity-75"
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

        <motion.h2
          variants={variants.item}
          className="text-[10px] sm:text-sm md:text-base lg:text-[17px] text-zinc-500 max-w-3xl font-light leading-relaxed mb-12 px-4 tracking-[0.15em] uppercase"
        >
          Senior <span className="text-zinc-200">MERN Stack Developer</span>{" "}
          specializing in
          <br className="hidden md:block" />
          robust architectures and premium{" "}
          <span className="text-zinc-200">digital craftsmanship.</span>
        </motion.h2>

        <motion.div
          variants={variants.item}
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full sm:w-auto px-6 sm:px-0"
        >
          <button
            className="group relative px-8 py-4 bg-white rounded-full overflow-hidden transition-all duration-700 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.03)]"
            onClick={() => {
              const section = document.getElementById("projects");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[20%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-black rounded-[40%] group-hover:animate-[spin_6s_linear_infinite]" />
            <span className="relative z-10 text-black font-bold text-[10px] uppercase tracking-[0.3em] group-hover:text-white transition-colors duration-500">
              Explore Portfolio
            </span>
          </button>

          <button className="group relative px-8 py-4 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all duration-700 active:scale-95">
            <span className="absolute left-0 top-0 w-full h-[300%] -translate-y-full group-hover:-translate-y-[20%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-white rounded-[40%] group-hover:animate-[spin_6s_linear_infinite]" />
            <Link
              className="relative z-10 text-zinc-400 font-bold text-[10px] uppercase tracking-[0.3em] group-hover:text-black transition-colors duration-500"
              href="/contact"
            >
              Let's Collaborate
            </Link>
          </button>
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
        html.lenis,
        html.lenis body {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Hero;
