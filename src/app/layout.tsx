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
  title: "YogeshOS - Yogesh Sahu",
  description:
    "DPIIT-recognised founder, Fractional CTO, and FinTech infrastructure engineer. CryptoPrism: 1B+ data points daily.",
  openGraph: {
    title: "YogeshOS - Yogesh Sahu",
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
      className={`${newsreader.variable} ${spaceGrotesk.variable} ${workSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased overflow-hidden">{children}</body>
    </html>
  );
}
