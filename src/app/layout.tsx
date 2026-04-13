import type { Metadata } from "next";
import { Newsreader, Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["700", "800"],
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
      className={`${newsreader.variable} ${spaceGrotesk.variable} ${workSans.variable}`}
    >
      <body className="bg-[#f7f4ee] text-[#1a1a1a] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
