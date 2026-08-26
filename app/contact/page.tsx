"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#000000] text-white selection:bg-white selection:text-black">
      
      {/* Premium Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <button className="group relative px-5 py-2.5 overflow-hidden rounded-xl border border-white/10 backdrop-blur-md transition-all duration-700 active:scale-95">
            <span className="relative z-30 flex items-center gap-2 text-zinc-500 font-bold tracking-widest uppercase text-[9px] group-hover:text-black transition-colors duration-500">
              <ChevronLeft size={14} className="group-hover:translate-x-[-2px] transition-transform duration-500" /> 
              Back
            </span>
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute top-[150%] left-1/2 -translate-x-1/2 w-[180%] aspect-square bg-white rounded-[40%] transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-[-50%] group-hover:rotate-140" />
            </div>
          </button>
        </Link>
      </div>

      {/* Render the contact section with all its EmailJS logic intact */}
      <ContactSection />
    </main>
  );
}
