import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Ms_Madi } from "next/font/google";
import React from "react";
import "./globals.css";

import CustomCursor from "@/components/CustomCursor";
import LoaderWrapper from "@/components/LoaderWrapper";
import AIAssistantWidget from "@/components/AIAssistantWidget";
import SmoothScroll from "@/components/SmoothScroll";
import { StructuredData } from "@/components/StructuredData";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const msMadi = Ms_Madi({
  variable: "--font-ms-madi",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#3B0007",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aj-code.vercel.app"),

  title: {
    default: "AJ – Senior Full-Stack Developer | React, Next.js, Node.js & MERN Expert",
    template: "%s | AJ Developer",
  },

  description:
    "Abdullah Javed (AJ) is a Senior Full-Stack MERN & Next.js Developer building high-performance, SEO-optimized, and visually stunning web applications with modern architectures.",

  keywords: [
    "Abdullah Javed",
    "AJ Developer",
    "Full Stack Developer",
    "Senior MERN Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MongoDB Expert",
    "TypeScript Developer",
    "SEO Friendly Websites",
    "Web Developer Portfolio",
    "Frontend Engineer",
    "Backend Engineer",
    "JavaScript Developer",
    "UI UX Engineering",
    "Web Performance Engineer",
    "Hire React Developer",
    "Hire Next.js Developer",
  ],

  authors: [{ name: "Abdullah Javed", url: "https://aj-code.vercel.app" }],
  creator: "Abdullah Javed",
  publisher: "AJ Code Studio",
  category: "technology",
  applicationName: "AJ Portfolio",

  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.png",
  },

  manifest: "/manifest.json",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://aj-code.vercel.app",
  },

  openGraph: {
    title: "AJ – Senior Full-Stack Developer & Next.js Expert",
    description:
      "Modern Full-Stack Developer crafting fast, responsive, and SEO-engineered web applications with Next.js, React, Node.js, and MongoDB.",
    url: "https://aj-code.vercel.app",
    siteName: "AJ Developer Portfolio",
    type: "website",
    images: [
      {
        url: "https://aj-code.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abdullah Javed (AJ) - Full-Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "AJ – Senior Full-Stack Developer",
    description:
      "React, Next.js, TypeScript & Node.js expert building high-performance digital products.",
    images: ["https://aj-code.vercel.app/og-image.jpg"],
    creator: "@ajdeveloperr",
  },

  verification: {
    google: "googlefc24be5cd256c9a9",
  },

  other: {
    "geo.region": "PK-PB",
    "geo.placename": "Punjab, Pakistan",
    "format-detection": "telephone=no",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "AJ.DEV",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {/* Structured Data (Schema.org Graph) */}
        <StructuredData />
      </head>

      <body
        className={`${bricolageGrotesque.className} ${bricolageGrotesque.variable} ${geistSans.variable} ${geistMono.variable} ${msMadi.variable} antialiased bg-[#3B0007] text-[#FAF4EC] selection:bg-[#DEBA75] selection:text-[#3B0007]`}
      >
        <SmoothScroll />

        <LoaderWrapper>
          <AIAssistantWidget />
          <CustomCursor />
          {children}
        </LoaderWrapper>
      </body>
    </html>
  );
}