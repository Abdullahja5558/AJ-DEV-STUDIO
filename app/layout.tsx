import type { Metadata } from "next";
import { Geist, Geist_Mono, Ms_Madi } from "next/font/google";


import CustomCursor from "@/components/CustomCursor";
import LoaderWrapper from "@/components/LoaderWrapper";
import ScrollIndicator from "@/components/ScrollIndicator";
import SmoothScroll from "@/components/SmoothScroll";
import { StructuredData } from "@/components/StructuredData";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://aj-code.vercel.app"),

  title: {
    default:
      "AJ – Full-Stack Developer | React, Next.js, Node.js, MongoDB Expert",
    template: "%s | AJ Code",
  },

  description:
    "AJ is a Full-Stack Developer building fast, SEO-friendly, and modern websites using React, Next.js, Node.js, Express.js, MongoDB, and JavaScript.",

  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MongoDB Developer",
    "SEO Friendly Websites",
    "Web Developer Portfolio",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "UI UX Developer",
  ],

  authors: [{ name: "Abdullah Javed" }],
  creator: "AJ",
  publisher: "AJ Code",

  icons: {
    icon: "/favicon.png",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://aj-code.vercel.app",
  },

  openGraph: {
    title: "AJ – Full-Stack Developer Portfolio",
    description:
      "Modern Full-Stack Developer building fast, responsive, SEO-optimized websites.",
    url: "https://aj-code.vercel.app",
    siteName: "AJ Code",
    type: "website",
    images: [
      {
        url: "https://aj-code.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AJ Developer Portfolio",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "AJ – Full-Stack Developer",
    description:
      "React, Next.js, Node.js expert building modern web apps.",
    images: ["https://aj-code.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        {/* Structured Data (Schema) */}
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