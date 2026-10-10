import { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Abdullah Javed (AJ) – Hire Full-Stack & Next.js Developer",
  description:
    "Get in touch with Abdullah Javed (AJ) for freelance projects, full-time engineering roles, and custom web application development. Available for global collaboration.",
  keywords: [
    "Contact Abdullah Javed",
    "Hire Full-Stack Developer",
    "Hire Next.js Developer",
    "Freelance React Developer",
    "Web Developer Contact",
    "MERN Developer for Hire",
  ],
  alternates: {
    canonical: "https://aj-code.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Abdullah Javed (AJ) – Let's Collaborate",
    description:
      "Ready to build something legendary? Contact AJ for modern full-stack web applications, Next.js architecture, and UI/UX engineering.",
    url: "https://aj-code.vercel.app/contact",
    siteName: "AJ Developer Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Abdullah Javed (AJ) – Hire Senior Developer",
    description:
      "Connect directly with AJ to discuss high-impact web development and engineering projects.",
  },
};

export default function ContactPage() {
  return (
    <main id="contact-content">
      <ContactClient />
    </main>
  );
}
