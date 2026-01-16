'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Cpu, Globe, ChevronLeft } from 'lucide-react';

const PremiumAbout = () => {
  const specs = [
    { icon: <Code2 size={16} />, label: "Full Stack", detail: "Next.js / TS" },
    { icon: <Cpu size={16} />, label: "Architecture", detail: "Scalable" },
    { icon: <Globe size={16} />, label: "Experience", detail: "UI/UX" },
  ];

  return (
    <section className="fixed inset-0 h-screen w-screen bg-[#030014] text-white overflow-hidden font-sans">
      
      {/* --- PREMIUM BACK BUTTON --- */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/">
          <button className="liquid-btn group relative px-5 py-2.5 overflow-hidden rounded-xl border border-white/10 backdrop-blur-md transition-all duration-700">
            <span className="relative z-30 flex items-center gap-2 text-gray-400 font-bold tracking-widest uppercase text-[9px] group-hover:text-black transition-colors duration-500">
              <ChevronLeft size={14} /> Back
            </span>
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute top-[150%] left-1/2 -translate-x-1/2 w-[180%] aspect-square bg-white rounded-[40%] transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-[-50%] group-hover:rotate-[140deg]" />
            </div>
          </button>
        </Link>
      </div>

     

      {/* 2. AMBIENT GLOWS */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40vw] h-[40vw] bg-emerald-600/10 rounded-full blur-[100px]" />
      </div>

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="relative z-20 h-full w-full flex items-center justify-center px-6 md:px-12">
        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* IMAGE SIDE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative group hidden lg:flex justify-center"
          >
            <div className="relative z-10 w-full max-w-[400px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 backdrop-blur-sm shadow-2xl transition-all duration-700 group-hover:border-blue-500/30">
              <Image 
                src="/imageee.png.jpeg" 
                alt="Abdullah Javed" 
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-[2.5rem] blur-xl opacity-50" />
          </motion.div>

          {/* TEXT SIDE */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-5 md:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-2">
              <span className="text-blue-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] block">
                About ME
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
                Abdullah <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-emerald-400">
                  Javed
                </span>
              </h1>
            </div>

            {/* DETAILED BIO PARA */}
            <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
              <p className="text-gray-300 text-sm md:text-lg lg:text-xl leading-relaxed font-light">
                I am a <span className="text-white font-medium">Bachelor of Computer Science</span> graduate and a <span className="text-blue-400 font-medium">Frontend Developer</span> dedicated to merging precise logic with artistic vision.
              </p>
              <p className="text-gray-400 text-xs md:text-base leading-relaxed font-light opacity-80">
                With a deep focus on <span className="text-white">Next.js and Framer Motion</span>, I build interfaces that aren't just functional, but emotional. I believe every pixel should serve a purpose, transforming complex data into seamless, high-performance digital journeys that captivate and convert.
              </p>
            </div>

            {/* SPECS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0">
              {specs.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md hover:border-blue-500/20 transition-colors duration-500">
                  <div className="text-blue-400 flex-shrink-0">{item.icon}</div>
                  <div className="text-left">
                    <p className="text-[8px] uppercase tracking-wider text-gray-500 font-bold">{item.label}</p>
                    <p className="text-[11px] font-medium text-gray-200">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ACTION BUTTON */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <Link href="/#projects" className="block">
                <button className="liquid-btn group relative px-10 py-5 overflow-hidden rounded-2xl border border-blue-500/30 transition-all duration-700">
                  <span className="relative z-30 flex items-center gap-3 text-blue-400 font-bold tracking-[0.2em] uppercase text-[11px] group-hover:text-white transition-colors duration-500">
                    Explore Projects <ArrowUpRight size={18} />
                  </span>
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-[150%] left-1/2 -translate-x-1/2 w-[180%] aspect-square bg-blue-600 rounded-[42%] transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-[-50%] group-hover:rotate-[140deg]" />
                  </div>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumAbout;