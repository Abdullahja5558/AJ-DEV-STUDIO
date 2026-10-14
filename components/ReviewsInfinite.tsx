"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Quote, Sparkles, Star } from "lucide-react";

interface Review {
  name: string;
  role: string;
  text: string;
  company: string;
}

const reviews: Review[] = [
  { 
    name: "Alex Rivera", 
    role: "Product Manager", 
    text: "Exceptional frontend work. The Next.js optimization improved our LCP by 40%.", 
    company: "Global Tech" 
  },
  { 
    name: "Sarah Chen", 
    role: "UI/UX Designer", 
    text: "Translated my Figma designs into pixel-perfect code. The attention to detail is unmatched.", 
    company: "Creative Studio" 
  },
  { 
    name: "James Watt", 
    role: "Startup Founder", 
    text: "Fixed complex state management bugs in hours. A true TS expert.", 
    company: "NextGen" 
  },
  {
    name: "Emily Davis",
    role: "CTO",
    text: "Implemented a custom SSR caching strategy that reduced server costs by 30%.",
    company: "Tech Innovators"  
  },
  {
    name: "Michael Johnson",
    role: "Lead Developer",
    text: "The code quality and architecture are top-notch. Seamless onboarding.",
    company: "CodeCraft"  
  },
];

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
  const isLast = index === total - 1;

  // Step allocation for cards peel-away
  const step = 0.85 / (total - 1);
  const start = index * step;
  const end = Math.min(start + step * 0.92, 1);

  // Card movement: flies up and rotates cleanly
  const y = useTransform(scrollYProgress, [start, end], [0, -820]);
  const rotate = useTransform(scrollYProgress, [start, end], [0, index % 2 === 0 ? -7 : 7]);
  const opacity = useTransform(scrollYProgress, [end - 0.08, end], [1, 0]);

  // Card scale:
  // Card 0 starts at scale 1.
  // Cards behind scale up from 0.95 to 1.0 as the preceding card peels off.
  const prevStart = Math.max(0, (index - 1) * step);
  const prevEnd = Math.min(prevStart + step * 0.92, 1);
  const scaleUp = useTransform(scrollYProgress, [prevStart, prevEnd], [0.95, 1]);

  const scale = index === 0 ? 1 : scaleUp;

  // Alternating themes: even index = champagne cream, odd index = deep burgundy
  const isWhiteBg = index % 2 === 0;

  return (
    <motion.figure
      style={{ 
        y: isLast ? 0 : y, 
        rotate: isLast ? 0 : rotate,
        scale: isLast ? scaleUp : scale,
        opacity: isLast ? 1 : opacity,
        zIndex: (total - index) * 10
      }}
      className={`absolute inset-0 p-6 sm:p-8 md:p-12 flex flex-col justify-between rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.2rem] border overflow-hidden transition-colors duration-300 select-none will-change-transform ${
        isWhiteBg 
          ? "!bg-[#FAF4EC] !text-[#000000] border-[#E2E8F0]/35 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
          : "!bg-[#0A0A0A] !text-[#FAF4EC] border-[#E2E8F0]/25 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
      }`}
    >
      {/* Decorative gradient overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none ${isWhiteBg ? "bg-gradient-to-br from-black/[0.02] to-transparent" : "bg-gradient-to-br from-[#E2E8F0]/[0.03] to-transparent"}`} 
        aria-hidden="true" 
      />

      {/* Background quote mark */}
      <Quote 
        className={`absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 pointer-events-none ${isWhiteBg ? "text-[#000000] opacity-[0.04]" : "text-[#E2E8F0] opacity-[0.04]"}`} 
        aria-hidden="true" 
      />

      {/* Header section with rating and counter */}
      <div className="z-10 flex flex-col gap-4 sm:gap-6 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-1.5" aria-label="5 star verified rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E2E8F0] fill-current" />
            ))}
          </div>
          <span className={`text-[11px] sm:text-xs font-mono font-bold tracking-wider ${isWhiteBg ? "text-black/60" : "text-[#E2E8F0]/60"}`}>
            0{index + 1} / 0{total}
          </span>
        </div>
        
        <blockquote className={`text-base sm:text-xl md:text-2xl lg:text-[2vw] font-normal leading-snug sm:leading-relaxed tracking-tight m-0 !bg-transparent ${isWhiteBg ? "text-[#000000]" : "text-[#FAF4EC]"}`}>
          &ldquo;{review.text}&rdquo;
        </blockquote>
      </div>

      {/* Footer section with author details */}
      <figcaption className={`z-10 flex items-center justify-between border-t pt-4 sm:pt-6 mt-3 sm:mt-4 !bg-transparent ${isWhiteBg ? "border-[#E2E8F0]/25" : "border-[#E2E8F0]/15"}`}>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shrink-0 ${
            isWhiteBg ? "bg-[#000000] text-[#FAF4EC] border border-[#E2E8F0]/30" : "bg-[#0A0A0A] text-[#E2E8F0] border border-[#E2E8F0]/25"
          }`}>
            {review.name.charAt(0)}
          </div>
          <div>
            <h4 className={`text-base sm:text-lg md:text-xl font-bold tracking-tight leading-snug uppercase !bg-transparent ${isWhiteBg ? "text-[#000000]" : "text-[#FAF4EC]"}`}>
              {review.name}
            </h4>
            <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
              <span className={`text-[10px] sm:text-xs font-medium tracking-wide !bg-transparent ${isWhiteBg ? "text-neutral-600" : "text-[#D4C3B3]"}`}>
                {review.role}
              </span>
              <span className={`text-[10px] sm:text-xs ${isWhiteBg ? "text-[#E2E8F0]" : "text-[#E2E8F0]/40"}`}>•</span>
              <span className={`text-[10px] sm:text-xs font-medium tracking-wide !bg-transparent ${isWhiteBg ? "text-neutral-500" : "text-[#D4C3B3]/70"}`}>
                {review.company}
              </span>
            </div>
          </div>
        </div>

        <div>
          <span className={`text-[9px] sm:text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-bold ${isWhiteBg ? "bg-black/10 text-[#000000]" : "bg-[#E2E8F0]/10 text-[#E2E8F0]"}`}>
            Verified
          </span>
        </div>
      </figcaption>
    </motion.figure>
  );
};

export const Testimonials = () => {
  const cardsTrackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardsTrackRef,
    offset: ["start start", "end end"]
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Verified Client Testimonials",
    "description": "Client reviews and feedback for Abdullah Javed (AJ), Senior Full-Stack MERN & Next.js Developer.",
    "itemListElement": reviews.map((r, i) => ({
      "@type": "Review",
      "position": i + 1,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": r.name,
        "jobTitle": r.role
      },
      "reviewBody": r.text,
      "publisher": {
        "@type": "Organization",
        "name": r.company
      }
    }))
  };

  return (
    <section 
      className="bg-[#000000] relative selection:bg-[#E2E8F0] selection:text-[#000000]"
      aria-labelledby="testimonials-heading"
    >
      {/* Schema.org Reviews structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Header Viewport Screen */}
      <div className="w-full min-h-[55vh] sm:min-h-[70vh] md:h-screen flex flex-col items-center justify-center bg-[#000000] relative z-20 px-4 sm:px-6 py-20 sm:py-24 text-center">
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-4 bg-[#0A0A0A] border border-[#E2E8F0]/25 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full">
          <Sparkles size={13} className="text-[#E2E8F0]" aria-hidden="true" />
          <span className="text-[#E2E8F0] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Verified Testimonials</span>
        </div>
        <h2 id="testimonials-heading" className="text-5xl sm:text-6xl md:text-[9vw] lg:text-[10vw] font-black text-[#FAF4EC] leading-[0.88] tracking-[-0.04em] uppercase">
          VOICES <br />
          <span className="font-outline italic text-transparent">That Matter.</span>
        </h2>
        <p className="text-[#E2E8F0] mt-8 sm:mt-10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.35em] sm:tracking-[0.4em] animate-pulse">
          Scroll down to explore feedback
        </p>
      </div>

      {/* Cards Sticky Stack Track */}
      <div ref={cardsTrackRef} className="relative h-[300vh] sm:h-[340vh] md:h-[360vh]"> 
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6">
          <div className="relative w-full max-w-4xl h-[380px] sm:h-[420px] md:h-[460px]">
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
          -webkit-text-stroke: 1.5px rgba(226, 232, 240, 0.45);
          color: transparent;
        }
        @media (min-width: 768px) {
          .font-outline { -webkit-text-stroke: 2px rgba(226, 232, 240, 0.45); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;