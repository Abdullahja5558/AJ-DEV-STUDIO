"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

const reviews = [
  { name: "Alex Rivera", role: "Product Manager", text: "Exceptional frontend work. The Next.js optimization improved our LCP by 40%.", stars: 5 },
  { name: "Sarah Chen", role: "UI/UX Designer", text: "Translated my Figma designs into pixel-perfect code. Highly recommended!", stars: 5 },
  { name: "James Watt", role: "Startup Founder", text: "Fixed complex state management bugs in hours. A true TS expert.", stars: 5 },
  { name: "Lina Ghouri", role: "Web Lead", text: "Clean, modular code and great communication throughout the project.", stars: 5 },
  { name: "David Beck", role: "Creative Director", text: "The animations are buttery smooth. Premium quality frontend development.", stars: 5 },
  { name: "M. Usman", role: "Full Stack Dev", text: "Great eye for UI detail. His code is easy to scale and maintain.", stars: 5 },
  { name: "Emma Wilson", role: "Marketing Head", text: "Delivered a high-converting landing page with amazing load speeds.", stars: 5 },
  { name: "Ryan Goss", role: "App Developer", text: "Collaborative and skilled. Solved our responsive design issues perfectly.", stars: 5 },
  { name: "Sofia Lee", role: "Founder", text: "Transformed our slow site into a lightning-fast experience. 10/10.", stars: 5 },
];

const ReviewCard = ({ name, role, text, stars }: any) => (
  <div className="py-8 px-6 mb-6 select-none group transition-all duration-500 hover:bg-white/[0.04] rounded-3xl border border-transparent hover:border-white/5 bg-white/[0.01]">
    <div className="flex gap-1 mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
      {[...Array(stars)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-cyan-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-gray-400 text-lg md:text-xl font-medium mb-6 leading-relaxed group-hover:text-gray-100 transition-colors">
      "{text}"
    </p>
    <div className="flex items-center gap-4">
        <div className="h-[1px] w-8 bg-purple-500/50 group-hover:w-12 transition-all duration-500"></div>
        <div>
          <h4 className="text-white font-bold text-sm tracking-wide">{name}</h4>
          <p className="text-cyan-400/80 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{role}</p>
        </div>
    </div>
  </div>
);

const ReviewColumn = ({ items, reverse = false, speed = 40 }: { items: any[], reverse?: boolean, speed?: number }) => (
  <div className="relative overflow-hidden h-full flex flex-col">
    <motion.div 
      initial={{ y: reverse ? "-50%" : "0%" }}
      animate={{ y: reverse ? "0%" : "-50%" }}
      transition={{ 
        duration: speed, 
        repeat: Infinity, 
        ease: "linear",
        // Force GPU acceleration
        repeatType: "loop"
      }}
      className="flex flex-col flex-1 min-w-[300px] lg:min-w-[350px]"
    >
      {/* Doubling items for seamless loop */}
      {[...items, ...items].map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
    </motion.div>
  </div>
);

const ReviewSection = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <section className="bg-[#030616] py-24 md:py-32 px-6 md:px-20 overflow-hidden relative">
      
      <div className="max-w-7xl mx-auto mb-20 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-cyan-500"></div>
          <span className="text-cyan-400 text-[11px] font-black uppercase tracking-[0.6em]">
            Testimonials
          </span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
          Client <br />
          <span className="text-white/10">Reviews.</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto h-[600px] md:h-[800px] relative">
        {/* Top & Bottom Gradient Fades (The "Premium" Touch) */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030616] to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030616] to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 md:gap-12 h-full">
          {/* Col 1 */}
          <ReviewColumn items={reviews.slice(0, 3)} speed={35} />
          
          {/* Col 2 */}
          <div className="hidden md:flex flex-1">
            <ReviewColumn items={reviews.slice(3, 6)} reverse speed={45} />
          </div>
          
          {/* Col 3 */}
          <div className="hidden lg:flex flex-1">
            <ReviewColumn items={reviews.slice(6, 9)} speed={40} />
          </div>
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default ReviewSection;