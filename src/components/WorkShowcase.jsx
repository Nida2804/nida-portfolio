
import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: "V-Walk",
    category: "AI-Powered Assistive Android App",
    description:
      "An assistive Android application designed to help visually impaired users interact with their surroundings through voice commands, object detection, and contact assistance.",
    tags: ["Android", "Kotlin", "Voice Commands", "Object Detection"],
    accent: "#f5d9a8",
    github: ""
  },
  {
    id: 2,
    title: "Plant Leaf Disease Detection",
    category: "Machine Learning Project",
    description:
      "A CNN-based image classification project that identifies plant leaves as Healthy, Powdery Mildew, or Rust using image preprocessing and a trained deep learning model.",
    tags: ["Python", "TensorFlow", "Keras", "CNN"],
    accent: "#b9e4a8",
    github: ""
  },
  {
    id: 3,
    title: "Shale-Namma Pride",
    category: "Android App Development Internship",
    description:
      "A school transparency and pride portal for rural schools, featuring daily mid-day meal updates, facility tours, student highlights, and parent feedback.",
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "Android"],
    accent: "#a8d8f5",
    github: ""
  },
  {
    id: 4,
    title: "Art Gallery Management System",
    category: "Web Development Project",
    description:
      "A web-based project developed to manage art gallery information using a PHP backend and a MySQL database.",
    tags: ["PHP", "MySQL", "Web Development"],
    accent: "#e5c38e",
    github: ""
  }
];

export default function WorkShowcase() {
  return (
    <section
      id="works"
      className="relative py-24 bg-[#a81410] text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 font-mono text-[11px] uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Projects & Practical Experience</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-[0.06em] uppercase">
              My Projects
            </h2>
          </div>

          <p className="font-garamond italic text-lg sm:text-xl text-white/70 max-w-md mt-4 md:mt-0 font-light">
            Exploring AI, machine learning, and software development
            through practical projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((proj) => (
            <article
              key={proj.id}
              className="group relative rounded-3xl p-8 bg-[#8f0d09]/70 border border-white/15 hover:border-white/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 text-xs font-mono text-white/60 mb-6">
                  <span className="tracking-widest uppercase">
                    {proj.category}
                  </span>
                  <span>PROJECT {String(proj.id).padStart(2, '0')}</span>
                </div>

                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-wide group-hover:text-amber-200 transition-colors">
                    {proj.title}
                  </h3>

                  <div className="w-10 h-10 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-white/80 text-sm leading-relaxed mb-6 font-light">
                  {proj.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-[11px] font-mono tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                  <span className="font-mono text-white/60">
                    Technical Project
                  </span>

                  {proj.github ? (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-200 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-mono inline-flex items-center gap-2"
                    >
                      View on GitHub
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-white/40 uppercase tracking-widest text-[10px] font-mono">
  Innovative
</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
