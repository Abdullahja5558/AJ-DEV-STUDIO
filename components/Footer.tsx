"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { name: "Github", slug: "gh", color: "#06b6d4", href: "https://github.com/Abdullahja5558" },
 
  { name: "WhatsApp", slug: "wa", color: "#25D366", href: "https://wa.me/923346932540?text=Hello%20AJ,%20I'd%20like%20to%20discuss%20a%20project." },
  { name: "Instagram", slug: "ig", color: "#c51dd1", href: "https://www.instagram.com/mian.abdullah.9/" },
  { name: "Mail", slug: "em", color: "#fffcff", href: "mailto:abdullahjaved5558@gmail.com" },
];

export const PremiumFooter = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Memoize metadata to prevent re-renders of static text
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer 
      className="relative min-h-screen w-full bg-[#05001a] overflow-hidden flex flex-col justify-between py-32 px-8 pb-12"
      id="footer"
      style={{ contentVisibility: 'auto' }}
    >
      {/* 1. CLEAN BACKGROUND WITH SUBTLE GLOW */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-cyan-500/3 rounded-full blur-[120px] transform-gpu" 
          style={{ backfaceVisibility: 'hidden' }}
        />
      </div>

      {/* 2. SIGNATURE ZONE - TOP */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-4 mb-2">
             <div className="h-px w-8 bg-cyan-500/50" />
             <span className="text-[10px] tracking-[1em] text-cyan-500/50 font-bold uppercase">SIGNATURE</span>
             <div className="h-px w-8 bg-cyan-500/50" />
          </div>
          <h2 className="text-6xl md:text-6xl font-black tracking-tighter text-white leading-tight">
            Made with care by <br />
            <span className="text-white/10 italic">AJ</span>
          </h2>
        </motion.div>
      </div>

      {/* 3. INTERACTIVE GLASS ZONE - MIDDLE */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-12 transform-gpu">
        <div className="relative w-full max-w-5xl h-75 flex items-center justify-center">
          
          <motion.div 
            className="absolute inset-0 rounded-[2.5rem] border border-white/3 bg-white/1 backdrop-blur-2xl flex items-center justify-center overflow-hidden transform-gpu"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ isolation: 'isolate' }}
          >
            <div className="relative w-full h-full flex items-center justify-around px-12 flex-wrap gap-8 md:gap-0">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.slug}
                  href={link.href}
                  target={link.slug === "wa" || link.slug === "gh" ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredNode(link.slug)}
                  onMouseLeave={() => setHoveredNode(null)}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="group relative flex flex-col items-center gap-6 transform-gpu will-change-transform"
                >
                  <div className="relative">
                    {/* Glowing Core */}
                    <motion.div 
                      animate={{
                        boxShadow: hoveredNode === link.slug ? `0 0 50px ${link.color}` : "0 0 15px rgba(255,255,255,0.05)",
                        backgroundColor: hoveredNode === link.slug ? link.color : "rgba(255,255,255,0.1)"
                      }}
                      className="w-5 h-5 rounded-full transition-all duration-500" 
                    />
                    
                    <motion.div 
                      animate={{ scale: hoveredNode === link.slug ? [1, 1.4, 1] : 1 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="absolute inset-0 border border-white/10 rounded-full pointer-events-none transform-gpu"
                    />
                  </div>
                  
                  <span className={`text-[11px] uppercase tracking-[0.5em] font-black transition-all duration-500 select-none ${hoveredNode === link.slug ? 'text-white' : 'text-white/20'}`}>
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. CONNECTION ZONE - BOTTOM */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-12">
          
          <div className="flex flex-col items-center md:items-start gap-4">
             <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
                Let’s build the future together.
             </p>
             <div className="h-px w-40 bg-linear-to-r from-cyan-500/50 to-transparent" />
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
            <div className="flex gap-16">
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-white/20 font-bold">Status</p>
                <p className="text-[10px] uppercase tracking-widest text-cyan-400 font-black">Open to Roles</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-white/20 font-bold">Relic</p>
                <p className="text-[10px] uppercase tracking-widest text-white font-black">© {currentYear}</p>
              </div>
            </div>
            <p className="text-[8px] uppercase tracking-[0.6em] text-white/10 font-bold">
              Architecting Digital Resilience
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
    </footer>
  );
};

export default PremiumFooter;