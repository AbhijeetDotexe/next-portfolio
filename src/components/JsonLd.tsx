import { SITE } from "@/data/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
      },
      {
        "@type": "Person",
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        jobTitle: "Full-Stack Engineer",
        sameAs: [SITE.githubUrl, SITE.linkedinUrl],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
