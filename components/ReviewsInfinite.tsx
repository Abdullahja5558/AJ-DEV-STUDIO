"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

const reviews = [
  { 
    name: "Alex Rivera", 
    role: "Product Manager", 
    text: <>Exceptional frontend work. The <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">Next.js optimization</span> improved our LCP by 40% and overall engagement.</>, 
    company: "Global Tech" 
  },
  { 
    name: "Sarah Chen", 
    role: "UI/UX Designer", 
    text: <>Translated my Figma designs into <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">pixel-perfect code</span>. The attention to detail is unmatched.</>, 
    company: "Creative Studio" 
  },
  { 
    name: "James Watt", 
    role: "Startup Founder", 
    text: <>Fixed complex <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">state management bugs</span> in hours. A true TS expert.</>, 
    company: "NextGen" 
  },
  {
    name: "Emily Davis",
    role: "CTO",
    text: <>Implemented a custom <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">SSR caching strategy</span> that reduced server costs by 30% while improving performance.</>,
    company: "Tech Innovators"  
  },
  {
    name: "Michael Johnson",
    role: "Lead Developer",
    text: <>The <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">code quality and architecture</span> are top-notch. Made onboarding new devs seamless.</>,
    company: "CodeCraft"  
  },
  {
    name: "Jessica Lee",
    role: "Project Manager",
    text: <>Delivered a complex project ahead of schedule with <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">flawless execution</span>. Communication was excellent throughout.</>,
    company: "Agile Solutions"  
  },
  {
    name: "David Kim",
    role: "Software Engineer",
    text: <>The <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">refactoring work</span> significantly improved our codebase maintainability and reduced bugs.</>,
    company: "DevWorks"  
  },
  {
    name: "Sophia Martinez",  
    role: "Design Lead",
    text: <>Brought my designs to life with <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">incredible attention to detail</span>. The animations are smooth and enhance the UX.</>,
    company: "PixelPerfect"
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
    <section className="bg-[#000000] py-24 px-6 md:px-20 overflow-hidden relative min-h-screen flex flex-col items-center selection:bg-white selection:text-black">
      
      {/* TOP TRANSITION AREA */}
      <div className="absolute top-0 left-0 w-full h-[15vh] bg-gradient-to-b from-[#030303] via-[#040404] to-transparent z-30 pointer-events-none" />

      {/* Heading Section */}
      <div className="max-w-7xl mx-auto w-full relative z-10 mt-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[0.5px] w-12 bg-zinc-800"></div>
          <span className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.6em]">
            Testimonials
          </span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase">
          Client <br />
          <span className="text-zinc-900 italic font-light">Feedback.</span>
        </h2>
      </div>

      {/* Main Review Container */}
      <div className="w-full relative mt-32 md:mt-40 flex flex-col items-center">
        
        {/* Fixed Size Container */}
        <div className="max-w-4xl w-full h-[480px] md:h-[420px] relative"> 
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex justify-center"
            >
              {/* THE GLASS CIRCLE QUOTE */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
                <div className="w-24 h-24 bg-white/[0.05] backdrop-blur-3xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-8xl font-serif text-white leading-none mt-13 select-none">
                        “
                    </span>
                </div>
              </div>

              {/* The Main Glassmorphic Card */}
              <div className="w-full h-full relative z-10 backdrop-blur-[40px] bg-white/[0.02] border border-white/10 rounded-[4rem] px-10 py-12 md:px-20 flex flex-col items-center justify-center text-center shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                {/* Stars (Golden Gold) */}
                <div className="flex gap-1.5 mb-10 mt-6 relative">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#fbbf24] fill-current drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text (Pure White) */}
                <p className="text-xl md:text-3xl font-medium text-white leading-[1.6] tracking-tight italic mb-10 max-w-2xl relative">
                  "{reviews[index].text}"
                </p>

                {/* Client Info */}
                <div className="flex flex-col items-center space-y-1 relative">
                  <div className="h-[0.5px] w-12 bg-zinc-800 mb-4" />
                  <h4 className="text-white text-xl font-bold tracking-tight">
                    {reviews[index].name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em]">
                      {reviews[index].role}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-800" />
                    <span className="text-zinc-600 text-[9px] font-medium uppercase tracking-widest">
                      {reviews[index].company}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center justify-center gap-10 mt-16 relative z-20">
          <button 
            onClick={() => slideChange(-1)}
            className="group w-14 h-14 flex items-center justify-center rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-500"
          >
            <span className="text-zinc-600 group-hover:text-white text-xl transition-colors">&larr;</span>
          </button>

          <div className="flex gap-3">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                   setDirection(i > index ? 1 : -1);
                   setIndex(i);
                }}
                className={`h-1 rounded-full transition-all duration-700 ${index === i ? 'w-12 bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'w-3 bg-zinc-900'}`} 
              />
            ))}
          </div>

          <button 
            onClick={() => slideChange(1)}
            className="group w-14 h-14 flex items-center justify-center rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-500"
          >
            <span className="text-zinc-600 group-hover:text-white text-xl transition-colors">&rarr;</span>
          </button>
        </div>
      </div>

      {/* Subtle Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      <style jsx global>{`
        ::selection {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        ::-moz-selection {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
      `}</style>
    </section>
  );
};

export default ReviewSection;