"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PROJECTS = [
  { id: "01", title: "Bugatti Clone", tagline: "High-performance digital engineering meeting luxury aesthetics.", tech: ["Next.js", "Three.js", "Tailwind"], image: "bugati.jpg", link: "https://bugatti-clone-seven.vercel.app/" },
  { id: "02", title: "Bucceo Diving", tagline: "Deep sea exploration and professional diving services interface.", tech: ["React", "Framer Motion", "GSAP"], image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop", link: "https://bucceo-diving.vercel.app/" },
  { id: "03", title: "PDF-HUB", tagline: "PDFHub is a free online platform to convert, edit, merge, and manage PDF files easily.", tech: ["TypeScript", "Next.js", "Prisma"], image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop", link: "https://pdfhubx.vercel.app/" },
  { id: "04", title: "Premium Portfolio", tagline: "A masterclass in minimalist UI and smooth digital storytelling.", tech: ["React", "Interactions", "UI/UX"], image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2572&auto=format&fit=crop", link: "https://samia-uiux.vercel.app" },
  { id: "05", title: "Noor-ul-Quran", tagline: "Experience the Holy Quran with 114 Surahs, Audio, Prayer times, and Seerah.", tech: ["Next.js", "Audio API", "Tailwind CSS"], image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2000&auto=format&fit=crop", link: "https://noor-ulquran.vercel.app/" },
];

// 3 times duplicated for perfect seamless CSS loop
const DUPLICATED_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS];

const ProjectCard = ({ project, containerRef }: { project: (typeof PROJECTS)[0], containerRef: React.RefObject<HTMLDivElement | null> }) => {
  const cardRef = useRef<HTMLLIElement>(null);
  
  const { scrollXProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleRaw = useTransform(scrollXProgress, [0.1, 0.5, 0.9], [0.92, 1.05, 0.92]);
  const scale = useSpring(scaleRaw, { stiffness: 100, damping: 25 });

  return (
    <motion.li
      ref={cardRef}
      style={{ scale }}
      className="relative shrink-0 w-[360px] md:w-[480px] h-[540px] md:h-[680px] mx-5 transform-gpu list-none"
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/[0.08] bg-[#0A0A0A] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] block cursor-pointer transition-all duration-700 hover:border-white/30 hover:shadow-[0_0_60px_-12px_rgba(255,255,255,0.12)]"
        style={{ isolation: "isolate" }}
        aria-label={`Visit project: ${project.title}`}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.01] blur-2xl" />
        </div>

        <span className="absolute top-6 right-8 text-[6rem] font-black text-white/[0.02] select-none z-0 pointer-events-none italic group-hover:text-white/[0.05] transition-colors duration-500">
          {project.id}
        </span>

        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={project.image}
            alt={`${project.title} project showcase mockup`}
            loading="lazy"
            className="w-full h-full object-cover grayscale opacity-[0.75] group-hover:grayscale-0 group-hover:opacity-[1] transition-all duration-[0.8s] group-hover:scale-105 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/90" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 pointer-events-none text-left flex flex-col justify-end">
          <div className="w-10 h-[2px] bg-white/20 group-hover:w-20 group-hover:bg-white/60 transition-all duration-700 mb-5" aria-hidden="true" />
          
          <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-[-0.03em] mb-2 transition-all duration-500">
            {project.title}
          </h3>
          
          <p className="text-zinc-300 text-xs md:text-sm font-light italic mb-6 leading-relaxed max-w-[90%] transition-all duration-500 group-hover:text-white">
            {project.tagline}
          </p>
          
          <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3.5 py-1.5 rounded-full border border-white/[0.15] bg-black/50 backdrop-blur-xl text-[8.5px] uppercase tracking-[0.15em] text-zinc-300 font-medium group-hover:border-white/[0.3] group-hover:text-white transition-colors duration-500">
                {t}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.li>
  );
};

export const ProjectsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      className="relative min-h-screen bg-[#000000] overflow-hidden selection:bg-white selection:text-black flex flex-col justify-between py-24"
      id="projects"
      aria-labelledby="projects-heading"
    >
      {/* HEADER AREA - With big gap at the bottom */}
      <div className="w-full px-6 md:px-24 z-20 pointer-events-none mb-24 md:mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-5">
            <div className="h-px w-12 bg-zinc-800" aria-hidden="true" />
            <span className="text-[10px] tracking-[0.6em] text-zinc-600 font-bold uppercase">CURATED WORKS</span>
          </div>
          <h2 id="projects-heading" className="text-6xl md:text-[95px] font-black tracking-[-0.05em] text-white leading-[0.85]">
            Selected <br /> <span className="text-white/[0.07] uppercase">PROJECTS</span>
          </h2>
        </div>
      </div>

      {/* AUTO-SCROLLING CAROUSEL (Pause on Hover CSS Trick) */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden flex items-center h-[650px] md:h-[750px] mb-20 md:mb-28"
        style={{ perspective: "1500px" }}
      >
        {/* CSS-animated track for 100% stable resume functionality - SEO FIX: wrapped in <ul> */}
        <ul 
          className="flex items-center animate-infinite-marquee hover:[animation-play-state:paused] p-0 m-0"
          style={{ transformStyle: "preserve-3d" }}
          aria-live="off"
          aria-label="Carousel of my featured projects"
        >
          {DUPLICATED_PROJECTS.map((project, index) => (
            <ProjectCard 
              key={`${project.id}-${index}`} 
              project={project} 
              containerRef={containerRef}
            />
          ))}
        </ul>
      </div>

      {/* Cinematic Grain & Soft Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.012] mix-blend-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/[0.008] blur-[250px] rounded-full" />
      </div>

      {/* CSS For Seamless Infinite Loop and Native Hover Pause */}
      <style jsx>{`
        .animate-infinite-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>

      <style jsx global>{`
        ::selection { background-color: #fff !important; color: #000 !important; }
      `}</style>
    </section>
  );
};

export default ProjectsShowcase;