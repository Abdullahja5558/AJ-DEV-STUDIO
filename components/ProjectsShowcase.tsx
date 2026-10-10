"use client";

import React, { useRef, useEffect, useState } from "react";

const PROJECTS = [
  { id: "01", title: "Bugatti Clone", tagline: "High-performance digital engineering meeting luxury aesthetics.", tech: ["Next.js", "Three.js", "Tailwind"], image: "/bugati.jpg", link: "https://bugatti-clone-seven.vercel.app/" },
  { id: "02", title: "Bucceo Diving", tagline: "Deep sea exploration and professional diving services interface.", tech: ["React", "Framer Motion", "GSAP"], image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop", link: "https://bucceo-diving.vercel.app/" },
  { id: "03", title: "PDF-HUB", tagline: "PDFHub is a free online platform to convert, edit, merge, and manage PDF files easily.", tech: ["TypeScript", "Next.js", "Prisma"], image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop", link: "https://pdfhubx.vercel.app/" },
  { id: "04", title: "Premium Portfolio", tagline: "A masterclass in minimalist UI and smooth digital storytelling.", tech: ["React", "Interactions", "UI/UX"], image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2572&auto=format&fit=crop", link: "https://samia-uiux.vercel.app" },
  { id: "05", title: "Noor-ul-Quran", tagline: "Experience the Holy Quran with 114 Surahs, Audio, Prayer times, and Seerah.", tech: ["Next.js", "Audio API", "Tailwind CSS"], image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2000&auto=format&fit=crop", link: "https://noor-ulquran.vercel.app/" },
];

// Duplicate array multiple times for seamless marquee scrolling loops
const DUPLICATED_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS];

const ProjectCard = ({ 
  project, 
  onHoverChange 
}: { 
  project: (typeof PROJECTS)[0]; 
  onHoverChange: (hovered: boolean) => void;
}) => {
  const cardRef = useRef<HTMLLIElement>(null);
  
  if (!project) return null;

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    
    // Normalize coordinates: -0.5 is left/top, 0.5 is right/bottom
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Apply interactive micro parallax offsets to custom styles
    card.style.setProperty("--mx", `${x * 12}deg`); // Max tilt 12 degrees
    card.style.setProperty("--my", `${-y * 12}deg`);
  };

  const handleMouseEnter = () => {
    onHoverChange(true);
    const card = cardRef.current;
    if (card) {
      card.style.setProperty("--is-hovered", "1");
    }
  };

  const handleMouseLeave = () => {
    onHoverChange(false);
    const card = cardRef.current;
    if (card) {
      card.style.setProperty("--is-hovered", "0");
      card.style.setProperty("--mx", "0deg");
      card.style.setProperty("--my", "0deg");
    }
  };

  return (
    <li
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card-3d relative shrink-0 w-[260px] sm:w-[320px] md:w-[380px] h-[360px] sm:h-[440px] md:h-[520px] mx-1 sm:mx-1.5 transform-gpu list-none will-change-transform pointer-events-auto"
      style={{ transformStyle: "preserve-3d" }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full h-full rounded-[2.2rem] overflow-hidden border border-[#DEBA75]/25 bg-[#2E0006] block cursor-pointer transition-all duration-300 hover:border-[#DEBA75]/70"
        style={{ isolation: "isolate" }}
        aria-label={`Visit project: ${project.title}`}
      >
        {/* Project Image Panel */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={project.image}
            alt={`${project.title} mockup`}
            loading="lazy"
            className="w-full h-full object-cover grayscale opacity-[0.5] group-hover:grayscale-0 group-hover:opacity-[1.0] transition-all duration-[0.5s] group-hover:scale-[1.02] will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2E0006]/30 via-transparent to-[#2E0006]/95 transition-all duration-300 group-hover:to-[#2E0006]/80" />
        </div>

        {/* Hover slide details card drawer */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-20 pointer-events-none text-left flex flex-col justify-end translate-y-[22%] sm:translate-y-[16%] group-hover:translate-y-0 transition-transform duration-300">
          
          <span className="text-[8px] sm:text-[9px] font-mono text-[#DEBA75] tracking-[0.2em] uppercase mb-1 font-bold">
            Featured Case
          </span>
          
          <h3 className="text-sm sm:text-lg font-black text-[#FAF4EC] tracking-tight mb-2 uppercase flex items-center gap-2">
            <span className="font-outline opacity-60 text-xs sm:text-sm text-[#DEBA75]">{project.id}</span>
            {project.title}
          </h3>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-3">
            {/* Tech badges layout matching original tags */}
            <div className="flex flex-wrap gap-1">
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-full border border-[#DEBA75]/20 bg-[#3B0007] text-[7px] uppercase tracking-[0.1em] text-[#D4C3B3] font-medium">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-1 text-[8px] font-mono text-[#DEBA75] tracking-widest font-bold uppercase">
              VIEW PROJECT <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

        </div>
      </a>
    </li>
  );
};

export default function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId: number;
    container.scrollLeft = container.scrollWidth / 3;

    const speed = 0.65;

    const scrollLoop = () => {
      if (!isPaused.current) {
        container.scrollLeft -= speed;
        if (container.scrollLeft <= 0) {
          container.scrollLeft = container.scrollWidth / 3;
        }
      }
      
      updateCardTransforms();
      frameId = requestAnimationFrame(scrollLoop);
    };

    const updateCardTransforms = () => {
      const cards = container.querySelectorAll(".project-card-3d");
      const screenCenter = window.innerWidth / 2;
      const maxDistance = window.innerWidth / 2;
      
      let closestIdx = 0;
      let minDistance = Infinity;

      cards.forEach((card, idx) => {
        const el = card as HTMLElement;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distanceFromCenter = cardCenter - screenCenter;
        
        const distAbs = Math.abs(distanceFromCenter);
        if (distAbs < minDistance) {
          minDistance = distAbs;
          closestIdx = idx;
        }

        const ratio = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
        const absRatio = Math.abs(ratio);
        
        const tilt = 25 * ratio;
        const scale = 1.0 - 0.15 * absRatio;
        const z = -120 - 180 * absRatio; 

        const mxStr = el.style.getPropertyValue("--mx");
        const myStr = el.style.getPropertyValue("--my");
        const isHoveredStr = el.style.getPropertyValue("--is-hovered") || "0";
        
        const mxVal = mxStr ? parseFloat(mxStr) : 0;
        const myVal = myStr ? parseFloat(myStr) : 0;
        const isHovered = parseFloat(isHoveredStr);

        let currentMx = parseFloat(el.getAttribute("data-mx") || "0");
        let currentMy = parseFloat(el.getAttribute("data-my") || "0");
        let currentHover = parseFloat(el.getAttribute("data-hover") || "0");

        let nextMx = currentMx + (mxVal - currentMx) * 0.12;
        let nextMy = currentMy + (myVal - currentMy) * 0.12;
        let nextHover = currentHover + (isHovered - currentHover) * 0.12;

        el.setAttribute("data-mx", nextMx.toString());
        el.setAttribute("data-my", nextMy.toString());
        el.setAttribute("data-hover", nextHover.toString());

        const finalScale = scale - 0.04 * nextHover;
        const finalZ = z - 40 * nextHover;

        el.style.transform = `perspective(1000px) rotateY(${tilt + nextMx}deg) rotateX(${nextMy}deg) scale(${finalScale}) translateZ(${finalZ}px)`;
      });

      const realIndex = closestIdx % PROJECTS.length;
      if (realIndex !== activeIndexRef.current) {
        activeIndexRef.current = realIndex;
        setActiveIndex(realIndex);
      }
    };

    frameId = requestAnimationFrame(scrollLoop);

    const handleResize = () => {
      updateCardTransforms();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleHoverChange = (hovered: boolean) => {
    isPaused.current = hovered;
  };

  return (
    <section 
      className="relative bg-[#3B0007] overflow-hidden selection:bg-[#DEBA75] selection:text-[#3B0007] flex flex-col justify-between pt-36 pb-36 md:pt-44 md:pb-44 min-h-screen"
      id="projects"
      aria-labelledby="projects-heading"
    >
      {/* ORIGINAL PREMIUM LEFT-ALIGNED HEADER */}
      <div className="w-full px-6 md:px-24 z-20 pointer-events-none mb-14 md:mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-5">
            <div className="h-px w-12 bg-[#DEBA75]/40" aria-hidden="true" />
            <span className="text-[10px] tracking-[0.6em] text-[#DEBA75] font-bold uppercase">CURATED WORKS</span>
          </div>
          <h2 id="projects-heading" className="text-6xl md:text-[95px] font-black tracking-[-0.05em] text-[#FAF4EC] leading-[0.85] uppercase">
            Selected <br /> <span className="font-outline-projects opacity-50 text-transparent">PROJECTS</span>
          </h2>
        </div>
      </div>

      {/* INFINITE 3D CYLINDER CAROUSEL */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-x-auto flex items-center h-[450px] sm:h-[560px] md:h-[690px] my-6 md:my-10 scrollbar-none pointer-events-none"
        style={{ perspective: "1500px", msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        <ul 
          className="flex flex-row flex-nowrap items-center p-0 m-0 w-max min-w-max pb-24 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
          aria-live="off"
          aria-label="Carousel of featured projects"
        >
          {DUPLICATED_PROJECTS.filter(Boolean).map((project, index) => (
            <ProjectCard 
              key={`${project?.id || index}-${index}`} 
              project={project} 
              onHoverChange={handleHoverChange}
            />
          ))}
        </ul>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="flex flex-col items-center gap-4 mt-8 z-20 pointer-events-none">
        {/* Progress Dots */}
        <div className="flex items-center gap-3">
          {PROJECTS.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "bg-[#DEBA75] scale-125"
                  : "bg-[#DEBA75]/30"
              }`}
            />
          ))}
        </div>
        <span className="text-[9px] font-mono text-[#D4C3B3]/60 tracking-[0.4em] uppercase font-semibold">
          SCROLL / HOVER TO EXPLORE
        </span>
      </div>

      {/* Global CSS Styles */}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none !important;
        }
        .font-outline {
          -webkit-text-stroke: 1px rgba(222, 186, 117, 0.4);
          color: transparent;
        }
        .font-outline-projects {
          -webkit-text-stroke: 1.5px rgba(222, 186, 117, 0.5);
          color: transparent;
        }
      `}</style>
    </section>
  );
}
  
 