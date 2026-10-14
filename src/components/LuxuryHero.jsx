import React, { useState } from 'react';
import CharacterCanvas from './CharacterCanvas';
import { Compass, Eye, Crosshair, Award, Sparkles, MoveRight, ChevronDown } from 'lucide-react';

export default function LuxuryHero({ onOpenAbout, onScrollToWork }) {
  const [telemetry, setTelemetry] = useState({
    frameIndex: 'CENTER',
    angleDeg: 0,
    compass: 'DIRECT EYE CONTACT',
    isEyeContact: true,
    isTracking: false
  });

  // Helper to simulate pointer position for testing specific compass directions
  const simulateDirection = (angleDeg) => {
    const rad = (angleDeg * Math.PI) / 180;
    const distance = 400; // far enough outside deadzone
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.45;
    const x = cx + Math.cos(rad) * distance;
    const y = cy + Math.sin(rad) * distance;

    window.dispatchEvent(new MouseEvent('mousemove', {
      clientX: x,
      clientY: y
    }));
  };

  const simulateCenter = () => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.45;
    window.dispatchEvent(new MouseEvent('mousemove', {
      clientX: cx,
      clientY: cy
    }));
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#c41b15]">
      
      {/* Background Subtle Luxury Grain / Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-white/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Top Editorial Eyebrow */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/90">
            AI & ML Graduate | 2026
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:inline font-mono text-[10px] tracking-widest text-white/70">
            BE AIML | SJCIT
          </span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-white uppercase leading-[1.05] drop-shadow-sm">
          NIDA TAHAREEN
        </h1>
        <p className="font-garamond italic text-xl sm:text-2xl md:text-3xl text-white/80 mt-2 font-light tracking-wide max-w-3xl mx-auto">
          Bachelor of Engineering in Artificial Intelligence and Machine Learning
        </p>
      </div>

      {/* Hero Character Canvas (Main Stage) */}
      <div className="relative z-20 my-2 sm:my-4 w-full flex flex-col items-center justify-center">
        <div className="relative w-full max-w-[960px] mx-auto px-4">
          
          {/* Character Canvas Component */}
          <CharacterCanvas onStateChange={setTelemetry} />

          {/* Luxury Telemetry HUD Overlay (Floating below character) */}
          <div className="mt-4 max-w-2xl mx-auto w-full px-2">
            <div className="luxury-glass rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/20">
              
              {/* Left: Direction & Eye Contact State */}
              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                  telemetry.isEyeContact 
                    ? 'bg-white text-[#c41b15] border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                    : 'bg-black/30 text-white border-white/20'
                }`}>
                  {telemetry.isEyeContact ? (
                    <Eye className="w-5 h-5 animate-pulse" />
                  ) : (
                    <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                  )}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
                    Professional Status
                  </div>
                  <div className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
                    <span>{telemetry.compass}</span>
                    {telemetry.isEyeContact && (
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white font-mono">
                        DEADZONE &lt; 12%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Technical Stats (Angle, Frame, Latency) */}
              <div className="flex items-center gap-4 sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-left sm:text-right">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
                    -
                  </div>
                  <div className="text-sm font-mono font-bold text-white">
                    {telemetry.angleDeg}°
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
                    -
                  </div>
                  <div className="text-sm font-mono font-bold text-white">
                    {telemetry.frameIndex === 'CENTER' ? 'CENTER.WEBP' : `#${telemetry.frameIndex.toString().padStart(2, '0')}/63`}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
                    -
                  </div>
                  <div className="text-sm font-mono font-bold text-emerald-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                    ~35ms
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Interactive Compass Bar (For quick testing/clicks) */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-mono text-white/80">
              <span className="text-[10px] uppercase tracking-wider text-white/50 mr-1 hidden md:inline">
                Quick Navigation:
              </span>
              <button 
                onClick={simulateCenter}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  telemetry.isEyeContact 
                    ? 'bg-white text-[#c41b15] border-white font-bold' 
                    : 'bg-black/20 border-white/10 hover:border-white/40 text-white'
                }`}
              >
                ● Reset View
              </button>
              <button 
                onClick={() => simulateDirection(270)}
                className="px-2.5 py-1 rounded-lg bg-black/20 border border-white/10 hover:border-white/40 text-white transition-all hover:bg-white/10"
              >
                ↑ Explore Up
              </button>
              <button 
                onClick={() => simulateDirection(315)}
                className="px-2.5 py-1 rounded-lg bg-black/20 border border-white/10 hover:border-white/40 text-white transition-all hover:bg-white/10"
              >
                ↗ Explore Right
              </button>
              <button 
                onClick={() => simulateDirection(0)}
                className="px-2.5 py-1 rounded-lg bg-black/20 border border-white/10 hover:border-white/40 text-white transition-all hover:bg-white/10"
              >
                → View Right
              </button>
              <button 
                onClick={() => simulateDirection(45)}
                className="px-2.5 py-1 rounded-lg bg-black/20 border border-white/10 hover:border-white/40 text-white transition-all hover:bg-white/10"
              >
                ↘ Explore Down
              </button>
              <button 
                onClick={() => simulateDirection(90)}
                className="px-2.5 py-1 rounded-lg bg-black/20 border border-white/10 hover:border-white/40 text-white transition-all hover:bg-white/10"
              >
                ↓ View Down
              </button>
              <button 
                onClick={() => simulateDirection(135)}
                className="px-2.5 py-1 rounded-lg bg-black/20 border border-white/10 hover:border-white/40 text-white transition-all hover:bg-white/10"
              >
                ↙ Explore Left
              </button>
              <button 
                onClick={() => simulateDirection(180)}
                className="px-2.5 py-1 rounded-lg bg-black/20 border border-white/10 hover:border-white/40 text-white transition-all hover:bg-white/10"
              >
                ← View Left
              </button>
              <button 
                onClick={() => simulateDirection(225)}
                className="px-2.5 py-1 rounded-lg bg-black/20 border border-white/10 hover:border-white/40 text-white transition-all hover:bg-white/10"
              >
                ↖ Return Up
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Accolades & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-8">
        
        {/* Accolades Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-white/15 text-center">
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-editorial text-xs md:text-sm font-bold tracking-[0.2em] text-white">
              AWARDS
            </span>
            <span className="text-[11px] font-mono text-white/60 tracking-wider mt-0.5">
              Awarded Academic Excellence Award for securing hgh marks in Class 10
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-editorial text-xs md:text-sm font-bold tracking-[0.2em] text-white">
              INTERNSHIP EXPERIENCE
            </span>
            <span className="text-[11px] font-mono text-white/60 tracking-wider mt-0.5">
              Android App Development | MindMatrix
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-editorial text-xs md:text-sm font-bold tracking-[0.2em] text-white">
              TECHNICAL SKILLS
            </span>
            <span className="text-[11px] font-mono text-white/60 tracking-wider mt-0.5">
              Python, Machine Learning, TensorFlow, AI, MySQL, GenerativeAI, operating Systems
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-editorial text-xs md:text-sm font-bold tracking-[0.2em] text-white">
              CERTIFICATIONS AND ACHIEVEMENTS
            </span>
            <span className="text-[11px] font-mono text-white/60 tracking-wider mt-0.5">
              Google Cloud Skills, FEEL Employable Program, Academic Excellence Award
            </span>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={onScrollToWork}
            className="group flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.25em]">
              Explore My Projects
            </span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1 text-white/70" />
          </button>
        </div>

      </div>

    </section>
  );
}
