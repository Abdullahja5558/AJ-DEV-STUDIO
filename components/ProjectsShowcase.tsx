"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactLenis } from "lenis/react";

const PROJECTS = [
  { id: "1", title: "Bugatti Clone", tagline: "High-performance digital engineering meeting luxury aesthetics.", tech: ["Next.js", "Three.js", "Tailwind"], image: "bugati.jpg", link: "https://bugatti-clone-seven.vercel.app/" },
  { id: "2", title: "Bucceo Diving", tagline: "Deep sea exploration and professional diving services interface.", tech: ["React", "Framer Motion", "GSAP"], image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop", link: "https://bucceo-diving.vercel.app/" },
  { id: "3", title: "PDF-HUB", tagline: "PDFHub is a free online platform to convert, edit, merge, and manage PDF files easily.", tech: ["TypeScript", "Next.js", "Prisma"], image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop", link: "https://pdfhubx.vercel.app/" },
  { id: "4", title: "Premium Portfolio", tagline: "A masterclass in minimalist UI and smooth digital storytelling.", tech: ["React", "Interactions", "UI/UX"], image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2572&auto=format&fit=crop", link: "https://brittanychiang.com/" },
  { id: "5", title: "Noor-ul-Quran", tagline: "Experience the Holy Quran with 114 Surahs, Audio, Prayer times, and Seerah.", tech: ["Next.js", "Audio API", "Tailwind CSS"], image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2000&auto=format&fit=crop", link: "https://noor-ulquran.vercel.app/" },
];

const ProjectFrame = React.memo(({ project }: { project: (typeof PROJECTS)[0] }) => {
  return (
    <div className="relative shrink-0 w-screen md:w-[85vw] h-[50vh] md:h-[55vh] flex items-center justify-center px-4 md:px-12 transform-gpu">
      {/* Ghost ID Number */}
      <span className="absolute -top-16 -left-15 text-[12rem] md:text-[14rem] font-black text-white/[0.03] select-none z-0 pointer-events-none italic">
        {project.id}
      </span>

      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full h-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 bg-[#050505] shadow-2xl transform-gpu block cursor-pointer"
        style={{ isolation: "isolate" }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.2s] group-hover:scale-105 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-14 z-10 pointer-events-none text-left">
          <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.8] mb-4 group-hover:italic transition-all duration-700">
            {project.title}
          </h3>
          <p className="text-zinc-500 text-sm md:text-xl font-light italic max-w-lg mb-6 leading-tight">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span key={i} className="px-5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </div>
  );
});

export const ProjectsShowcase = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-400%"]);
  const x = useSpring(xTranslate, { stiffness: 20, damping: 25, mass: 0.5 });

  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.2 }}>
      <section ref={targetRef} className="relative h-[600vh] bg-black selection:bg-white selection:text-black"
      id="projects">
        
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          
          {/* HEADER AREA - Shifted higher up */}
          <div className="w-full px-6 md:px-24 z-20 pointer-events-none absolute top-10 md:top-3">
            <div className="max-w-7xl mx-auto">
              <motion.div className="flex items-center gap-6 mb-3">
                <div className="h-px w-12 bg-zinc-800" />
                <span className="text-[9px] tracking-[0.8em] text-zinc-500 font-bold uppercase">PRIVATE GALLERY</span>
              </motion.div>
              <h2 className="text-5xl md:text-[85px] font-black tracking-[-0.08em] text-white leading-[0.8]">
                Selected <br /> <span className="text-white/10 italic font-light uppercase">PROJECTS</span>
              </h2>
            </div>
          </div>

          {/* PROJECT SLIDER - Pushed down to avoid overlap */}
          <motion.div 
            style={{ x }} 
            className="flex items-center pl-[10vw] will-change-transform mt-32 md:mt-48"
          >
            {PROJECTS.map((project) => (
              <ProjectFrame key={project.id} project={project} />
            ))}
          </motion.div>
        </div>

        {/* Cinematic Grain & Lighting */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/[0.01] blur-[180px] rounded-full" />
        </div>

        <style jsx global>{`
          ::selection { background-color: #fff !important; color: #000 !important; }
        `}</style>
      </section>
    </ReactLenis>
  );
};

export default ProjectsShowcase;