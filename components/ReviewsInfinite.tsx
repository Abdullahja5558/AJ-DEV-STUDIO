"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

const reviews = [
  { 
    name: "Alex Rivera", 
    role: "Product Manager", 
    text: <>Exceptional frontend work. The <span className="bg-cyan-400 text-black px-2 py-0.5 rounded-sm font-bold">Next.js optimization</span> improved our LCP by 40% and overall engagement.</>, 
    company: "Global Tech" 
  },
  { 
    name: "Sarah Chen", 
    role: "UI/UX Designer", 
    text: <>Translated my Figma designs into <span className="bg-cyan-400 text-black px-2 py-0.5 rounded-sm font-bold">pixel-perfect code</span>. The attention to detail is unmatched.</>, 
    company: "Creative Studio" 
  },
  { 
    name: "James Watt", 
    role: "Startup Founder", 
    text: <>Fixed complex <span className="bg-cyan-400 text-black px-2 py-0.5 rounded-sm font-bold">state management bugs</span> in hours. A true TS expert who understands business.</>, 
    company: "NextGen" 
  },
  {
    name: "Emily Davis",
    role: "CTO",
    text: <>Implemented a custom <span className="bg-cyan-400 text-black px-2 py-0.5 rounded-sm font-bold">SSR caching strategy</span> that reduced server costs by 30% while improving performance.</>,
    company: "Tech Innovators"  
  },
  {
    name: "Michael Lee",
    role: "Lead Developer",
    text: <>The <span className="bg-cyan-400 text-black px-2 py-0.5 rounded-sm font-bold">Three.js integration</span> created an immersive experience that wowed our users and boosted retention.</>,
    company: "Interactive Media"  
    
  },
  {
    name: "Sophia Martinez",
    role: "Design Lead",
    text: <>Brought my complex designs to life with <span className="bg-cyan-400 text-black px-2 py-0.5 rounded-sm font-bold">clean, maintainable code</span>. A pleasure to work with.</>,
    company: "Creative Vision"
  },
  {
    name: "David Kim",  
    role: "Engineering Manager",
    text: <>Handled a critical <span className="bg-cyan-400 text-black px-2 py-0.5 rounded-sm font-bold">migration to TypeScript</span> seamlessly, improving our codebase quality and developer confidence.</>,
    company: "Global Solutions"
  },
  {
    name: "Olivia Brown",
    role: "Product Owner",
    text: <>The <span className="bg-cyan-400 text-black px-2 py-0.5 rounded-sm font-bold">performance optimizations</span> made a noticeable difference in our app's responsiveness and user satisfaction.</>,
    company: "NextGen Systems"
  },
];

const ReviewSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const slideChange = (newDir: number) => {
    setDirection(newDir);
    setIndex((prev) => (prev + newDir + reviews.length) % reviews.length);
  };

  return (
    <section className="bg-[#030616] py-24 md:py-32 px-6 md:px-20 overflow-hidden relative min-h-screen flex flex-col justify-center">
      
      {/* Heading Section - Preserved */}
      <div className="max-w-7xl mx-auto mb-10 w-full relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-cyan-500"></div>
          <span className="text-cyan-400 text-[11px] font-black uppercase tracking-[0.6em]">
            Testimonials
          </span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
          Client <br />
          <span className="text-white/10 uppercase">Feedback.</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto w-full relative pt-32 md:pt-40"> {/* Pushed Content Down */}
        
        {/* Floating Premium Quote Icon */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 md:top-4 -left-4 md:-left-24 pointer-events-none z-0"
        >
          <span className="text-[200px] md:text-[350px] font-serif leading-none bg-gradient-to-b from-cyan-500/20 to-transparent bg-clip-text text-transparent opacity-40">
            “
          </span>
        </motion.div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-16 md:gap-24 items-center relative z-10">
          
          {/* Left Side: Animated Review Text */}
          <div className="relative min-h-[250px] flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: direction > 0 ? 30 : -30, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: direction > 0 ? -30 : 30, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: "circOut" }}
              >
                 <p className="text-3xl md:text-5xl font-extralight text-white leading-[1.2] tracking-tight italic">
                   {reviews[index].text}
                 </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Glassmorphism Client Info */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative p-10 md:p-12 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-[3.5rem] shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
                
                <div className="relative z-10 space-y-6">
                  <div>
                    <h4 className="text-white text-3xl font-bold tracking-tighter mb-1">
                      {reviews[index].name}
                    </h4>
                    <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]">
                      {reviews[index].role}
                    </p>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent" />

                  <div className="flex items-center justify-between">
                    <span className="text-white/60 font-medium text-xs tracking-wider"> {reviews[index].company}</span>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                       <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee]" />
                       <span className="text-cyan-400 text-[8px] font-bold uppercase tracking-widest">Verified</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CENTERED CONTROLS (Shifted to Center) */}
        <div className="flex flex-col items-center justify-center gap-8 mt-24 md:mt-32 relative z-20">
          <div className="flex items-center gap-12">
            <button 
              onClick={() => slideChange(-1)}
              className="group relative w-16 h-16 flex items-center justify-center rounded-full border border-white/10 hover:border-cyan-500/50 transition-all duration-500 bg-[#030616]"
            >
              <span className="text-white text-2xl font-light group-hover:text-cyan-400 transition-all">&lt;</span>
              <div className="absolute inset-0 bg-cyan-400/5 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500" />
            </button>

          

            <button 
              onClick={() => slideChange(1)}
              className="group relative w-16 h-16 flex items-center justify-center rounded-full border border-white/10 hover:border-cyan-500/50 transition-all duration-500 bg-[#030616]"
            >
              <span className="text-white text-2xl font-light group-hover:text-cyan-400 transition-all">&gt;</span>
              <div className="absolute inset-0 bg-cyan-400/5 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500" />
            </button>
          </div>
          
          {/* Subtle decoration under buttons */}
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
    </section>
  );
};

export default ReviewSection;