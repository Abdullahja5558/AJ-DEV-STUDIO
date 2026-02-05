"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactLenis } from "lenis/react";

const PROJECTS = [
  {
    id: "1",
    title: "Bugatti Clone",
    tagline: "High-performance digital engineering meeting luxury aesthetics.",
    tech: ["Next.js", "Three.js", "Tailwind"],
    image: "bugati.jpg",
    link: "https://bugatti-clone-seven.vercel.app/",
  },
  {
    id: "2",
    title: "Bucceo Diving",
    tagline: "Deep sea exploration and professional diving services interface.",
    tech: ["React", "Framer Motion", "GSAP"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop",
    link: "https://bucceo-diving.vercel.app/",
  },
  {
    id: "3",
    title: "PDF-HUB",
    tagline: "PDFHub is a free online platform to convert, edit, merge, and manage PDF files easily.",
    tech: ["TypeScript", "Next.js", "Prisma"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    link: "https://pdfhubx.vercel.app/",
  },
  {
    id: "4",
    title: "Premium Portfolio",
    tagline: "A masterclass in minimalist UI and smooth digital storytelling.",
    tech: ["React", "Interactions", "UI/UX"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2572&auto=format&fit=crop",
    link: "https://brittanychiang.com/",
  },
  // Naya 5th Project yahan add kiya hai
  {
    id: "5",
    title: "Noor-ul-Quran",
    tagline: "Experience the Holy Quran with 114 Surahs, Audio, Prayer times, and Seerah.",
    tech: ["Next.js", "Audio API", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2000&auto=format&fit=crop",
    link: "https://noor-ulquran.vercel.app/",
  },
];

const ProjectFrame = React.memo(({ project }: { project: (typeof PROJECTS)[0] }) => {
  return (
    <div className="relative shrink-0 w-screen md:w-[85vw] h-[55vh] md:h-[60vh] flex items-center justify-center px-4 md:px-12 transform-gpu">
      <span
        className="absolute -top-10 -left-15 text-[14rem] font-black text-white/5 select-none z-0 pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      >
        {project.id}
      </span>

      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full h-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 bg-[#030014] shadow-2xl transform-gpu block cursor-pointer"
        style={{ isolation: "isolate" }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-[1.2s] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-14 z-10 pointer-events-none">
          <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.8] mb-4">
            {project.title}
          </h3>
          <p className="text-white/50 text-sm md:text-xl font-light italic max-w-lg mb-6 leading-tight">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[9px] uppercase tracking-[0.2em] text-cyan-400 font-bold"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-bold">
            Launch Site ↗
          </span>
        </div>
      </motion.a>
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

  // Updated range to -360% to accommodate the 5th project properly
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    ["0%", "0%", "-360%", "-360%"]
  );

  const x = useSpring(xTranslate, {
    stiffness: 15,
    damping: 20,
    mass: 0.5,
    restDelta: 0.001,
  });

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.07,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      <section
        id="projects"
        ref={targetRef}
        className="relative h-[900vh] bg-[#030014] py-40" // Height increased for 5 projects
        style={{ contentVisibility: "auto" }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col h-full justify-center"
          >
            <div className="w-full px-6 md:px-24 mb-20 z-20 pointer-events-none">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-6 mb-6"
                >
                  <div className="h-px w-16 bg-cyan-500/50" />
                  <span className="text-[10px] tracking-[0.8em] text-cyan-500 font-bold uppercase">
                    PRIVATE GALLERY
                  </span>
                </motion.div>

                <div className="relative">
                  <h2 className="text-6xl md:text-[90px] font-black tracking-[-0.08em] text-white leading-[0.75] relative z-10">
                    Selected <br />{" "}
                    <span className="text-white/10 italic font-light">
                      PROJECTS
                    </span>
                  </h2>
                </div>
              </div>
            </div>

            <motion.div
              style={{ x }}
              className="flex items-center pl-[5vw] md:pl-[10vw] will-change-transform"
            >
              {PROJECTS.map((project) => (
                <ProjectFrame key={project.id} project={project} />
              ))}
              {/* Added more buffer at the end */}
              <div className="shrink-0 w-[25vw] h-px" />
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-900/10 blur-[180px] rounded-full" />
        </div>
      </section>
    </ReactLenis>
  );
};

export default ProjectsShowcase;