"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { name: "Github", slug: "gh", color: "#ffffff", href: "https://github.com/Abdullahja5558" },
  { name: "WhatsApp", slug: "wa", color: "#25D366", href: "https://wa.me/923346932540?text=Hello%20AJ,%20I'd%20like%20to%20discuss%20a%20project." },
  { name: "Instagram", slug: "ig", color: "#E1306C", href: "https://www.instagram.com/mian.abdullah.9/" },
  { name: "Mail", slug: "em", color: "#ffffff", href: "mailto:ajdeveloperr@gmail.com" },
  { name: "LinkedIn", slug: "li", color: "#0077B5", href: "https://www.linkedin.com/in/abdullah-javed-a2b0b0396/" },
];

export const PremiumFooter = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      id="footer"
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-between py-28 px-6"
      style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
      aria-label="Footer section"
    >
      {/* SEO hidden text (helps search engines) */}
      <div className="sr-only">
        Premium developer footer by AJ. Contact links include GitHub, WhatsApp, Instagram and Email.
      </div>

      {/* Background (lighter for performance) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-900/10 rounded-full blur-2xl" />
      </div>

      {/* HEADER */}
      <header className="relative z-10 text-center max-w-5xl mx-auto">
        <p className="text-[10px] tracking-[0.6em] text-zinc-500 uppercase">
          Signature
        </p>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-6">
          Made with care by{" "}
          <span className="text-zinc-500 font-light italic">AJ</span>
        </h1>
      </header>

      {/* SOCIAL LINKS */}
      <section className="relative z-10 flex justify-center items-center">
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.slug}
              href={link.href}
              target={link.slug === "wa" || link.slug === "gh" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center gap-5"
              onMouseEnter={() => setHoveredNode(link.slug)}
              onMouseLeave={() => setHoveredNode(null)}
              aria-label={link.name}
            >
              {/* DOT (no framer motion = faster) */}
              <span
                className="w-3.5 h-3.5 rounded-full border transition-all duration-300 group-hover:scale-125"
                style={{
                  backgroundColor:
                    hoveredNode === link.slug ? link.color : "rgba(255,255,255,0.05)",
                  borderColor:
                    hoveredNode === link.slug ? link.color : "rgba(255,255,255,0.1)",
                  boxShadow:
                    hoveredNode === link.slug
                      ? `0 0 25px ${link.color}66`
                      : "none",
                }}
              />

              {/* PULSE (CSS instead of framer motion = faster FPS) */}
              <span className="absolute w-10 h-10 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />

              <span
                className={`text-[11px] tracking-[0.5em] uppercase font-bold transition-colors duration-300 ${
                  hoveredNode === link.slug ? "text-white" : "text-zinc-600"
                }`}
              >
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* BOTTOM */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full pt-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
          <p className="text-xs tracking-widest text-zinc-500 text-center md:text-left">
            Let’s build the future together.
          </p>

          <div className="text-center md:text-right space-y-2">
            <p className="text-xs text-white">Open to Roles</p>
            <p className="text-xs text-zinc-400">© {currentYear}</p>
            <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
              Architecting Digital Resilience
            </p>
          </div>
        </div>
      </footer>

      {/* IMPORTANT: removed heavy noise + heavy blur layers */}
    </footer>
  );
};

export default PremiumFooter;