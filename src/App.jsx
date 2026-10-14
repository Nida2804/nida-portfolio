import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LuxuryHero from './components/LuxuryHero';
import WorkShowcase from './components/WorkShowcase';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const scrollToWorks = () => {
    const el = document.getElementById('works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#c41b15] text-[#fbf8f5] selection:bg-white selection:text-[#c41b15]">
      
      {/* Top Luxury Navigation */}
      <Navbar 
        onOpenAbout={() => setIsAboutOpen(true)}
        onScrollToWork={scrollToWorks}
      />

      {/* Main Luxury Hero Section with 60 FPS Zero-Ghosting Character Canvas */}
      <main>
        <LuxuryHero 
          onOpenAbout={() => setIsAboutOpen(true)}
          onScrollToWork={scrollToWorks}
        />

        {/* Selected Works Portfolio Showcase */}
        <WorkShowcase />
      </main>

      {/* Luxury Footer with Technical Specifications */}
      <Footer 
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* About Nida Modal Dialog with Nida.png */}
      <AboutModal 
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

    </div>
  );
}
