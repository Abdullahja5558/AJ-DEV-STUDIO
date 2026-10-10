import ExperienceTimeline from "@/components/CinematicTimeline";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LetsTalk from "@/components/LetsTalk";
import Navbar from "@/components/Navbar";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ReviewsInfinite from "@/components/ReviewsInfinite";
import { TechnicalEcosystem } from "@/components/TechnicalEcosystem";

export default function Page() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main id="main-content" tabIndex={-1}>
        <Hero />

        {/* Section: Technical Stack */}
        <section id="skills" aria-label="Technical Skills Ecosystem">
          <TechnicalEcosystem />
        </section>

        {/* Section: Experience Journey */}
        <section id="experience" aria-label="Career and Experience Timeline">
          <ExperienceTimeline />
        </section>

        {/* Section: Featured Projects Showcase */}
        <section id="projects" aria-label="Featured Engineering Projects">
          <ProjectsShowcase />
        </section>

        {/* Section: Client Testimonials */}
        <section id="testimonials" aria-label="Client Testimonials and Feedback">
          <ReviewsInfinite />
        </section>

        {/* Section: Call To Action */}
        <LetsTalk />
      </main>

      <Footer />
    </>
  );
}