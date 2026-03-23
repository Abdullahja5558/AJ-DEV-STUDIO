import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-24">
      <h1 className="text-7xl font-black mb-4 tracking-tight">404</h1>
      <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
      <p className="text-zinc-400 mb-8 max-w-xl text-center">
        Oops! The page you’re looking for doesn’t exist or has been moved.
        <br />
        Don’t worry, here are some helpful links to get you back on track:
      </p>
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
    </div>
  );
}
