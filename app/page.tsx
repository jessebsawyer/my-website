'use client';
import Welcome from './components/Welcome/Welcome';
import About from './components/About/About';
import Assistant from './components/Assistant/Assistant';
import Contact from './components/Contact/Contact';

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Welcome />

      <About />

      <Assistant />

      <Contact />
    </div>
  );
}
