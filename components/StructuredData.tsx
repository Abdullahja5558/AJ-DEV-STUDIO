export function StructuredData() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://aj-code.vercel.app/#person",
        name: "Abdullah Javed",
        alternateName: ["AJ", "AJ Developer", "Abdullah Javed Developer"],
        url: "https://aj-code.vercel.app",
        image: "https://aj-code.vercel.app/about.jpeg",
        jobTitle: "Senior Full-Stack MERN & Next.js Developer",
        description:
          "Abdullah Javed (AJ) is an experienced Full-Stack Developer specializing in high-performance web applications, Next.js, React, Node.js, Express, MongoDB, TypeScript, and modern UI/UX engineering.",
        sameAs: [
          "https://github.com/Abdullahja5558",
          "https://www.linkedin.com/in/abdullah-javed-a2b0b0396/",
          "https://www.instagram.com/mian.abdullah.9/",
        ],
        knowsAbout: [
          "Next.js",
          "React.js",
          "TypeScript",
          "JavaScript (ES6+)",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Tailwind CSS",
          "Framer Motion",
          "GSAP",
          "Full Stack Web Development",
          "SEO Optimization",
          "UI/UX Design",
          "REST APIs",
          "Web Performance & Core Web Vitals",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Bachelor of Computer Science",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://aj-code.vercel.app/#website",
        url: "https://aj-code.vercel.app",
        name: "AJ – Full-Stack Developer Portfolio",
        description:
          "Explore the portfolio of Abdullah Javed (AJ), a Senior Full-Stack MERN and Next.js developer building fast, SEO-friendly, and modern digital web applications.",
        publisher: {
          "@id": "https://aj-code.vercel.app/#person",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://aj-code.vercel.app/#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aj-code.vercel.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": "https://aj-code.vercel.app/about"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Contact",
            "item": "https://aj-code.vercel.app/contact"
          }
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://aj-code.vercel.app/#service",
        name: "AJ Web Development & Engineering Services",
        url: "https://aj-code.vercel.app",
        image: "https://aj-code.vercel.app/og-image.jpg",
        description:
          "Custom full-stack web application development, Next.js optimization, responsive UI/UX design, and SEO-engineered web architecture.",
        priceRange: "$$",
        telephone: "+923715909509",
        email: "ajdeveloperr@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressCountry: "PK",
          addressRegion: "Punjab"
        },
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
        founder: {
          "@id": "https://aj-code.vercel.app/#person",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaGraph),
      }}
    />
  );
}
