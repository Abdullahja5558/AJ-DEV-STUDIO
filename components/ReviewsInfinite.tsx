"use client";
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Lenis from "lenis";
import { Quote, Sparkles, Star } from "lucide-react";

const reviews = [
  { 
    name: "Alex Rivera", 
    role: "Product Manager", 
    text: <>Exceptional frontend work. The <span className="bg-zinc-800 text-white dark:bg-white dark:text-black px-2 py-0.5 font-semibold mx-1 rounded">Next.js optimization</span> improved our LCP by 40%.</>, 
    company: "Global Tech" 
  },
  { 
    name: "Sarah Chen", 
    role: "UI/UX Designer", 
    text: <>Translated my Figma designs into <span className="bg-zinc-800 text-white dark:bg-white dark:text-black px-2 py-0.5 font-semibold mx-1 rounded">pixel-perfect code</span>. The attention to detail is unmatched.</>, 
    company: "Creative Studio" 
  },
  { 
    name: "James Watt", 
    role: "Startup Founder", 
    text: <>Fixed complex <span className="bg-zinc-800 text-white dark:bg-white dark:text-black px-2 py-0.5 font-semibold mx-1 rounded">state management bugs</span> in hours. A true TS expert.</>, 
    company: "NextGen" 
  },
  {
    name: "Emily Davis",
    role: "CTO",
    text: <>Implemented a custom <span className="bg-zinc-800 text-white dark:bg-white dark:text-black px-2 py-0.5 font-semibold mx-1 rounded">SSR caching strategy</span> that reduced server costs by 30%.</>,
    company: "Tech Innovators"  
  },
  {
    name: "Michael Johnson",
    role: "Lead Developer",
    text: <>The <span className="bg-zinc-800 text-white dark:bg-white dark:text-black px-2 py-0.5 font-semibold mx-1 rounded">code quality and architecture</span> are top-notch. Seamless onboarding.</>,
    company: "CodeCraft"  
  },
];

interface Review {
  name: string;
  role: string;
  text: React.ReactNode;
  company: string;
}

const ReviewCard = ({ 
  review, 
  index, 
  total, 
  scrollYProgress 
}: { 
  review: Review; 
  index: number; 
  total: number; 
  scrollYProgress: MotionValue<number>; 
}) => {
  const animationStart = 0.2; 
  const step = (1 - animationStart) / total;
  const start = animationStart + (index * step);
  const end = start + step;

  const yRaw = useTransform(scrollYProgress, [start, end], [0, -1200]);
  const y = useSpring(yRaw, { stiffness: 40, damping: 30 });
  const rotate = useTransform(scrollYProgress, [start, end], [0, index % 2 === 0 ? -10 : 10]);
  const scale = useTransform(scrollYProgress, [start, end], [1 - (total - index) * 0.04, 1]);
  const opacity = useTransform(scrollYProgress, [end - 0.05, end], [1, 0]);

  // Alternating background colors: even index = clean white, odd index = deep dark
  const isWhiteBg = index % 2 === 0;

  return (
    <motion.figure
      style={{ 
        y: index === total - 1 ? 0 : y, 
        rotate: index === total - 1 ? 0 : rotate,
        scale,
        opacity: index === total - 1 ? 1 : opacity,
        zIndex: total - index 
      }}
      className={`absolute w-full h-full p-8 md:p-12 flex flex-col justify-between rounded-[2.5rem] md:rounded-[3.5rem] border shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transition-colors duration-300 ${
        isWhiteBg 
          ? "bg-white text-zinc-900 border-zinc-200" 
          : "bg-[#0c0c0c] text-white border-white/10"
      }`}
    >
      <div className={`absolute inset-0 pointer-events-none ${isWhiteBg ? "bg-gradient-to-br from-black/[0.01] to-transparent" : "bg-gradient-to-br from-white/[0.02] to-transparent"}`} aria-hidden="true" />
      <Quote size={100} className={`absolute -top-4 -right-4 pointer-events-none ${isWhiteBg ? "text-black opacity-[0.02]" : "text-white opacity-[0.02]"}`} aria-hidden="true" />

      {/* Header section with rating and counter */}
      <div className="z-10 flex flex-col gap-6 mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5" aria-label="5 star rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
            ))}
          </div>
          <span className={`text-xs font-mono font-medium tracking-wider ${isWhiteBg ? "text-zinc-400" : "text-zinc-600"}`}>
            0{index + 1} / 0{total}
          </span>
        </div>
        
        <blockquote className={`text-xl md:text-[2.2vw] font-normal leading-[1.3] tracking-tight m-0 ${isWhiteBg ? "text-zinc-800" : "text-zinc-100"}`}>
          "{review.text}"
        </blockquote>
      </div>

      {/* Footer section with author details */}
      <figcaption className={`z-10 flex items-center justify-between border-t pt-6 mt-4 ${isWhiteBg ? "border-zinc-200" : "border-white/10"}`}>
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-base shadow-sm ${
            isWhiteBg ? "bg-zinc-100 text-zinc-900 border border-zinc-200" : "bg-zinc-900 text-white border border-zinc-800"
          }`}>
            {review.name.charAt(0)}
          </div>
          <div>
            <h4 className={`text-lg md:text-xl font-bold tracking-tight leading-snug uppercase ${isWhiteBg ? "text-zinc-900" : "text-white"}`}>
              {review.name}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xs font-medium tracking-wide ${isWhiteBg ? "text-zinc-600" : "text-zinc-400"}`}>
                {review.role}
              </span>
              <span className={`text-xs ${isWhiteBg ? "text-zinc-300" : "text-zinc-700"}`}>•</span>
              <span className={`text-xs font-medium tracking-wide ${isWhiteBg ? "text-zinc-500" : "text-zinc-500"}`}>
                {review.company}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
           <span className={`text-xs font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-md ${isWhiteBg ? "bg-zinc-100 text-zinc-500" : "bg-zinc-900 text-zinc-400"}`}>
             Verified Client
           </span>
        </div>
      </figcaption>
    </motion.figure>
  );
};

export const Testimonials = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      ref={containerRef} 
      className="bg-black relative selection:bg-white selection:text-black"
      aria-labelledby="testimonials-heading"
    >
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black relative z-20 px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4 bg-zinc-900/80 border border-zinc-800 px-4 py-1.5 rounded-full shadow-inner">
            <Sparkles size={14} className="text-amber-400" aria-hidden="true" />
            <span className="text-zinc-300 text-[10px] font-black uppercase tracking-[0.4em]">Verified Testimonials</span>
          </div>
          <h2 id="testimonials-heading" className="text-6xl md:text-[11vw] font-black text-white leading-[0.85] tracking-[-0.04em] uppercase">
            VOICES <br />
            <span className="text-zinc-800 italic font-outline">That Matter.</span>
          </h2>
          <p className="text-zinc-500 mt-10 text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">Scroll down to explore feedback</p>
      </div>

      <div className="relative h-[450vh]"> 
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6">
          <div className="relative w-full max-w-4xl h-[400px] md:h-[480px]">
            {reviews.map((review, index) => (
              <ReviewCard 
                key={index} 
                review={review} 
                index={index} 
                total={reviews.length} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-outline {
          -webkit-text-stroke: 1.5px #27272a;
          color: transparent;
        }
        @media (min-width: 768px) {
          .font-outline { -webkit-text-stroke: 2px #27272a; }
        }
      `}</style>

      <style jsx global>{`
        html.lenis {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }
        ::selection { background-color: #fff !important; color: #000 !important; }
      `}</style>
    </section>
  );
};

export default Testimonials;