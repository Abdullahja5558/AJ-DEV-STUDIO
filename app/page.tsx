import ExperienceTimeline from "@/components/CinematicTimeline";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

import Navbar from "@/components/Navbar";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ReviewsInfinite from "@/components/ReviewsInfinite";

import { TechnicalEcosystem } from "@/components/TechnicalEcosystem";

import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      {/* Main H1 for SEO and accessibility */}
      <h1
        style={{
          position: "absolute",
          left: "-9999px",
          height: "1px",
          width: "1px",
          overflow: "hidden",
        }}
      >
        AJ – Full Stack Developer | AJ Full Stack Developer | AJ Frontend
        Developer | Modern, Fast, SEO-Friendly Websites with React, Next.js,
        Node.js, Express.js, MongoDB, JavaScript
      </h1>
      <Hero />
      {/* Section H2s for hierarchy and SEO */}
      <h2
        style={{
          position: "absolute",
          left: "-9999px",
          height: "1px",
          width: "1px",
          overflow: "hidden",
        }}
      >
        Technical Skills and Ecosystem – Full Stack Developer, Frontend
        Developer, React, Next.js, Node.js, Express.js, MongoDB, JavaScript
      </h2>
      <TechnicalEcosystem />
      <h2
        style={{
          position: "absolute",
          left: "-9999px",
          height: "1px",
          width: "1px",
          overflow: "hidden",
        }}
      >
        Professional Experience Timeline – Full Stack Developer, Web
        Performance, UI/UX
      </h2>
      <ExperienceTimeline />
      <h2
        style={{
          position: "absolute",
          left: "-9999px",
          height: "1px",
          width: "1px",
          overflow: "hidden",
        }}
      >
        Featured Projects Showcase – Modern Website Design, SEO Friendly
        Websites, Full Stack Developer
      </h2>
      <ProjectsShowcase />
      <h2
        style={{
          position: "absolute",
          left: "-9999px",
          height: "1px",
          width: "1px",
          overflow: "hidden",
        }}
      >
        Client Reviews and Testimonials – React, Next.js, Full Stack Developer
      </h2>
      <ReviewsInfinite />
      <h2
        style={{
          position: "absolute",
          left: "-9999px",
          height: "1px",
          width: "1px",
          overflow: "hidden",
        }}
      >
        Contact and Collaboration – Hire a Full-Stack Developer, Modern Web
        Projects
      </h2>
      <ContactSection />
      <Footer />
    </>
  );
};

export default page;
