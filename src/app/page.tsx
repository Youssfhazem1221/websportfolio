import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import About from "@/components/About";
import Skills from "@/components/Skills";
import GitHub from "@/components/GitHub";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Re-render at most once an hour so the GitHub section picks up repo changes.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Work />
        <About />
        <Skills />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
