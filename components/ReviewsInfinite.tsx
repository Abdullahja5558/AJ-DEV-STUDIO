"use client";
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Lenis from "lenis";
import { Quote, Sparkles } from "lucide-react";

const reviews = [
  { 
    name: "Alex Rivera", 
    role: "Product Manager", 
    text: <>Exceptional frontend work. The <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">Next.js optimization</span> improved our LCP by 40%.</>, 
    company: "Global Tech" 
  },
  { 
    name: "Sarah Chen", 
    role: "UI/UX Designer", 
    text: <>Translated my Figma designs into <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">pixel-perfect code</span>. The attention to detail is unmatched.</>, 
    company: "Creative Studio" 
  },
  { 
    name: "James Watt", 
    role: "Startup Founder", 
    text: <>Fixed complex <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">state management bugs</span> in hours. A true TS expert.</>, 
    company: "NextGen" 
  },
  {
    name: "Emily Davis",
    role: "CTO",
    text: <>Implemented a custom <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">SSR caching strategy</span> that reduced server costs by 30%.</>,
    company: "Tech Innovators"  
  },
  {
    name: "Michael Johnson",
    role: "Lead Developer",
    text: <>The <span className="bg-white text-black px-2 py-0.5 font-bold mx-1">code quality and architecture</span> are top-notch. Seamless onboarding.</>,
    company: "CodeCraft"  
  }
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
  const rotate = useTransform(scrollYProgress, [start, end], [0, index % 2 === 0 ? -15 : 15]);
  const scale = useTransform(scrollYProgress, [start, end], [1 - (total - index) * 0.04, 1]);
  const opacity = useTransform(scrollYProgress, [end - 0.05, end], [1, 0]);

  return (
    <motion.div
      style={{ 
        y: index === total - 1 ? 0 : y, 
        rotate: index === total - 1 ? 0 : rotate,
        scale,
        opacity: index === total - 1 ? 1 : opacity,
        zIndex: total - index 
      }}
      className="absolute w-full h-full p-10 md:p-20 flex flex-col justify-between rounded-[4rem] md:rounded-[5rem] border border-white/10 bg-[#0a0a0a] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <Quote size={200} className="absolute -top-12 -right-12 text-white opacity-[0.02] pointer-events-none" />
      
      <div className="z-10 flex flex-col gap-8">
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-[#fbbf24] fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <h3 className="text-2xl md:text-[3.5vw] font-medium text-white leading-[1.2] tracking-tight italic">
          "{review.text}"
        </h3>
      </div>

      <div className="z-10 flex justify-between items-end border-t border-white/5 pt-10">
        <div className="space-y-3">
          <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-none uppercase">{review.name}</h4>
          <div className="flex items-center gap-3">
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">{review.role}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{review.company}</span>
          </div>
        </div>
        <div className="hidden md:block">
           <span className="text-8xl font-black text-white/[0.03] select-none font-mono tracking-tighter leading-none">0{index + 1}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Lenis Configuration for Ultra Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for premium feel
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
    <section ref={containerRef} className="bg-black relative selection:bg-white selection:text-black">
      
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black relative z-20 px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sparkles size={16} className="text-zinc-500" />
            <span className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.8em]">Client Feedback</span>
          </div>
          <h2 className="text-7xl md:text-[12vw] font-black text-white leading-[0.8] tracking-[-0.05em] uppercase">
            VOICES <br />
            <span className="text-zinc-900 italic font-outline">That Matter.</span>
          </h2>
          <p className="text-zinc-600 mt-12 text-[9px] uppercase tracking-[0.5em] animate-pulse">Scroll to Unstack Reviews</p>
      </div>

      <div className="relative h-[450vh]"> 
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6">
          <div className="relative w-full max-w-6xl h-[500px] md:h-[620px]">
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

      <style jsx global>{`
        /* Essential for Lenis smooth scrolling */
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

        .font-outline {
          -webkit-text-stroke: 1.5px #27272a;
          color: transparent;
        }
        @media (min-width: 768px) {
          .font-outline { -webkit-text-stroke: 2px #27272a; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;