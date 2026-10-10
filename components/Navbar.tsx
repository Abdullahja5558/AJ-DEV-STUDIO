'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLenis } from "lenis/react"; 

const navItems = [
  { name: "About", id: "01", href: "/about" },
  { name: "Skills", id: "02", href: "/#skills" },
  { name: "Experience", id: "03", href: "/#experience" },
  { name: "Projects", id: "04", href: "/#projects" },
  { name: "Contact", id: "05", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      lenis?.start();
    };
  }, [isOpen, lenis]);

  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent, href: string) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex !== -1) {
      const hash = href.substring(hashIndex);
      const isHomePage = pathname === "/";
      if (isHomePage) {
        e.preventDefault();
        const targetElement = document.getElementById(hash.replace("#", ""));
        if (targetElement && lenis) {
          setIsOpen(false);
          lenis.start();
          lenis.scrollTo(targetElement, { offset: -20, duration: 2 });
        }
      } else {
        setIsOpen(false);
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
      <div className="fixed top-6 right-6 md:top-10 md:right-12 z-[300]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-controls="navigation-menu"
          className="flex items-center justify-center p-4 group bg-[#3B0007] rounded-full border border-[#DEBA75]/40 hover:border-[#DEBA75] transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col items-end gap-1.5" aria-hidden="true">
            <motion.div 
              animate={{ 
                width: isOpen ? 26 : 20, 
                backgroundColor: isOpen ? "#DEBA75" : "#FAF4EC",
                y: isOpen ? 4 : 0,
                rotate: isOpen ? 45 : 0
              }} 
              className="h-0.5 origin-center" 
            />
            <motion.div 
              animate={{ 
                width: 26, 
                backgroundColor: isOpen ? "#DEBA75" : "#DEBA75",
                y: isOpen ? -4 : 0,
                rotate: isOpen ? -45 : 0
              }} 
              className="h-0.5 origin-center" 
            />
          </div>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            id="navigation-menu"
            role="navigation"
            aria-label="Main Navigation"
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[250] bg-[#3B0007] overflow-hidden"
            style={{ backgroundColor: "#3B0007" }}
          >
            <div className="flex flex-col h-full justify-center px-6 md:px-24 lg:px-32 relative z-10 pt-20 pb-40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 max-w-7xl mx-auto w-full">
                {navItems.map((item, idx) => (
                  <div key={item.name} className="overflow-hidden border-b border-[#DEBA75]/15 py-3 md:py-6">
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
                        <span className="text-[10px] md:text-xs font-mono text-[#DEBA75]/60 font-bold opacity-60 group-hover:opacity-100 group-hover:text-[#DEBA75] transition-all">
                          {item.id}
                        </span>
                        <span className="text-4xl md:text-[5vw] font-black text-[#FAF4EC] uppercase tracking-tighter leading-none transition-all duration-300 group-hover:text-[#DEBA75] group-hover:translate-x-3">
                          {item.name}
                        </span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-5 group-hover:translate-x-0 hidden sm:block">
                          <span className="text-[#DEBA75] text-3xl md:text-4xl font-light" aria-hidden="true">→</span>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Menu Footer */}
              <div className="absolute bottom-8 left-6 md:bottom-12 md:left-24 lg:left-32 flex flex-col md:flex-row gap-6 md:gap-24">
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#DEBA75]/50 font-bold">Location</p>
                  <p className="text-xs md:text-sm font-medium text-[#D4C3B3] uppercase">Punjab, Pakistan</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#DEBA75]/50 font-bold">Socials</p>
                  <div className="flex gap-4 md:gap-6">
                    <a href="https://www.linkedin.com/in/abdullah-javed-a2b0b0396/" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-medium text-[#D4C3B3]/70 uppercase hover:text-[#DEBA75] transition-colors" aria-label="Abdullah Javed LinkedIn Profile">LinkedIn</a>
                    <a href="https://github.com/Abdullahja5558" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-medium text-[#D4C3B3]/70 uppercase hover:text-[#DEBA75] transition-colors" aria-label="Abdullah Javed GitHub Profile">GitHub</a>
                    <a href="https://www.instagram.com/mian.abdullah.9/" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-medium text-[#D4C3B3]/70 uppercase hover:text-[#DEBA75] transition-colors" aria-label="Abdullah Javed Instagram Profile">Instagram</a>
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