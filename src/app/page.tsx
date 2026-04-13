import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsGrid from "@/components/ProjectsGrid";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="snap-container">
      <Nav />
      <Hero />
      <About />
      <ProjectsGrid />
      <Contact />
      <Footer />
    </main>
  );
}
