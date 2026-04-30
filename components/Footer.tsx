"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { name: "Github", slug: "gh", color: "#ffffff", href: "https://github.com/Abdullahja5558" },
  { name: "WhatsApp", slug: "wa", color: "#25D366", href: "https://wa.me/923346932540" },
  { name: "Instagram", slug: "ig", color: "#E1306C", href: "https://www.instagram.com/mian.abdullah.9/" },
  { name: "LinkedIn", slug: "li", color: "#0077B5", href: "https://www.linkedin.com/in/abdullah-javed-a2b0b0396/" },
];

export const PremiumFooter = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="relative w-full bg-black pt-24 md:pt-40 overflow-hidden flex flex-col items-center">
      
      {/* 1. MAIN CONTENT AREA */}
      <div className="w-full max-w-[1600px] px-8 md:px-16 z-20">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 border-b border-zinc-900 pb-20">
          
          {/* Big Statement Text */}
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold text-white tracking-[ -0.05em] leading-[0.85]"
            >
              LET’S BUILD <br /> 
              <span className="text-zinc-800">YOUR VISION.</span>
            </motion.h2>
          </div>

          {/* Social & Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-24 gap-y-12">
            <div className="space-y-4">
              <p className="text-zinc-600 uppercase text-[10px] tracking-[0.4em] font-bold">Socials</p>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <a key={link.slug} href={link.href} className="text-zinc-400 hover:text-white text-lg transition-all duration-300 font-medium">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-zinc-600 uppercase text-[10px] tracking-[0.4em] font-bold">Get in touch</p>
              <a href="mailto:ajdeveloperr@gmail.com" className="text-zinc-400 hover:text-white text-lg block transition-all">
                ajdeveloperr@gmail.com
              </a>
              <p className="text-zinc-500 text-sm italic font-light">Based in Fsd, PK</p>
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA */}
        <div className="flex flex-col md:flex-row justify-between items-center py-10 text-[10px] text-zinc-700 tracking-[0.3em] uppercase">
          <p>© {currentYear} — ALL RIGHTS RESERVED</p>
          <p className="mt-4 md:mt-0">EST. 2024 / ARCHITECTING DIGITAL RESILIENCE</p>
        </div>
      </div>

      {/* 2. THE CINEMATIC IMAGE SECTION (name.png) */}
      <motion.div 
        className="relative w-full overflow-hidden select-none"
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full flex items-end justify-center pointer-events-none">
          <img
            src="/name.png"
            alt="ABDULLAH"
            className="w-full h-auto max-h-[40vh] md:max-h-[85vh] object-contain object-bottom"
            style={{ 
              filter: "drop-shadow(0px -20px 50px rgba(255,255,255,0.02))",
            }}
          />
        </div>

        {/* Premium Layering: Gradient Cover to make image blend into background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 z-10" />
      </motion.div>

      {/* Decorative Light Glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[90%] h-[400px] bg-zinc-900/10 blur-[150px] rounded-full pointer-events-none" />

    </footer>
  );
};

export default PremiumFooter;