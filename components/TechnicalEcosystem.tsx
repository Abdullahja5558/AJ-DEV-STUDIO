"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactLenis } from "lenis/react";

interface Skill {
  name: string;
  icon: string;
  level: number;
  color: string;
  tag: string;
}

const SKILLS: Skill[] = [
  { name: "Next.js 15", icon: "https://cdn.worldvectorlogo.com/logos/next-js.svg", level: 95, color: "#ffffff", tag: "Framework" },
  { name: "TypeScript", icon: "https://cdn.worldvectorlogo.com/logos/typescript.svg", level: 90, color: "#3178C6", tag: "Language" },
  { name: "HTML5", icon: "https://cdn.worldvectorlogo.com/logos/html-1.svg", level: 98, color: "#E34F26", tag: "Markup" },
  { name: "React", icon: "https://cdn.worldvectorlogo.com/logos/react-2.svg", level: 98, color: "#61DAFB", tag: "Library" },
  { name: "Tailwind", icon: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg", level: 95, color: "#06B6D4", tag: "Design" },
  { name: "Node.js", icon: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg", level: 85, color: "#339933", tag: "Backend" },
  { name: "PostgreSQL", icon: "https://cdn.worldvectorlogo.com/logos/postgresql.svg", level: 80, color: "#336791", tag: "Database" },
  { name: "Prisma", icon: "https://cdn.worldvectorlogo.com/logos/prisma-2.svg", level: 88, color: "#2D3748", tag: "ORM" },
  { name: "Framer", icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg", level: 92, color: "#FF0055", tag: "Motion" },
  { name: "CSS", icon: "https://cdn.worldvectorlogo.com/logos/css-3.svg", level: 92, color: "#1572B6", tag: "Styling" },
  { name: "Git", icon: "https://cdn.worldvectorlogo.com/logos/git-icon.svg", level: 90, color: "#F05032", tag: "Version" },
  { name: "JavaScript", icon: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg", level: 95, color: "#F7DF1E", tag: "Language" },
];

const PerspectiveSkill = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.05, 
      }}
      // BORDER UPDATED: Ultra thin obsidian border
      className="group relative flex items-center justify-between py-12 border-b border-white/[0.04] perspective-1000 will-change-transform"
    >
      <div className="flex items-baseline gap-6 relative z-10">
        <span className="text-zinc-800 font-mono text-[10px] tracking-[0.5em] uppercase italic group-hover:text-zinc-400 transition-colors duration-500">
          CAP_{index + 1}
        </span>
        <h3 className="text-4xl md:text-7xl font-bold text-zinc-500 tracking-tighter uppercase group-hover:text-white group-hover:italic transition-all duration-700">
          {skill.name}
        </h3>
      </div>

      <div className="flex items-center gap-12 relative z-10">
        <div className="hidden md:flex flex-col items-end gap-2">
          <span className="text-[9px] font-mono text-zinc-700 tracking-[0.4em] uppercase">
            {skill.tag}
          </span>
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.05 + i * 0.1 }}
                className={`w-4 h-[1px] rounded-full origin-left ${i < Math.floor(skill.level / 20) ? "bg-zinc-400" : "bg-white/[0.05]"}`}
              />
            ))}
          </div>
        </div>

        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <div className="absolute inset-0 bg-white/[0.01] rounded-full blur-2xl group-hover:bg-white/[0.05] transition-all duration-1000" />
          <img
            src={skill.icon}
            alt=""
            className="relative w-full h-full object-contain filter grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-white/[0] via-white/[0.02] to-white/[0] -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </motion.div>
  );
};

export const TechnicalEcosystem = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const stackY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const stackScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const springY = useSpring(stackY, { stiffness: 30, damping: 15 });

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5 }}>
      {/* UPDATED: BG color to Pure Obsidian Black #000000 with selection white */}
      <section
        id="skills"
        ref={containerRef}
        className="relative min-h-screen w-full bg-[#000000] py-40 px-6 md:px-12 overflow-hidden border-none outline-none selection:bg-white selection:text-black"
      >
        {/* ATMOSPHERIC GLOWS: Exactly like Hero */}
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <motion.h2
            style={{ y: springY, scale: stackScale }}
            className="text-[35vw] font-black text-white/[0.01] leading-none tracking-tighter uppercase select-none whitespace-nowrap will-change-transform"
          >
            STACK
          </motion.h2>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <header className="mb-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="flex items-center gap-3 text-zinc-600 font-mono text-[9px] tracking-[0.6em] uppercase mb-8"
            >
              <span className="w-12 h-[0.5px] bg-zinc-800" />
              Technical Prowess
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 50 }}
              className="text-6xl md:text-[7.5rem] font-bold text-white tracking-tighter leading-[0.85]"
            >
              Crafting <br />
              {/* GRADIENT UPDATED: White to Zinc-800 for depth */}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-800">Modern Web.</span>
            </motion.h2>
          </header>

          <div className="flex flex-col">
            {SKILLS.map((skill, i) => (
              <PerspectiveSkill key={skill.name} skill={skill} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="mt-40 flex flex-col md:flex-row items-end justify-between gap-12"
          >
            <div className="max-w-xl">
              <p className="text-zinc-600 text-2xl font-light leading-snug italic">
                "Building systems that scale seamlessly with
                <span className="text-zinc-300 not-italic font-medium transition-colors hover:text-white cursor-default">
                  {" "}
                  user growth and high-performance
                </span>{" "}
                expectations."
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] py-4 px-8 rounded-full backdrop-blur-3xl shadow-2xl">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
              <span className="text-[9px] font-mono text-zinc-500 tracking-[0.4em] uppercase">
                Status: Available 2026
              </span>
            </div>
          </motion.div>
        </div>

        {/* GRAIN TEXTURE OVERLAY */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 transform-gpu" />
      </section>

      <style jsx global>{`
        ::selection {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        ::-moz-selection {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        html.lenis, html.lenis body {
          height: auto;
          background-color: #000;
        }
      `}</style>
    </ReactLenis>
  );
};

export default TechnicalEcosystem;