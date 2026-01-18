"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PremiumLoader from "./PremiumLoader";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      
      document.body.style.cursor = "none";
     
      document.body.style.overflow = "hidden";
    } else {

      document.body.style.cursor = "default";
      document.body.style.overflow = "auto";
    }

    
    return () => {
      document.body.style.cursor = "default";
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <PremiumLoader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
     
      <div 
        style={{ 
          visibility: isLoading ? "hidden" : "visible",
          cursor: isLoading ? "none" : "default" 
        }}
      >
        {!isLoading && children}
      </div>
    </>
  );
}