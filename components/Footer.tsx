"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SOCIAL_LINKS = [
  { name: "Github", href: "https://github.com/Abdullahja5558" },
  { name: "WhatsApp", href: "https://wa.me/923346932540" },
  { name: "Instagram", href: "https://www.instagram.com/mian.abdullah.9/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-javed-a2b0b0396/" },
];

export const PremiumFooter = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [, setIsCardHovered] = useState(false);

  return (
    <footer 
      role="contentinfo"
      aria-label="Footer"
      className="relative w-full bg-[#3B0007] flex flex-col items-center overflow-x-hidden px-4 sm:px-6 md:px-8 selection:bg-[#DEBA75] selection:text-[#3B0007]"
    >
      {/* Overlapping Champagne CTA Banner Wrapper */}
      <div className="w-full max-w-[1400px] pt-12 sm:pt-20 md:pt-28 z-30">
        <div 
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
          className="relative w-full bg-[#FAF4EC] rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border border-[#DEBA75]/30 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 sm:gap-10 overflow-hidden mb-12 sm:mb-20 group"
        >
          {/* Earth Image Background */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 select-none pointer-events-none opacity-[0.05] sm:opacity-[0.08] lg:opacity-90 z-0">
            <Image 
              src="/earth.png" 
              alt="Global Developer Network" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center lg:object-left scale-105"
            />
            <div className="absolute inset-0 lg:inset-y-0 lg:left-0 lg:w-1/3 bg-gradient-to-t lg:bg-gradient-to-r from-[#FAF4EC] to-transparent" />
          </div>

          {/* Banner Text & Button */}
          <div className="relative z-10 max-w-xl space-y-5 sm:space-y-7 text-[#3B0007] w-full text-left">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] uppercase text-[#3B0007] !bg-transparent">
                Ready to build <br />
                something legendary?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#5C0A15] font-normal leading-relaxed max-w-md !bg-transparent">
                Combining smooth, high-fidelity user experiences with secure and robust backend architectures.
              </p>
            </div>
            
            <Link href="/contact" className="inline-block" aria-label="Get Started with AJ Developer">
              <button 
                type="button"
                className="relative overflow-hidden px-6 sm:px-8 py-3 sm:py-3.5 bg-[#3B0007] text-[#FAF4EC] text-[9px] sm:text-[10px] tracking-[0.3em] font-mono font-bold uppercase rounded-full transition-all duration-300 active:scale-95 cursor-pointer group/btn"
              >
                <span className="absolute inset-0 w-full h-full bg-[#DEBA75] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] origin-left z-0 rounded-full" />
                <span className="relative z-10 transition-colors duration-500 text-[#FAF4EC] group-hover/btn:text-[#3B0007]">
                  Get Started
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Layout */}
      <div className="w-full max-w-[1400px] z-20 pt-2 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-8 pb-12 sm:pb-16">
          
          {/* Left Column: Brand Logo, Location, Contact Info */}
          <div className="col-span-12 lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#DEBA75]" />
              <span className="text-lg font-black tracking-[0.25em] text-[#FAF4EC] uppercase">AJ.DEV</span>
            </div>

            <p className="text-[#D4C3B3] text-xs sm:text-sm font-light leading-relaxed uppercase tracking-wider">
              Punjab, Pakistan • Open for Global Remote Opportunities
            </p>

            {/* Email & Phone Details Column */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 pt-2 font-mono w-full">
              <div>
                <p className="text-[#DEBA75]/70 text-[9px] uppercase tracking-widest mb-2 font-bold">[ Phone number ]</p>
                <a href="tel:+923346932540" className="text-xs text-[#FAF4EC] hover:text-[#DEBA75] transition-colors duration-300">
                  +92 371 5909509
                </a>
              </div>
              <div>
                <p className="text-[#DEBA75]/70 text-[9px] uppercase tracking-widest mb-2 font-bold">[ Email Address ]</p>
                <a href="mailto:ajdeveloperr@gmail.com" className="text-xs text-[#FAF4EC] hover:text-[#DEBA75] transition-colors duration-300">
                  ajdeveloperr@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Columns: Segmented Links */}
          <div className="col-span-12 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Quick links */}
            <div className="space-y-4">
              <p className="text-[#DEBA75] text-[10px] tracking-[0.2em] font-mono uppercase font-bold">Quick links</p>
              <nav aria-label="Footer Quick Links" className="flex flex-col gap-3">
                <Link href="/" className="text-[#D4C3B3] hover:text-[#DEBA75] text-xs uppercase tracking-wider transition-colors duration-300 w-fit">
                  Home
                </Link>
                <Link href="/about" className="text-[#D4C3B3] hover:text-[#DEBA75] text-xs uppercase tracking-wider transition-colors duration-300 w-fit">
                  About
                </Link>
                <Link href="/contact" className="text-[#D4C3B3] hover:text-[#DEBA75] text-xs uppercase tracking-wider transition-colors duration-300 w-fit">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Column 2: Social */}
            <div className="space-y-4">
              <p className="text-[#DEBA75] text-[10px] tracking-[0.2em] font-mono uppercase font-bold">Social</p>
              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4C3B3] hover:text-[#DEBA75] text-xs uppercase tracking-wider transition-colors duration-300 w-fit"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Services */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <p className="text-[#DEBA75] text-[10px] tracking-[0.2em] font-mono uppercase font-bold">Expertise</p>
              <div className="flex flex-col gap-3 text-xs text-[#D4C3B3]">
                <span className="uppercase tracking-wider">Next.js & React</span>
                <span className="uppercase tracking-wider">MERN Full-Stack</span>
                <span className="uppercase tracking-wider">UI/UX Animation</span>
                <span className="uppercase tracking-wider">SEO Architecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights divider */}
        <div className="border-t border-[#DEBA75]/15 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] text-[#DEBA75]/50 tracking-[0.3em] uppercase font-mono">
          <p>© {currentYear} AJ.DEV. All rights reserved.</p>
        </div>
      </div>

      {/* Giant AJ.DEV Decorative Watermark */}
      <div 
        aria-hidden="true" 
        className="relative w-full overflow-hidden select-none flex justify-center items-end pointer-events-none mt-2 sm:mt-4 z-10"
      >
        <div 
          className="font-black leading-[0.72] uppercase tracking-tighter text-center whitespace-nowrap select-none font-sans -mb-[1.5vw] bg-clip-text text-transparent bg-gradient-to-b from-[#FAF4EC]/20 via-[#DEBA75]/10 to-transparent"
          style={{ fontSize: "clamp(4rem, 21vw, 24rem)" }}
        >
          AJ.DEV
        </div>

        {/* Side Overlays */}
        <div className="absolute inset-y-0 left-0 w-[15vw] sm:w-[25vw] md:w-[30vw] bg-gradient-to-r from-[#3B0007] via-[#3B0007]/85 to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-[15vw] sm:w-[25vw] md:w-[30vw] bg-gradient-to-l from-[#3B0007] via-[#3B0007]/85 to-transparent pointer-events-none z-20" />
      </div>
    </footer>
  );
};

export default PremiumFooter;