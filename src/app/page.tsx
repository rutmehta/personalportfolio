import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Research from '../components/Research';
import Contact from '../components/Contact';
import AsciiVideoDivider from '../components/AsciiVideoDivider';

export default function Home() {
  return (
    <main>
      <Hero />
      <AsciiVideoDivider />
      <Projects />
      <About />
      <Research />
      <Contact />
    </main>
  );
}
