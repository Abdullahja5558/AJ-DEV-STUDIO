'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; 
import { useLenis } from "lenis/react"; 

const navItems = [
  { name: "About", href: "/about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  
  const lenis = useLenis();

  
  const handleScroll = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement && lenis) {
        lenis.scrollTo(targetElement, {
          offset: -20,
          duration: 2.5, 
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
          lock: true, 
        });
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-100 flex justify-center pt-1 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-auto relative flex items-center justify-between px-8 md:px-10 rounded-full transition-all duration-700 ease-in-out",
          "border border-white/8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
          "bg-black/15 backdrop-blur-2xl",
          isScrolled ? "w-[92%] md:w-197.5 py-1" : "w-full md:w-235 py-3"
        )}
      >
        
        <div className="absolute inset-0 rounded-full bg-linear-to-tr from-white/5 via-transparent to-white/2 pointer-events-none hidden md:block" />
        
       
        <div className="absolute inset-0 rounded-full opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] hidden md:block" />

        
        <Link href="/" className="relative z-110 group flex items-center gap-2">
          <div className="text-2xl font-bold tracking-[0.15em] text-white transition-all duration-500 group-hover:tracking-[0.25em]">
            AJ
          </div>
          <div className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_15px_#a855f7] transition-all group-hover:bg-blue-400 group-hover:shadow-[#60a5fa]" />
        </Link>

        
        <div className="hidden md:flex items-center gap-3 relative z-10">
          {navItems.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-5 py-2.5 text-sm font-medium text-white/60 transition-colors duration-500 hover:text-white"
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    layoutId="nav-hover-bg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 z-[-1] rounded-full bg-white/[0.07] border border-white/10 shadow-inner"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
              </AnimatePresence>
              {item.name}
            </Link>
          ))}
        </div>

      
        <div className="hidden md:block relative z-10">
          <button 
            onClick={(e) => handleScroll(e, "#contact")}
            className="px-7 py-3 rounded-full bg-white text-black text-[11px] font-black tracking-widest hover:bg-transparent hover:text-white border border-white transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            HIRE ME
          </button>
        </div>

        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-110 flex flex-col gap-1.5 p-2 active:scale-90 transition-transform"
        >
          <motion.div animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }} className="w-6 h-[1.5px] bg-white" />
          <motion.div animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-4 h-[1.5px] bg-white/70 self-end" />
          <motion.div animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }} className="w-6 h-[1.5px] bg-white" />
        </button>

        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 h-screen w-screen bg-[#030014] z-100 flex flex-col justify-center px-12 md:hidden pointer-events-auto touch-none"
            >
              <div className="absolute top-0 right-0 w-75 h-75 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="flex flex-col gap-8 relative z-10">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx + 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleScroll(e, item.href)}
                      className="text-5xl font-black tracking-tighter text-white active:text-purple-500 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-10"
                >
                  <button 
                    onClick={(e) => handleScroll(e, "#contact")}
                    className="text-xl font-bold text-purple-500 border-b-2 border-purple-500 pb-2 tracking-widest inline-block bg-transparent"
                  >
                    START A PROJECT →
                  </button>
                </motion.div>
              </div>

              <div className="absolute bottom-12 left-12">
                <p className="text-white/20 text-[10px] tracking-[0.5em] uppercase font-bold">Based in Pakistan</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
     
      <div className={cn(
        "absolute transition-all duration-1000 -bottom-2.5 left-1/2 -translate-x-1/2 h-px bg-linear-to-r from-transparent via-purple-500/40 to-transparent blur-md hidden md:block",
        isScrolled ? "w-[20%]" : "w-[40%]"
      )} />
    </header>
  );
};

export default Navbar;