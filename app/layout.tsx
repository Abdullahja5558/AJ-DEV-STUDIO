import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
// Loader import karein

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AJ - Frontend Developer",
  icons: {
    icon: "/favicon.png",
  },
  description: "I'm AJ, a frontend developer specializing in modern, fast, and SEO-friendly websites using React, Next.js, HTML, CSS, TS , JavaScript and other modern technologies. Available for freelance and remote work.",
  verification: {
    google: "3G_g9TJY5PBgQrGx31hcPNA_V3tEOWNugGnAEGeOQPY",
  },
    keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Portfolio",
    "Modern Website Design",
    "SEO Friendly Websites",
    "JavaScript Developer",
    "TypeScript Developer",
    "Freelance Web Developer",
    "Remote Frontend Developer",
    "AJ Code",
    "AJ Portfolio",
    "AJ Frontend",
    "Web Development Services",
    "Responsive Web Design",
    "UI/UX Developer",
    "Single Page Applications",
    "Progressive Web Apps",
    "Web Performance Optimization",
    "Cross-Browser Compatibility",
    "AJ Developer",
    "AJ Web Solutions",
    "AJ Tech",
    "AJ Coding",
    "AJ Software",
    "AJ Digital",
    "AJ Innovations",
    "AJ Creations",
    "AJ Designs",
    "AJ Dev",
    "AJ Frontend Dev",
    "AJ Web Dev",
    "AJ Next.js",
    "AJ React",
    "AJ JavaScript",
    "AJ TypeScript",
    "AJ HTML CSS",
    "AJ Freelance",
    "AJ Remote Work", 
    "AJ Portfolio",
    "AJ Frontend",
    "AJ Web Development Services",
    "AJ Responsive Web Design",
    "AJ UI/UX Developer",
    "AJ Single Page Applications",
    "AJ Progressive Web Apps",  
  ],
  authors: [{ name: "AJ", url: "https://aj-portfolio.vercel.app/" }],

    openGraph: {
    title: "AJ – Frontend Developer",
    description:
      "Modern frontend developer building fast, responsive, and SEO-optimized websites with React and Next.js.",
    url: "https://aj-code.vercel.app",
    siteName: "AJ Code",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
       
         
        
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}