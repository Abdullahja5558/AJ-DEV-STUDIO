import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 – Page Not Found | AJ Full Stack Developer",
  description:
    "Oops! The page you are looking for does not exist. Return to AJ Full Stack Developer portfolio to explore projects, skills, and contact information.",
  robots: {
    index: false,
    follow: true, // Don't index 404, but let links be crawled
  },
  alternates: {
    canonical: "https://aj-code.vercel.app/404",
  },
  openGraph: {
    title: "404 – Page Not Found | AJ Full Stack Developer",
    description:
      "The page you are looking for does not exist. Explore AJ’s portfolio, projects, and contact info.",
    url: "https://aj-code.vercel.app/404",
    siteName: "AJ Code",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "404 – Page Not Found | AJ Full Stack Developer",
    description:
      "Oops! The page does not exist. Return to AJ portfolio to explore projects and contact information.",
  },
};

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-24"
      role="main"
    >
      {/* H1 for SEO & accessibility */}
      <h1 className="text-7xl font-black mb-4 tracking-tight" aria-label="404 Page Not Found">
        404
      </h1>
      <h2 className="text-2xl font-bold mb-6">
        Page Not Found
      </h2>
      <p className="text-zinc-400 mb-8 max-w-xl text-center">
        Oops! The page you’re looking for doesn’t exist or has been moved.
        <br />
        Don’t worry, here are some helpful links to get you back on track:
      </p>

      <nav aria-label="Helpful links">
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-full bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition"
          >
            About
          </Link>
          <Link
            href="/#projects"
            className="px-6 py-3 rounded-full bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition"
          >
            Projects
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-3 rounded-full bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition"
          >
            Contact
          </Link>
        </div>
      </nav>

      <p className="text-zinc-600 text-sm">
        If you believe this is an error, please{" "}
        <a
          href="mailto:ajdeveloperr@gmail.com"
          className="underline hover:text-white"
        >
          let us know
        </a>
        .
      </p>
    </main>
  );
}