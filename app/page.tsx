import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import InteractiveTerminal from '@/components/sections/InteractiveTerminal';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
     {/** <Experience />
      <InteractiveTerminal />*/} 
      <Contact />
      <Footer />
    </>
  );
}