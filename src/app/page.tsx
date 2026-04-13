import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import ExpertisePillars from "@/components/ExpertisePillars";
import ProjectsGrid from "@/components/ProjectsGrid";
import MentalOS from "@/components/MentalOS";
import Credentials from "@/components/Credentials";
import Milestones from "@/components/Milestones";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const MARQUEE_GOLD = [
  "CryptoPrism",
  "Fractional CTO",
  "1B+ Data Points",
  "23 Repos",
  "Bloomberg",
  "PMI",
  "CSPO",
  "Google Cloud",
  "Microsoft",
  "DPIIT",
  "50K Downloads",
  "Ubisoft",
  "Strathclyde",
];

const MARQUEE_DARK = [
  "First Principles",
  "OODA Loop",
  "Antifragility",
  "Inversion",
  "Barbell Strategy",
  "Circle of Competence",
  "Second-Order Thinking",
];

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee items={MARQUEE_GOLD} variant="gold" />
      <About />
      <ExpertisePillars />
      <ProjectsGrid />
      <Marquee items={MARQUEE_DARK} variant="dark" />
      <MentalOS />
      <Credentials />
      <Milestones />
      <BlogPreview />
      <Contact />
      <Footer />
    </main>
  );
}
