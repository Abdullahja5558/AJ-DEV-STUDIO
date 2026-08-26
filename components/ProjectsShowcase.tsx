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
        className="group relative w-full h-full rounded-[2.2rem] overflow-hidden border border-[#222222] bg-[#0A0A0A] shadow-[0_25px_55px_rgba(0,0,0,0.9)] block cursor-pointer transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
        style={{ isolation: "isolate" }}
        aria-label={`Visit project: ${project.title}`}
      >
        {/* Soft white hover radial light */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.01]" />
        </div>

        {/* Project Image Panel */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={project.image}
            alt={`${project.title} mockup`}
            loading="lazy"
            className="w-full h-full object-cover grayscale opacity-[0.45] group-hover:grayscale-0 group-hover:opacity-[1.0] transition-all duration-[0.7s] group-hover:scale-[1.03] will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 transition-all duration-500 group-hover:to-black/60" />
        </div>

        {/* Hover slide details card drawer */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-20 pointer-events-none text-left flex flex-col justify-end translate-y-[22%] sm:translate-y-[16%] group-hover:translate-y-0 transition-transform duration-500">
          
          <span className="text-[8px] sm:text-[9px] font-mono text-[#777777] tracking-[0.2em] uppercase mb-1">
            Featured Case
          </span>
          
          <h3 className="text-sm sm:text-lg font-black text-[#F5F5F5] tracking-tight mb-2 uppercase flex items-center gap-2">
            <span className="font-outline opacity-40 text-xs sm:text-sm">{project.id}</span>
            {project.title}
          </h3>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 space-y-3">
            {/* Tech badges layout matching original tags */}
            <div className="flex flex-wrap gap-1">
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-full border border-white/[0.08] bg-black/40 text-[7px] uppercase tracking-[0.1em] text-zinc-400 font-medium">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-1 text-[8px] font-mono text-white tracking-widest font-semibold uppercase">
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
    // Set standard marquee start position in the middle duplicate set
    container.scrollLeft = container.scrollWidth / 3;

    const speed = 0.65; // slow, premium constant scroll speed

    const scrollLoop = () => {
      if (!isPaused.current) {
        // Continuous scroll LEFT → RIGHT (decreases scrollLeft)
        container.scrollLeft -= speed;
        
        // Seamless loop wrap when scrolling backwards
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
        
        // Track closest card to view center for progress dots
        const distAbs = Math.abs(distanceFromCenter);
        if (distAbs < minDistance) {
          minDistance = distAbs;
          closestIdx = idx;
        }

        // Normalize distance ratio: 0 is center, 1 is edge of screen
        const ratio = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
        const absRatio = Math.abs(ratio);
        
        // Corrected Convex Cylinder Math (Center is close, edges push back into depth)
        const tilt = 25 * ratio; // correct Y-tilt alignment (tilts away from center)
        const scale = 1.0 - 0.15 * absRatio; // scale down towards edges
        
        // Push the entire carousel back into depth (-120px to -300px) so cards recede into background
        const z = -120 - 180 * absRatio; 

        // Local hover custom parameters
        const mxStr = el.style.getPropertyValue("--mx");
        const myStr = el.style.getPropertyValue("--my");
        const isHoveredStr = el.style.getPropertyValue("--is-hovered") || "0";
        
        const mxVal = mxStr ? parseFloat(mxStr) : 0;
        const myVal = myStr ? parseFloat(myStr) : 0;
        const isHovered = parseFloat(isHoveredStr);

        // Low-pass filter (interpolation) for ultra-smooth local hover parallax transitions
        let currentMx = parseFloat(el.getAttribute("data-mx") || "0");
        let currentMy = parseFloat(el.getAttribute("data-my") || "0");
        let currentHover = parseFloat(el.getAttribute("data-hover") || "0");

        let nextMx = currentMx + (mxVal - currentMx) * 0.12;
        let nextMy = currentMy + (myVal - currentMy) * 0.12;
        let nextHover = currentHover + (isHovered - currentHover) * 0.12;

        el.setAttribute("data-mx", nextMx.toString());
        el.setAttribute("data-my", nextMy.toString());
        el.setAttribute("data-hover", nextHover.toString());

        // Push the card BACKWARD on hover (-40px Z depth, -0.04 scale) instead of pulling it forward
        const finalScale = scale - 0.04 * nextHover;
        const finalZ = z - 40 * nextHover;

        // Apply visual transform matrix
        el.style.transform = `perspective(1000px) rotateY(${tilt + nextMx}deg) rotateX(${nextMy}deg) scale(${finalScale}) translateZ(${finalZ}px)`;
      });

      // Update progress dot index modulo our original project count (5 items)
      const realIndex = closestIdx % PROJECTS.length;
      if (realIndex !== activeIndexRef.current) {
        activeIndexRef.current = realIndex;
        setActiveIndex(realIndex);
      }
    };

    frameId = requestAnimationFrame(scrollLoop);

    // Update dimensions on resize
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
      className="relative bg-[#010101] overflow-hidden selection:bg-[#22c55e] selection:text-black flex flex-col justify-between pt-36 pb-36 md:pt-44 md:pb-44 min-h-screen"
      id="projects"
      aria-labelledby="projects-heading"
    >
      {/* ORIGINAL PREMIUM LEFT-ALIGNED HEADER */}
      <div className="w-full px-6 md:px-24 z-20 pointer-events-none mb-14 md:mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-5">
            <div className="h-px w-12 bg-zinc-800" aria-hidden="true" />
            <span className="text-[10px] tracking-[0.6em] text-zinc-500 font-bold uppercase">CURATED WORKS</span>
          </div>
          <h2 id="projects-heading" className="text-6xl md:text-[95px] font-black tracking-[-0.05em] text-white leading-[0.85] uppercase">
            Selected <br /> <span className="text-white/[0.07] font-outline-projects opacity-50">PROJECTS</span>
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
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                activeIndex === idx
                  ? "bg-white scale-125 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                  : "bg-[#222222]"
              }`}
            />
          ))}
        </div>
        <span className="text-[9px] font-mono text-[#777777] tracking-[0.4em] uppercase">
          SCROLL / HOVER TO EXPLORE
        </span>
      </div>

      {/* Cinematic Grain & Subtle Ambient Halo */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#22c55e]/[0.003] blur-[300px] rounded-full" />
      </div>

      {/* Global CSS Styles for reflections and outlines */}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none !important;
        }
        .project-card-3d {
          -webkit-box-reflect: below 12px linear-gradient(transparent, transparent 65%, rgba(255, 255, 255, 0.05));
        }
        .font-outline {
          -webkit-text-stroke: 1px rgba(245, 245, 245, 0.3);
          color: transparent;
        }
        .font-outline-projects {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
          color: transparent;
        }
      `}</style>
    </section>
  );
}