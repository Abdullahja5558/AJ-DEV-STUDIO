import { Metadata } from "next";
import AboutSection from "@/components/AboutSection";

export const metadata: Metadata = {
  title: "About Abdullah Javed (AJ) – Senior Full-Stack & Next.js Engineer",
  description:
    "Learn more about Abdullah Javed (AJ), a Bachelor of Computer Science graduate and Senior Full-Stack Developer specializing in Next.js, React, Node.js, Express, MongoDB, and UI/UX engineering.",
  keywords: [
    "About Abdullah Javed",
    "About AJ Developer",
    "Full-Stack Developer Biography",
    "Next.js Developer Pakistan",
    "MERN Stack Specialist",
    "React Expert",
    "Web Application Architecture",
    "UI UX Designer Portfolio",
  ],
  alternates: {
    canonical: "https://aj-code.vercel.app/about",
  },
  openGraph: {
    title: "About Abdullah Javed (AJ) – Full-Stack Developer",
    description:
      "Bachelor of Computer Science graduate & Senior Full-Stack Developer building fast, modern, and SEO-engineered web applications.",
    url: "https://aj-code.vercel.app/about",
    siteName: "AJ Developer Portfolio",
    type: "profile",
    images: [
      {
        url: "https://aj-code.vercel.app/about.jpeg",
        width: 800,
        height: 1000,
        alt: "Abdullah Javed - Senior Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Abdullah Javed (AJ) – Senior Full-Stack Engineer",
    description:
      "Explore the journey, certifications, and technical mastery of Abdullah Javed (AJ).",
    images: ["https://aj-code.vercel.app/about.jpeg"],
  },
};

export default function AboutPage() {
  return (
    <main id="about-content">
      <AboutSection />
    </main>
  );
}