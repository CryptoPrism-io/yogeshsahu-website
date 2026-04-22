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
    "Hands-On Chief Solutions Architect / Fractional CTO for AI, fintech, and data-heavy products. I scope, architect, code, and lead client-facing engagements from discovery through delivery.",
  openGraph: {
    title: "YogeshOS - Yogesh Sahu",
    description:
      "Hands-On Chief Solutions Architect / Fractional CTO for client-facing AI and product engineering engagements from discovery through delivery.",
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
