'use client';

import React, { useState, useEffect } from "react"; // Added useEffect
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLenis } from "lenis/react"; 

const navItems = [
  { name: "About", id: "01", href: "/about" },
  { name: "Skills", id: "02", href: "#skills" },
  { name: "Experience", id: "03", href: "#experience" },
  { name: "Projects", id: "04", href: "#projects" },
  { name: "Contact", id: "05", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  // --- Scroll Lock Logic Start ---
  useEffect(() => {
    if (isOpen) {
      // Background scroll disable
      document.body.style.overflow = 'hidden';
      // Stop Lenis smooth scroll
      lenis?.stop();
    } else {
      // Background scroll enable
      document.body.style.overflow = 'unset';
      // Start Lenis smooth scroll
      lenis?.start();
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      lenis?.start();
    };
  }, [isOpen, lenis]);
  // --- Scroll Lock Logic End ---

  const handleScroll = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement && lenis) {
        setIsOpen(false);
        // Chonke menu close ho raha hai, humein lenis ko pehle start karna hoga
        lenis.start();
        lenis.scrollTo(targetElement, { offset: -20, duration: 2 });
      }
    } else {
      setIsOpen(false);
    }
  };

  const menuVars: Variants = {
    initial: { 
      clipPath: "circle(0% at 90% 10%)" 
    },
    animate: { 
      clipPath: "circle(150% at 50% 50%)",
      transition: { 
        duration: 1.1, 
        ease: [0.76, 0, 0.24, 1] as any
      }
    },
    exit: { 
      clipPath: "circle(0% at 90% 10%)",
      transition: { 
        delay: 0.3, 
        duration: 0.9, 
        ease: [0.76, 0, 0.24, 1] as any
      }
    }
  };

  const linkVars: Variants = {
    initial: { y: "100%", opacity: 0 },
    animate: (idx: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + idx * 0.08,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }),
    exit: (idx: number) => ({
      y: "100%",
      opacity: 0,
      transition: {
        delay: idx * 0.03,
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as any
      }
    })
  };

  return (
    <>
      {/* --- FIXED TRIGGER --- */}
      <div className="fixed top-6 right-6 md:top-10 md:right-12 z-250">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center p-4 group bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 shadow-2xl"
        >
          <div className="flex flex-col items-end gap-1.5">
            <motion.div 
              animate={{ 
                width: isOpen ? 28 : 20, 
                backgroundColor: "#fff",
                y: isOpen ? 4 : 0,
                rotate: isOpen ? 45 : 0
              }} 
              className="h-0.5 origin-center" 
            />
            <motion.div 
              animate={{ 
                width: 28, 
                backgroundColor: isOpen ? "#fff" : "#a855f7",
                y: isOpen ? -4 : 0,
                rotate: isOpen ? -45 : 0
              }} 
              className="h-0.5 origin-center" 
            />
          </div>
        </button>
      </div>

      {/* --- THE DARK PURPLE PREMIUM MENU --- */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-200 bg-[#07030a] overflow-hidden"
          >
            {/* Multi-layered Decorative Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-900/10 blur-[120px] rounded-full" />
            
            <div className="flex flex-col h-full justify-center px-6 md:px-24 lg:px-32 relative z-10 pt-20 pb-40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 max-w-7xl mx-auto w-full">
                {navItems.map((item, idx) => (
                  <div key={item.name} className="overflow-hidden border-b border-white/5 py-3 md:py-6">
                    <motion.div
                      custom={idx}
                      variants={linkVars}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => handleScroll(e, item.href)}
                        className="group flex items-center gap-4 md:gap-6"
                      >
                        <span className="text-[10px] md:text-xs font-mono text-purple-500 font-bold opacity-50 group-hover:opacity-100 transition-opacity">
                            {item.id}
                        </span>
                        <span className="text-4xl md:text-[5vw] font-bold text-zinc-100 uppercase tracking-tighter leading-none transition-all duration-500 group-hover:text-purple-400 group-hover:translate-x-4">
                          {item.name}
                        </span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-20px] group-hover:translate-x-0 hidden sm:block">
                            <span className="text-purple-400 text-3xl md:text-4xl font-light">→</span>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Background Decorative Text */}
              <div className="absolute bottom-[-2%] right-[-2%] pointer-events-none opacity-[0.02] select-none hidden lg:block">
                  <h2 className="text-[20vw] font-black text-purple-500 leading-none uppercase">Abdullah</h2>
                  <h2 className="text-[20vw] font-black text-purple-500 leading-none uppercase -mt-20 ml-20">Javed</h2>
              </div>

              {/* Menu Footer */}
              <div className="absolute bottom-8 left-6 md:bottom-12 md:left-24 lg:left-32 flex flex-col md:flex-row gap-6 md:gap-24">
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Location</p>
                  <p className="text-xs md:text-sm font-medium text-zinc-400 uppercase">Punjab, Pakistan</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Socials</p>
                  <div className="flex gap-4 md:gap-6">
                    <button className="text-xs md:text-sm font-medium text-zinc-400 uppercase hover:text-purple-400 transition-colors">LinkedIn</button>
                    <button className="text-xs md:text-sm font-medium text-zinc-400 uppercase hover:text-purple-400 transition-colors">Github</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;