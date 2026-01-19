import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LoaderWrapper from "@/components/LoaderWrapper";
import ScrollIndicator from "@/components/ScrollIndicator";

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
  description:
    "I'm AJ, a frontend developer specializing in modern, fast, and SEO-friendly websites using React, Next.js, HTML, CSS, JavaScript and other technologies. I specialize in building responsive, user-friendly websites that deliver seamless experiences to our usersAvailable for freelance and remote work.",
      keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Portfolio",
    "Modern Website Design",
    "SEO Friendly Websites",
    "AJ Developer",
    "Freelance Frontend Developer",
    "Remote Web Developer",
    "JavaScript Developer",
    "HTML CSS JavaScript",
    "Responsive Web Design",
    "UI/UX Developer",
    "Web Performance Optimization",
    "Progressive Web Apps",
    "Mobile App Development",
    "React Native Developer",
    "Android Developer",
    "iOS Developer",
    "UX/UI Designer",
    "Graphic Designer",
    "Web Developer",
    "Frontend Engineer",
    "Frontend Developer",
    "Frontend Web Developer",
  ],
   authors: [{ name: "Abdullah Javed" }],
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
        
       
        <LoaderWrapper>
        <ScrollIndicator />
          <CustomCursor /> 
          {children}
        </LoaderWrapper>

      </body>
    </html>
  );
}