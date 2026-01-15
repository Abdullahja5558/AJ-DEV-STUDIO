"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  { name: "Alex Rivera", role: "CTO @ Nexus", text: "Architecture is clean, scalable, and resilient.", stars: 5 },
  { name: "Sarah Chen", role: "Design Lead", text: "An artist who happens to write world-class code.", stars: 5 },
  { name: "Marcus Thorne", role: "Founder, Aura", text: "Transformed our legacy engine into a masterpiece.", stars: 5 },
  { name: "Elena Rossi", role: "Director, Elysium", text: "Communication was surgical, execution was flawless.", stars: 5 },
  { name: "Julian Voss", role: "Lead Engineer", text: "Rare balance of UX and deep-level backend expertise.", stars: 5 },
  { name: "Sofia Zhang", role: "VP of Product", text: "A premium experience from first line to final delivery.", stars: 5 },
  { name: "David Miller", role: "CEO, Titan", text: "Surgical precision. Exactly what our project needed.", stars: 5 },
  { name: "Aria Smith", role: "Creative Director", text: "Attention to micro-interactions is world-class.", stars: 5 },
  { name: "Kevin Park", role: "Senior Architect", text: "Performance optimization saved us massive infra costs.", stars: 5 },
];

const ReviewCard = React.memo(({ review, opacity = 1 }: { review: typeof REVIEWS[0], opacity?: number }) => (
  <motion.div 
    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderColor: "rgba(6, 182, 212, 0.3)" }}
    className="w-full p-6 mb-4 rounded-[1.5rem] bg-white/[0.01] backdrop-blur-md border border-white/[0.04] flex flex-col justify-between transition-all duration-500 group relative transform-gpu"
    style={{ opacity, backfaceVisibility: "hidden" }}
  >
    <div className="relative z-10">
      <div className="flex gap-1 mb-4">
        {[...Array(review.stars)].map((_, i) => (
          <Star key={i} size={8} className="fill-cyan-500 text-cyan-500 drop-shadow-[0_0_3px_rgba(6,182,212,0.5)]" />
        ))}
      </div>
      <p className="text-white/60 text-base font-light leading-relaxed tracking-tight">
        “{review.text}”
      </p>
    </div>
    
    <div className="relative z-10 flex items-center gap-3 mt-6 pt-4 border-t border-white/[0.03]">
      <div className="h-[1px] w-4 bg-cyan-500/30" />
      <div>
        <h4 className="text-[9px] uppercase tracking-[0.3em] text-white font-black group-hover:text-cyan-400 transition-colors">
          {review.name}
        </h4>
        <p className="text-[8px] uppercase tracking-[0.2em] text-white/20 mt-0.5">
          {review.role}
        </p>
      </div>
    </div>
  </motion.div>
));

ReviewCard.displayName = "ReviewCard";

const Column = ({ reviews, speed, reverse = false, opacity = 1 }: { reviews: typeof REVIEWS, speed: number, reverse?: boolean, opacity?: number }) => {
  const doubledReviews = useMemo(() => [...reviews, ...reviews], [reviews]);

  return (
    <div className="relative h-full overflow-hidden" style={{ contain: 'strict' }}>
      <motion.div
        initial={{ y: reverse ? "-50%" : "0%" }}
        animate={{ y: reverse ? "0%" : "-50%" }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex flex-col px-2 will-change-transform transform-gpu"
      >
        {doubledReviews.map((review, i) => (
          <ReviewCard key={i} review={review} opacity={opacity} />
        ))}
      </motion.div>
    </div>
  );
};

export const ReviewsSection = () => {
  return (
    <section 
      className="relative h-[130vh] w-full bg-[#030014] overflow-hidden flex flex-col pt-32 pb-32" 
      id="reviews"
      style={{ contentVisibility: 'auto' }}
    >
      
      {/* Header */}
      <div className="w-full px-6 md:px-24 pt-12 md:pt-16 shrink-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="h-[1px] w-12 bg-cyan-500" />
              <span className="text-[10px] tracking-[1em] text-cyan-500 font-bold uppercase">REVIEWS</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
              Quiet <br /><span className="text-white/10 italic">Evidence.</span>
            </h2>
          </div>
          <div className="hidden md:block pb-2 opacity-20">
            <span className="text-[9px] tracking-[0.5em] uppercase text-white font-bold tracking-widest">System Authenticated</span>
          </div>
        </div>
      </div>

      {/* Grid Container - Added mt-20 md:mt-32 for extra space below heading */}
      <div className="relative flex-1 mt-20 md:mt-32 mb-8 px-4 md:px-24 overflow-hidden isolation-auto">
        
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#030014] to-transparent z-20 pointer-events-none transform-gpu" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#030014] to-transparent z-20 pointer-events-none transform-gpu" />
        
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#030014] to-transparent z-20 pointer-events-none opacity-40 transform-gpu" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#030014] to-transparent z-20 pointer-events-none opacity-40 transform-gpu" />

        <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4 max-w-7xl mx-auto">
          {/* Column 1 */}
          <div className="hidden md:block h-full">
            <Column reviews={REVIEWS.slice(0, 3)} speed={50} opacity={0.3} />
          </div>

          {/* Column 2 (Focus) */}
          <div className="z-10 h-full">
            <Column reviews={REVIEWS.slice(3, 6)} speed={40} reverse={true} />
          </div>

          {/* Column 3 */}
          <div className="hidden md:block h-full">
            <Column reviews={REVIEWS.slice(6, 9)} speed={60} opacity={0.3} />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      
    </section>
  );
};

export default ReviewsSection;