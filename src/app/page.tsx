import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import About from "@/components/About";
import Skills from "@/components/Skills";
import GitHub from "@/components/GitHub";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
