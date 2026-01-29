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
  {
    name: "Next.js 15",
    icon: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
    level: 95,
    color: "#ffffff",
    tag: "Framework",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
    level: 90,
    color: "#3178C6",
    tag: "Language",
  },
  {
    name: "HTML5",
    icon: "https://cdn.worldvectorlogo.com/logos/html-1.svg",
    level: 98,
    color: "#E34F26",
    tag: "Markup",
  },
  {
    name: "React",
    icon: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
    level: 98,
    color: "#61DAFB",
    tag: "Library",
  },
  {
    name: "Tailwind",
    icon: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
    level: 95,
    color: "#06B6D4",
    tag: "Design",
  },
  {
    name: "Node.js",
    icon: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
    level: 85,
    color: "#339933",
    tag: "Backend",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
    level: 80,
    color: "#336791",
    tag: "Database",
  },
  {
    name: "Prisma",
    icon: "https://cdn.worldvectorlogo.com/logos/prisma-2.svg",
    level: 88,
    color: "#2D3748",
    tag: "ORM",
  },
  {
    name: "Framer",
    icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
    level: 92,
    color: "#FF0055",
    tag: "Motion",
  },
  {
    name: "CSS",
    icon: "https://cdn.worldvectorlogo.com/logos/css-3.svg",
    level: 92,
    color: "#1572B6",
    tag: "Styling",
  },
  {
    name: "Git",
    icon: "https://cdn.worldvectorlogo.com/logos/git-icon.svg",
    level: 90,
    color: "#F05032",
    tag: "Version",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",
    level: 95,
    color: "#F7DF1E",
    tag: "Language",
  },
];

const PerspectiveSkill = ({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) => {
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
      className="group relative flex items-center justify-between py-12 border-b border-white/5 perspective-1000 will-change-transform"
    >
      <div className="flex items-baseline gap-6 relative z-10">
        <span className="text-white/10 font-mono text-sm tracking-widest uppercase italic group-hover:text-cyan-500 transition-colors">
          Cap_{index + 1}
        </span>
        <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase group-hover:italic transition-all duration-500">
          {skill.name}
        </h3>
      </div>

      <div className="flex items-center gap-12">
        <div className="hidden md:flex flex-col items-end gap-2">
          <span className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">
            {skill.tag}
          </span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.05 + i * 0.1 }}
                className={`w-3 h-1 rounded-full origin-left ${i < Math.floor(skill.level / 20) ? "bg-cyan-500" : "bg-white/10"}`}
              />
            ))}
          </div>
        </div>

        <div className="relative w-16 h-16 md:w-24 md:h-24">
          <div className="absolute inset-0 bg-white/5 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all duration-700" />
          <img
            src={skill.icon}
            alt=""
            className="relative w-full h-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/2 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </motion.div>
  );
};

export const TechnicalEcosystem = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const stackY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const stackScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const springY = useSpring(stackY, { stiffness: 30, damping: 15 });

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5 }}>
      <section
        id="skills"
        ref={containerRef}
        className="relative min-h-screen w-full bg-[#030014] py-40 px-6 md:px-12 overflow-hidden border-none outline-none"
        style={{ boxShadow: "none", border: "none", outline: "none" }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <motion.h2
            style={{ y: springY, scale: stackScale }}
            className="text-[35vw] font-black text-white/2 leading-none tracking-tighter uppercase select-none whitespace-nowrap will-change-transform"
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
              className="flex items-center gap-3 text-cyan-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-8"
            >
              <span className="w-12 h-px bg-cyan-400" />
              Technical Prowess
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 50 }}
              className="text-5xl md:text-[6rem] font-black text-white tracking-tighter leading-[0.8]"
            >
              Crafting <br />
              <span className="text-white/20">Modern Web.</span>
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
            className="mt-32 flex flex-col md:flex-row items-end justify-between gap-12"
          >
            <div className="max-w-xl">
              <p className="text-white/40 text-2xl font-light leading-snug italic">
                "Building systems that scale seamlessly with
                <span className="text-white not-italic font-bold">
                  {" "}
                  user growth and high-performance
                </span>{" "}
                expectations."
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 py-4 px-8 rounded-full backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-white/50 tracking-[0.2em] uppercase">
                Status: Available 2026
              </span>
            </div>
          </motion.div>
        </div>

       
        {/* <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.15, 0]),
          }}
          className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-cyan-500/20 to-transparent pointer-events-none"
        /> */}
      </section>
    </ReactLenis>
  );
};

export default TechnicalEcosystem;
