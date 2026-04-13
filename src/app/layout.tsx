import type { Metadata } from "next";
import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300","400","500","700"],
  variable: "--font-headline",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-body",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["700","900"],
  variable: "--font-serif-display",
});

export const metadata: Metadata = {
  title: "Yogesh Sahu — Fractional CTO · Founder · FinTech",
  description:
    "DPIIT-recognised founder, Fractional CTO, and FinTech infrastructure engineer. CryptoPrism: 1B+ data points daily. Pre-seed Q2 2026.",
  openGraph: {
    title: "Yogesh Sahu — Fractional CTO",
    description:
      "1B+ data points. 23 repos. One operator. Fractional CTO mandates for fintech, AI, and data-intensive startups.",
    url: "https://yogeshsahu.xyz",
    siteName: "yogeshsahu.xyz",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${playfairDisplay.variable}`}
    >
      <body className="bg-obsidian text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
