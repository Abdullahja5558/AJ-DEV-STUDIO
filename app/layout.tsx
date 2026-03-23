import type { Metadata } from "next";
import { Geist, Geist_Mono, Ms_Madi } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LoaderWrapper from "@/components/LoaderWrapper";
import ScrollIndicator from "@/components/ScrollIndicator";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const msMadi = Ms_Madi({
  variable: "--font-ms-madi",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title:
    "AJ – Frontend Developer | Modern, Fast, SEO-Friendly Websites with React, Next.js, HTML, CSS, JavaScript",
  icons: {
    icon: "/favicon.png",
  },
  description:
    "AJ is a frontend developer specializing in modern, fast, and SEO-friendly websites using React, Next.js, HTML, CSS, and JavaScript. Expert in web performance, responsive design, and UI/UX best practices.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "SEO Friendly Websites",
    "Modern Website Design",
    "HTML CSS JavaScript",
    "Web Performance Optimization",
    "Responsive Web Design",
    "UI/UX Developer",
    "Web Developer Portfolio",
    "AJ Developer",
    "Freelance Frontend Developer",
    "Remote Web Developer",
    "JavaScript Developer",
    "Progressive Web Apps",
    "Mobile App Development",
    "React Native Developer",
    "Android Developer",
    "iOS Developer",
    "UX/UI Designer",
    "Graphic Designer",
    "Web Developer",
    "Frontend Web Developer",
  ],
  authors: [{ name: "Abdullah Javed" }],
  openGraph: {
    title:
      "AJ – Frontend Developer | Modern, Fast, SEO-Friendly Websites with React, Next.js, HTML, CSS, JavaScript",
    description:
      "Modern frontend developer building fast, responsive, and SEO-optimized websites with React, Next.js, HTML, CSS, and JavaScript.",
    url: "https://aj-code.vercel.app",
    siteName: "AJ Code",
    type: "website",
  },
};

import { StructuredData } from "@/components/StructuredData";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressContentEditableWarning={true}
      suppressHydrationWarning={true}
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${msMadi.variable} antialiased`}
      >
        <SmoothScroll />

        <LoaderWrapper>
          <ScrollIndicator />
          <CustomCursor />
          {children}
        </LoaderWrapper>
      </body>
    </html>
  );
}
