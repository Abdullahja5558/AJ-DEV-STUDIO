export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Abdullah Javed",
          url: "https://aj-code.vercel.app",
          jobTitle: "Full Stack Developer, Frontend Developer",
          sameAs: [
            "https://github.com/Abdullahja5558",
            "https://www.instagram.com/mian.abdullah.9/",
          ],
          description:
            "AJ is a Full Stack Developer and Frontend Developer specializing in modern, fast, and SEO-friendly websites using React, Next.js, Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript. Expert in web performance, responsive design, and UI/UX best practices.",
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Bachelor of Computer Science",
          },
        }),
      }}
    />
  );
}
