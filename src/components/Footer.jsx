import React from 'react';
import { ArrowUpRight, Heart, Sparkles, Mail, Globe } from 'lucide-react';

export default function Footer({ onOpenAbout }) {
  return (
    <footer id="contact" className="relative bg-[#7d0b07] text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Invitation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/15">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 font-mono text-[11px] uppercase tracking-[0.2em] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Open to Exciting Career Opportunities</span>
            </div>
            
            <h2 className="font-editorial text-4xl sm:text-6xl font-bold tracking-[0.08em] uppercase leading-[1.1] mb-6">
              Let's Build Something Meaningful with Technology.
            </h2>
            
            <p className="font-garamond italic text-xl sm:text-2xl text-white/70 font-light max-w-xl mb-8">
              I'm interested in AI, machine learning, and software development, and I'm eager to contribute to projects that solve real-world problems.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="https://mail.google.com/mail/?view=cm&to=nidatahareen52@gmail.com"
                className="px-8 py-4 rounded-full bg-white text-[#7d0b07] font-bold text-xs uppercase tracking-[0.2em] hover:bg-amber-100 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Mail Me</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenAbout}
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-[0.15em] transition-all"
              >
                My Profile
              </button>
            </div>
          </div>

          {/* Technical Architecture Specs Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="luxury-glass rounded-2xl p-6 border border-white/15 shadow-xl">
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-4 flex items-center gap-2">
                <span>✦ My Technical Toolkit</span>
              </h4>
              <ul className="space-y-3 font-mono text-xs text-white/80">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Programming Languages:</span>
                  <span className="font-bold text-white">Python, Java</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">AI & ML:</span>
                  <span className="font-bold text-white">TensorFlow, Keras, CNN</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Development Tools:</span>
                  <span className="font-bold text-white">Android Studio, Jupyter Notebook, Eclipse</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Database:</span>
                  <span className="font-bold text-white">MySQL, Firebase</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Core Skills:</span>
                  <span className="font-bold text-white">Machine Learning, Data Analysis, Software Development</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/50">Mobile App Development:</span>
                  <span className="font-bold text-white">Kotlin, Jetpack Compose, Android Development</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Global Hubs & Clocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-white/10 text-xs font-mono">
          <div>
            <div className="text-white/40 uppercase tracking-widest mb-1">Education</div>
            <div className="text-white/80">S J C Institute of Technolgy</div>
          </div>
          <div>
            <div className="text-white/40 uppercase tracking-widest mb-1">Specialization</div>
            <div className="text-white/80">Artificial Intelligence and Machine Learning</div>
          </div>
          <div>
            <div className="text-white/40 uppercase tracking-widest mb-1">Experience</div>
            <div className="text-white/80">Android App Development Internship</div>
          </div>
          <div>
            <div className="text-white/40 uppercase tracking-widest mb-1">Inquiries</div>
            <div className="text-white/80">nidatahareen52@gmail.com</div>
          </div>
        </div>

        {/* Copyright & Sign-off */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/50 gap-4">
          <div>
            © 2026 NIDA TAHAREEN. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
  href="/awards.html"
  className="hover:text-white transition-colors"
>
  Awards
</a>
            <a href="https://github.com/Nida2804" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a
  href="https://www.linkedin.com/in/nida-tahareen-6733a0328"
  target="_blank"
  rel="noreferrer"
  className="hover:text-white transition-colors"
>
  LinkedIn
</a>
           <a
  href="/Nida_Tahareen_Resume.pdf"
  target="_blank"
  rel="noreferrer"
  className="hover:text-white transition-colors"
>
  Resume
</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
