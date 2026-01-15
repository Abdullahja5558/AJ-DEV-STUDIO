"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactLenis } from 'lenis/react';

const PROJECTS = [
  { id: "1", title: "Aura Intelligence", tagline: "Next-gen AI interface for distributed workflows.", tech: ["Next.js", "TypeScript", "Tailwind"], image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
  { id: "2", title: "Quantum Ledger", tagline: "High-frequency blockchain analytics engine.", tech: ["Node.js", "PostgreSQL", "Prisma"], image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop" },
  { id: "3", title: "Nexus OS", tagline: "Collaborative spatial operating system.", tech: ["React", "Framer", "Three.js"], image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop" },
  { id: "4", title: "Elysium Drive", tagline: "Autonomous vehicle monitoring dashboard.", tech: ["Python", "WebSockets", "D3.js"], image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop" },
  { id: "5", title: "Titan Commerce", tagline: "Ultra-fast headless e-commerce solution.", tech: ["Shopify", "Remix", "GraphQL"], image: "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=2670&auto=format&fit=crop" },
];

const ProjectFrame = React.memo(({ project }: { project: typeof PROJECTS[0] }) => {
  return (
    <div className="relative shrink-0 w-screen md:w-[85vw] h-[55vh] md:h-[60vh] flex items-center justify-center px-4 md:px-12 transform-gpu">
      <span 
        className="absolute -top-10 -left-12 text-[18rem] font-black text-white/2 select-none z-0 pointer-events-none will-change-transform" 
        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
      >
        {project.id}
      </span>

      <motion.div 
        className="group relative w-full h-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 bg-[#050505] shadow-[0_50px_100px_-30px_rgba(0,0,0,1)] transform-gpu"
        style={{ isolation: 'isolate' }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 will-change-transform"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-14 z-10 pointer-events-none">
          <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.8] mb-4">
            {project.title}
          </h3>
          <p className="text-white/40 text-sm md:text-xl font-light italic max-w-lg mb-6 leading-tight">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span key={i} className="px-5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[9px] uppercase tracking-[0.2em] text-cyan-400/70 font-bold">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
});

ProjectFrame.displayName = "ProjectFrame";

export const ProjectsShowcase = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1], 
    ["0%", "0%", "-325%", "-325%"]
  );
  
  const x = useSpring(xTranslate, { 
    stiffness: 20, 
    damping: 22, 
    mass: 0.6,
    restDelta: 0.001 
  });

  return (
    <ReactLenis root options={{ 
      lerp: 0.05, 
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
      infinite: false
    }}>
      <section 
        id="projects" 
        ref={targetRef} 
        className="relative h-[1000vh] bg-[#030011] py-40" 
        style={{ contentVisibility: 'auto', contain: 'layout' }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          
          {/* ANIMATION WRAPPER: Handles entrance/exit of the entire section */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.1 }} // Re-animates every time
            className="flex flex-col h-full justify-center"
          >
            <div className="w-full px-6 md:px-24 mb-20 z-20 pointer-events-none">
              <div className="max-w-7xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-6 mb-6"
                >
                  <div className="h-px w-16 bg-cyan-500" />
                  <span className="text-[10px] tracking-[0.8em] text-cyan-500 font-bold uppercase">PRIVATE GALLERY</span>
                </motion.div>

                <div className="relative">
                  <h2 className="text-6xl md:text-[90px] font-black tracking-[-0.08em] text-white leading-[0.75] relative z-10">
                    Selected <br /> <span className="text-white/10 italic">PROJECTS</span>
                  </h2>
                </div>
              </div>
            </div>

            <motion.div
              style={{ x }}
              className="flex items-center pl-[5vw] md:pl-[10vw] will-change-transform transform-gpu"
            >
              {PROJECTS.map((project) => (
                <ProjectFrame key={project.id} project={project} />
              ))}
              <div className="shrink-0 w-[60vw] h-px" />
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-950/4 blur-[200px] rounded-full transform-gpu" />
        </div>
      </section>
    </ReactLenis>
  );
};

export default ProjectsShowcase;