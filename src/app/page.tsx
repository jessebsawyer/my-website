'use client';
import Welcome from './components/Welcome';
import About from './components/About';
import Assistant from './components/Assistant';
import Contact from './components/Contact';

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
