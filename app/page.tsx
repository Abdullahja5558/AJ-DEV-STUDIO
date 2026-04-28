import ExperienceTimeline from "@/components/CinematicTimeline";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Name from "@/components/Name";
import Navbar from "@/components/Navbar";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ReviewsInfinite from "@/components/ReviewsInfinite";
import { TechnicalEcosystem } from "@/components/TechnicalEcosystem";

export default function Page() {
  return (
    <>
      <Navbar />

      {/* REAL H1 (VISIBLE - IMPORTANT FOR SEO) */}
      <section>
        <h1 className="sr-only">
          AJ – Full Stack Developer Portfolio
        </h1>
      </section>

      <Hero />

      {/* SECTION STRUCTURE (REAL SEO IMPROVEMENT) */}
      <section aria-label="Skills">
        <h2 className="sr-only">Technical Skills</h2>
        <TechnicalEcosystem />
      </section>

      <section aria-label="Experience">
        <h2 className="sr-only">Professional Experience</h2>
        <ExperienceTimeline />
      </section>

      <section aria-label="Projects">
        <h2 className="sr-only">Featured Projects</h2>
        <ProjectsShowcase />
      </section>

      <section aria-label="Reviews">
        <h2 className="sr-only">Client Testimonials</h2>
        <ReviewsInfinite />
      </section>

      <section aria-label="Contact">
        <h2 className="sr-only">Contact Developer</h2>
        <ContactSection />
      </section>

      <Footer />

    </>
  );
}