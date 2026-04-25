import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader, Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "700", "800"],
  variable: "--font-serif-display",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-headline",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Yogesh Sahu — Fractional CTO & Solutions Architect",
  description:
    "Hands-On Chief Solutions Architect / Fractional CTO for AI, fintech, and data-heavy products. Discovery through delivery.",
  metadataBase: new URL("https://yogeshsahu.xyz"),
  openGraph: {
    title: "Yogesh Sahu — Fractional CTO & Solutions Architect",
    description:
      "I scope, architect, code, and lead client-facing AI, fintech, and data-heavy engagements from discovery through delivery.",
    url: "https://yogeshsahu.xyz",
    siteName: "yogeshsahu.xyz",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yogesh Sahu — Fractional CTO & Solutions Architect",
    description:
      "Hands-on architecture, AI, fintech, and data-heavy product leadership.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://yogeshsahu.xyz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yogesh Sahu",
    jobTitle: "Fractional CTO & Chief Solutions Architect",
    url: "https://yogeshsahu.xyz",
    sameAs: [
      "https://linkedin.com/in/yogeshsahu",
      "https://github.com/CryptoPrism-io",
    ],
    worksFor: {
      "@type": "Organization",
      name: "CryptoPrism",
      url: "https://cryptoprism.io",
    },
    knowsAbout: [
      "AI Integration",
      "FinTech Architecture",
      "Data Pipelines",
      "Solution Architecture",
      "Product Engineering",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Strathclyde",
    },
  };

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${spaceGrotesk.variable} ${workSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
