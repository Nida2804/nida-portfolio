import React, { useState, useEffect } from 'react';
import { Sparkles, Globe2, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenAbout, onScrollToWork, trackingState }) {
  const [scrolled, setScrolled] = useState(false);
  const [parisTime, setParisTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      setParisTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 luxury-glass shadow-2xl' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Monogram Brand */}
        <div className="flex items-center gap-4">
          <a href="#" className="group flex items-center gap-3">
            <span className="font-editorial text-2xl md:text-3xl font-bold tracking-[0.25em] text-white transition-transform group-hover:scale-105">
              NIDA
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/70" />
            <span className="hidden sm:inline-block text-[11px] tracking-[0.2em] uppercase text-white/70 font-mono">
              AI & ML ENGINEER
            </span>
          </a>
        </div>

        {/* Live Status & Timezone (Center) */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/20 border border-white/10 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white/80 font-medium">OPEN TO OPPORTUNITIES</span>
            <span className="text-white/30">•</span>
            <span className="font-mono text-white/60">BENGALURU, INDIA</span>
          </div>

          {/* 60 FPS Telemetry Pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono tracking-wider text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>Future in Progress</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenAbout}
            className="text-xs uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors px-3 py-2"
          >
            About Nida Tahareen
          </button>
          
          <button 
            onClick={onScrollToWork}
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors px-3 py-2"
          >
            <span>Works</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <a 
            href="#contact"
            className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-white text-[#c41b15] font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-1.5 font-bold">
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>

      </div>
    </header>
  );
}
