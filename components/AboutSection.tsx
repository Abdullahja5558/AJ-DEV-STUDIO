'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code2, Cpu, Globe, ChevronLeft, Award, X } from 'lucide-react';

export const AboutSection = () => {
  const [showCerts, setShowCerts] = useState(false);
  const [selectedCert, setSelectedCert] = useState<{ id: number; src: string; title: string; } | null>(null);

  const specs = [
    { icon: <Code2 size={16} />, label: "Full Stack", detail: "Next.js / TS / MERN" },
    { icon: <Cpu size={16} />, label: "Architecture", detail: "Scalable & Fast" },
    { icon: <Globe size={16} />, label: "Experience", detail: "UI/UX & SEO" },
  ];

  const certificates = [
    { id: 1, src: '/certificate1.png', title: 'Professional Certification 1' },
    { id: 2, src: '/certificate2.png', title: 'Advanced Development' },
    { id: 3, src: '/certificate3.png', title: 'UI/UX Mastery' },
    { id: 4, src: '/certificate4.png', title: 'Cloud Architecture' },
  ];

  return (
    <section 
      aria-label="About Abdullah Javed"
      className="relative min-h-screen w-full bg-[#3B0007] text-[#FAF4EC] overflow-x-hidden font-sans selection:bg-[#DEBA75] selection:text-[#3B0007]"
    >
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" aria-label="Return to Homepage">
          <button 
            type="button"
            className="liquid-btn group relative px-5 py-2.5 overflow-hidden rounded-xl border border-[#DEBA75]/30 backdrop-blur-md transition-all duration-700 cursor-pointer bg-[#3B0007]/50"
          >
            <span className="relative z-30 flex items-center gap-2 text-[#DEBA75] font-bold tracking-widest uppercase text-[9px] group-hover:text-[#3B0007] transition-colors duration-500">
              <ChevronLeft size={14} /> Back
            </span>
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute top-[150%] left-1/2 -translate-x-1/2 w-[180%] aspect-square bg-[#DEBA75] rounded-[40%] transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-[-50%] group-hover:rotate-140" />
            </div>
          </button>
        </Link>
      </div>

      <div className="relative z-20 min-h-screen w-full flex items-center justify-center px-6 py-20 md:py-0 md:px-12">
        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="lg:col-span-5 relative group hidden lg:flex justify-center"
          >
            <div className="relative z-10 w-full max-w-100 aspect-4/5 rounded-[2.5rem] overflow-hidden border border-[#DEBA75]/25 transition-all duration-700 group-hover:border-[#DEBA75]/60 grayscale hover:grayscale-0">
              <Image 
                src="/about.jpeg" 
                alt="Abdullah Javed (AJ) - Full Stack Developer" 
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B0007]/90 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-3">
              <span className="text-[#DEBA75] text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] block">
                About The Engineer
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] lg:leading-[0.85] uppercase text-[#FAF4EC]">
                Abdullah <br />
                <span className="font-outline-about italic font-light text-transparent">
                  Javed
                </span>
              </h1>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
              <p className="text-[#D4C3B3] text-base md:text-lg lg:text-xl leading-relaxed font-light">
                I am a <strong className="text-[#FAF4EC] font-semibold">Bachelor of Computer Science</strong> graduate and a <strong className="text-[#DEBA75] font-semibold">Senior Full-Stack MERN & Next.js Developer</strong> dedicated to merging precise software architecture with high-converting digital aesthetics.
              </p>
              <p className="text-[#D4C3B3]/80 text-sm md:text-base leading-relaxed font-light">
                Specializing in <span className="text-[#DEBA75] font-medium">Next.js 16, React 19, TypeScript, Node.js, MongoDB, and Framer Motion</span>, I engineer lightning-fast, SEO-optimized web applications with seamless user journeys.
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0">
              {specs.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-[#2E0006] border border-[#DEBA75]/15 hover:border-[#DEBA75]/50 transition-all duration-300 group">
                  <div className="text-[#DEBA75] shrink-0 group-hover:text-[#FAF4EC] group-hover:scale-110 transition-all">{item.icon}</div>
                  <div className="text-left">
                    <p className="text-[8px] uppercase tracking-wider text-[#DEBA75]/70 font-bold">{item.label}</p>
                    <p className="text-[11px] font-medium text-[#FAF4EC]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link href="/#projects" aria-label="Explore Selected Projects">
                <button 
                  type="button"
                  className="liquid-btn group relative px-8 py-4 overflow-hidden rounded-3xl bg-[#FAF4EC] border border-[#FAF4EC] transition-all duration-700 cursor-pointer"
                >
                  <span className="relative z-30 flex items-center gap-3 text-[#3B0007] font-black tracking-[0.2em] uppercase text-[11px] group-hover:text-[#FAF4EC] transition-colors duration-500">
                    Explore Projects <ArrowUpRight size={18} />
                  </span>
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-[150%] left-1/2 -translate-x-1/2 w-[180%] aspect-square bg-[#3B0007] rounded-[42%] transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-[-50%] group-hover:rotate-140" />
                  </div>
                </button>
              </Link>

              <button 
                type="button"
                onClick={() => setShowCerts(true)}
                aria-label="View Certifications"
                className="liquid-btn group relative px-8 py-4 overflow-hidden rounded-3xl bg-transparent border border-[#DEBA75]/60 transition-all duration-700 cursor-pointer"
              >
                <span className="relative z-30 flex items-center gap-3 text-[#FAF4EC] font-black tracking-[0.2em] uppercase text-[11px] group-hover:text-[#3B0007] transition-colors duration-500">
                  Certificates <Award size={18} />
                </span>
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="absolute top-[150%] left-1/2 -translate-x-1/2 w-[180%] aspect-square bg-[#DEBA75] rounded-[42%] transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-[-50%] group-hover:rotate-140" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Certifications Modal */}
      <AnimatePresence>
        {showCerts && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-[#3B0007]/95"
          >
            <div className="absolute inset-0" onClick={() => setShowCerts(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#3B0007] border border-[#DEBA75]/25 rounded-[2.5rem] p-8 md:p-12 premium-scroll"
            >
              <button 
                type="button"
                onClick={() => setShowCerts(false)}
                aria-label="Close Certifications Modal"
                className="absolute top-6 right-6 z-110 p-3 rounded-full bg-[#DEBA75]/10 hover:bg-[#DEBA75]/30 text-[#DEBA75] transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-[#FAF4EC]">My <span className="text-[#DEBA75]">Certifications</span></h2>
                <div className="w-12 h-[1px] bg-[#DEBA75]/40 mx-auto mt-4 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {certificates.map((cert) => (
                  <motion.div 
                    key={cert.id} 
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedCert(cert)}
                    className="relative group rounded-3xl overflow-hidden border border-[#DEBA75]/20 bg-[#2E0006] aspect-video cursor-zoom-in transition-all duration-500 hover:border-[#DEBA75]/60"
                  >
                    <Image 
                      src={cert.src} 
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3B0007]/95 via-transparent to-transparent flex items-end p-8">
                      <p className="text-[#FAF4EC] font-bold tracking-widest uppercase text-[10px] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
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

      {/* Full Image Preview */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#3B0007]/98 flex items-center justify-center p-4 md:p-20"
            onClick={() => setSelectedCert(null)}
          >
            <button 
              type="button"
              aria-label="Close Image Preview"
              className="absolute top-10 right-10 text-[#DEBA75] hover:text-[#FAF4EC] transition-all hover:rotate-90 cursor-pointer"
            >
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
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .font-outline-about {
          -webkit-text-stroke: 1.5px rgba(222, 186, 117, 0.4);
        }
        .premium-scroll::-webkit-scrollbar { width: 4px; }
        .premium-scroll::-webkit-scrollbar-track { background: transparent; }
        .premium-scroll::-webkit-scrollbar-thumb {
          background: #DEBA75;
          border-radius: 10px;
        }
        .premium-scroll::-webkit-scrollbar-thumb:hover { background: #FAF4EC; }
      `}</style>
    </section>
  );
};

export default AboutSection;
