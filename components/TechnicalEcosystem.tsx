"use client";
import React, { useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  LayoutGroup,
} from "framer-motion";
import { ReactLenis } from "lenis/react";

// --- Extended Skill Data ---
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

const TechCard = React.memo(
  ({ skill, index }: { skill: Skill; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Optimized Spring settings for high-refresh monitors
    const springConfig = { stiffness: 150, damping: 25, mass: 0.5 };
    const rotateX = useSpring(
      useTransform(mouseY, [0, 1], ["10deg", "-10deg"]),
      springConfig
    );
    const rotateY = useSpring(
      useTransform(mouseX, [0, 1], ["-10deg", "10deg"]),
      springConfig
    );

    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        mouseX.set(x);
        mouseY.set(y);

        // Using setProperty directly on the element avoids React's reconciliation cycle
        cardRef.current.style.setProperty("--mouse-x", `${x * 100}%`);
        cardRef.current.style.setProperty("--mouse-y", `${y * 100}%`);
      },
      [mouseX, mouseY]
    );

    const handleMouseLeave = useCallback(() => {
      mouseX.set(0.5);
      mouseY.set(0.5);
    }, [mouseX, mouseY]);

    const isFeatured = index === 0 || index === 2 || index === 3;

    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.02,
        }}
        className={`group relative rounded-4xl border border-white/5 bg-[#0A0A0A]/40 backdrop-blur-3xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-colors duration-500 hover:border-white/20 will-change-transform transform-gpu ${
          isFeatured ? "md:col-span-2" : "md:col-span-1"
        }`}
      >
        {/* Background Icon Detail - Optimized with translateZ for parallax depth */}
        <div
          style={{ transform: "translateZ(40px)" }}
          className="absolute -top-4 -right-4 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
        >
          <img
            src={skill.icon}
            alt=""
            className="w-40 h-40 object-contain blur-sm"
            loading="lazy"
          />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="relative">
              <div
                className="absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: skill.color }}
              />
              <img
                src={skill.icon}
                alt={skill.name}
                className="relative w-10 h-10 object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
              />
            </div>
            <span className="text-[10px] font-mono text-white/20 tracking-[0.4em] uppercase py-1 px-3 border border-white/5 rounded-full bg-white/5">
              {skill.tag}
            </span>
          </div>

          <div className="mt-10">
            <h3
              className={`font-bold text-white tracking-tighter ${
                isFeatured ? "text-4xl" : "text-xl"
              }`}
            >
              {skill.name}
            </h3>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                <span>PROFICIENCY</span>
                <span>{skill.level}%</span>
              </div>
              <div className="h-0.75 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${skill.color})`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Surface Light Effect - Pure CSS driven via variables */}
        <div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${skill.color}15, transparent 45%)`,
          }}
        />
      </motion.div>
    );
  }
);

TechCard.displayName = "TechCard";

export const TechnicalEcosystem = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Use translateZ(0) to ensure the backdrop text is handled by the GPU
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05, // Lower lerp = smoother/heavier feel
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      <section
        id="skills"
        ref={containerRef}
        className="relative min-h-screen bg-[#030014] py-32 px-6 md:px-12 overflow-hidden flex flex-col justify-center"
      >
        {/* Structural Backdrop Text */}
        <motion.div
          style={{ y: yTranslate, translateZ: 0 }}
          className="absolute bottom-60 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-[0.03] will-change-transform transform-gpu"
        >
          <h2 className="text-[30vw] font-black text-white leading-none tracking-tighter uppercase select-none">
            STACK
          </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <header className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-cyan-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-6"
            >
              <span className="w-12 h-px bg-cyan-400" />
              Core Technologies
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]"
            >
              Crafting <br />
              <span className="text-white/30">Modern Web.</span>
            </motion.h2>
          </header>

          <LayoutGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {SKILLS.map((skill, i) => (
                <TechCard key={skill.name} skill={skill} index={i} />
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-2 bg-linear-to-br from-white/3 to-transparent border border-white/5 rounded-4xl p-10 flex flex-col justify-center relative overflow-hidden group transform-gpu will-change-transform"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <p className="text-white/50 text-xl font-light leading-relaxed relative z-10 pointer-events-none">
                  Passionate about{" "}
                  <span className="text-white font-medium">
                    performance-first
                  </span>{" "}
                  development and building systems that scale seamlessly with
                  user growth.
                </p>
                <div className="mt-8 flex items-center gap-4 relative z-10 pointer-events-none">
                  <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono">
                    Available for new opportunities 2026
                  </span>
                </div>
              </motion.div>
            </div>
          </LayoutGroup>
        </div>

        {/* Ambient Bloom - Performance note: Blur is expensive, keeping at low opacity/static */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] bg-blue-600/2 blur-[200px] rounded-full pointer-events-none transform-gpu" />
      </section>
    </ReactLenis>
  );
};

export default TechnicalEcosystem;
