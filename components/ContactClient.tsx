"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ContactSection from "@/components/ContactSection";

export default function ContactClient() {
  return (
    <div className="relative min-h-screen w-full bg-[#3B0007] text-[#FAF4EC] selection:bg-[#DEBA75] selection:text-[#3B0007]">
      {/* Premium Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" aria-label="Return to Homepage">
          <button 
            type="button"
            className="group relative px-5 py-2.5 overflow-hidden rounded-xl border border-[#DEBA75]/30 bg-[#3B0007]/60 backdrop-blur-md transition-all duration-700 active:scale-95 cursor-pointer"
          >
            <span className="relative z-30 flex items-center gap-2 text-[#DEBA75] font-bold tracking-widest uppercase text-[9px] group-hover:text-[#3B0007] transition-colors duration-500">
              <ChevronLeft size={14} className="group-hover:translate-x-[-2px] transition-transform duration-500" /> 
              Back
            </span>
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute top-[150%] left-1/2 -translate-x-1/2 w-[180%] aspect-square bg-[#DEBA75] rounded-[40%] transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-[-50%] group-hover:rotate-140" />
            </div>
          </button>
        </Link>
      </div>

      {/* Interactive Contact Terminal & Form */}
      <ContactSection />
    </div>
  );
}
