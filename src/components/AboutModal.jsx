import React from 'react';
import { X, Sparkles, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl bg-[#99110d] border border-white/20 rounded-3xl p-6 sm:p-10 text-white shadow-[0_25px_70px_rgba(0,0,0,0.6)] overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Portrait Column (Nida.png) */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/20">
              <img 
                src="/Nida.png" 
                alt="Nida — Creative Director & Visual Architect"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono tracking-wider text-white/90 flex items-center justify-between">
                <span>NIDA</span>
                <span className="text-white/60">BENGALURU / INDIA</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-white/70">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ABOUT ME</span>
            </div>
          </div>

          {/* Biography & Philosophy Column */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 font-mono text-[11px] uppercase tracking-[0.2em] mb-4">
                <span>My Professional Profile</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-[0.08em] uppercase mb-4">
                Nida Tahareen
              </h2>

              <p className="font-garamond italic text-xl text-amber-200/90 font-light mb-4">
                "Passionate about using technology to solve real-world problems through AI and software development."
              </p>

              <div className="space-y-3 text-sm text-white/80 leading-relaxed font-light mb-6">
                <p>
                  I'm Nida Tahareen, a 2026 B.E. graduate in Artificial Intelligence and Machine Learning from SJC Institute of Technology. I'm passionate about AI, machine learning, and software development. Through projects like V-Walk and Plant Leaf Disease Detection, I've explored how technology can solve real-world problems. I'm eager to learn, grow, and contribute to innovative projects.
                  </p>
                  </div>
            

              {/* Accolades & Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/15 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>Academic Excellence Award</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>MindMatrix Internship</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>AI & ML Graduate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>AI and Software Development Projects</span>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-4 flex items-center justify-between">
              <a 
                href="tel:+917892424653"
                className="px-6 py-3 rounded-full bg-white text-[#99110d] font-bold text-xs uppercase tracking-[0.15em] hover:bg-amber-100 transition-colors shadow-lg"
              >
                Contact Me : 7892424653
              </a>

              <span className="text-xs font-mono text-white/50">
                AI & ML Graduate | 2026
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
