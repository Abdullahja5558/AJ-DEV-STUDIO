'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code2, Cpu, Globe, ChevronLeft, Award, X } from 'lucide-react';
import Lenis from 'lenis';

const PremiumAbout = () => {
  const [showCerts, setShowCerts] = useState(false);
  const [selectedCert, setSelectedCert] = useState<{ id: number; src: string; title: string; } | null>(null);

 
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const specs = [
    { icon: <Code2 size={16} />, label: "Full Stack", detail: "Next.js / TS" },
    { icon: <Cpu size={16} />, label: "Architecture", detail: "Scalable" },
    { icon: <Globe size={16} />, label: "Experience", detail: "UI/UX" },
  ];

  const certificates = [
    { id: 1, src: '/certificate1.png', title: 'Professional Certification 1' },
    { id: 2, src: '/certificate2.png', title: 'Advanced Development' },
    { id: 3, src: '/certificate3.png', title: 'UI/UX Mastery' },
    { id: 4, src: '/certificate4.png', title: 'Cloud Architecture' },
  ];

  return (
   
    <section className="relative min-h-screen w-full bg-[#030014] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      
     
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <button className="liquid-btn group relative px-5 py-2.5 overflow-hidden rounded-xl border border-white/10 backdrop-blur-md transition-all duration-700">
            <span className="relative z-30 flex items-center gap-2 text-gray-400 font-bold tracking-widest uppercase text-[9px] group-hover:text-black transition-colors duration-500">
              <ChevronLeft size={14} /> Back
            </span>
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute top-[150%] left-1/2 -translate-x-1/2 w-[180%] aspect-square bg-white rounded-[40%] transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-[-50%] group-hover:rotate-140" />
            </div>
          </button>
        </Link>
      </div>

      
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[100px] will-change-transform" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40vw] h-[40vw] bg-emerald-600/10 rounded-full blur-[100px] will-change-transform" />
      </div>

      
      <div className="relative z-20 min-h-screen w-full flex items-center justify-center px-6 py-20 md:py-0 md:px-12">
        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
         
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="lg:col-span-5 relative group hidden lg:flex justify-center"
          >
            <div className="relative z-10 w-full max-w-100 aspect-4/5 rounded-[2.5rem] overflow-hidden border border-white/10 backdrop-blur-sm shadow-2xl transition-all duration-700 group-hover:border-blue-500/30">
              <Image 
                src="/imageee.png.jpeg" 
                alt="Abdullah Javed" 
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#030014] via-transparent to-transparent opacity-60" />
            </div>
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600/20 to-emerald-600/20 rounded-[2.5rem] blur-xl opacity-50" />
          </motion.div>

         
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-3">
              <span className="text-blue-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] block">
                About ME
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] lg:leading-[0.85]">
                Abdullah <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-blue-400 to-emerald-400">
                  Javed
                </span>
              </h1>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
              <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed font-light">
                I am a <span className="text-white font-medium">Bachelor of Computer Science</span> graduate and a <span className="text-blue-400 font-medium">Frontend Developer</span> dedicated to merging precise logic with artistic vision.
              </p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light opacity-80">
                With a deep focus on <span className="text-white">Next.js and Framer Motion</span>, I build interfaces that aren't just functional, but emotional.
              </p>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0">
              {specs.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md hover:border-blue-500/40 transition-all duration-500 group">
                  <div className="text-blue-400 shrink-0 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div className="text-left">
                    <p className="text-[8px] uppercase tracking-wider text-gray-500 font-bold">{item.label}</p>
                    <p className="text-[11px] font-medium text-gray-200">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

           
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link href="/#projects">
                <button className="liquid-btn group relative px-8 py-4 overflow-hidden rounded-3xl border border-blue-500/30 transition-all duration-700">
                  <span className="relative z-30 flex items-center gap-3 text-blue-400 font-bold tracking-[0.2em] uppercase text-[11px] group-hover:text-white transition-colors duration-500">
                    Explore Projects <ArrowUpRight size={18} />
                  </span>
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-[150%] left-1/2 -translate-x-1/2 w-[180%] aspect-square bg-blue-600 rounded-[42%] transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-[-50%] group-hover:rotate-140" />
                  </div>
                </button>
              </Link>

              <button 
                onClick={() => setShowCerts(true)}
                className="liquid-btn group relative px-8 py-4 overflow-hidden rounded-3xl border border-emerald-500/30 transition-all duration-700">
                <span className="relative z-30 flex items-center gap-3 text-emerald-400 font-bold tracking-[0.2em] uppercase text-[11px] group-hover:text-white transition-colors duration-500">
                  Certificates <Award size={18} />
                </span>
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="absolute top-[150%] left-1/2 -translate-x-1/2 w-[180%] aspect-square bg-emerald-600 rounded-[42%] transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-[-50%] group-hover:rotate-140" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      
      <AnimatePresence>
        {showCerts && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-10 bg-[#030014]/95 backdrop-blur-2xl"
          >
            <div className="absolute inset-0" onClick={() => setShowCerts(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 premium-scroll"
            >
              <button 
                onClick={() => setShowCerts(false)}
                className="absolute top-6 right-6 z-110 p-3 rounded-full bg-white/10 hover:bg-red-500/20 text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">My <span className="text-emerald-400">Certifications</span></h2>
                <div className="w-24 h-1 bg-emerald-500/50 mx-auto mt-4 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {certificates.map((cert) => (
                  <motion.div 
                    key={cert.id} 
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedCert(cert)}
                    className="relative group rounded-3xl overflow-hidden border border-white/10 bg-black/40 aspect-video cursor-zoom-in transition-all duration-500 hover:border-emerald-500/30"
                  >
                    <Image 
                      src={cert.src} 
                      alt={cert.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                      <p className="text-white font-bold tracking-widest uppercase text-xs transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        {cert.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

     
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-20"
            onClick={() => setSelectedCert(null)}
          >
            <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-all hover:rotate-90">
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full max-w-6xl"
            >
              <Image 
                src={selectedCert.src} 
                alt={selectedCert.title}
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* LENIS REQUIRED CSS */
        html.lenis {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }

        /* Custom Premium Scrollbar */
        .premium-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .premium-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          margin: 30px;
          border-radius: 10px;
        }
        .premium-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #3b82f6);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .premium-scroll::-webkit-scrollbar-thumb:hover {
          background: #10b981;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </section>
  );
};

export default PremiumAbout;