import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";


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
  description: "AJ - Crafting immersive web experiences with cutting-edge frontend development. Explore my portfolio showcasing innovative designs and seamless user interactions.",
};

<meta name="google-site-verification" content="3G_g9TJY5PBgQrGx31hcPNA_V3tEOWNugGnAEGeOQPY" />

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
