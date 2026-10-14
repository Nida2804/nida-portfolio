import React from 'react';
import { Award, GraduationCap, BookOpen } from 'lucide-react';

const awards = [
  {
    title: 'Academic Excellence Award',
    organization: 'Millat Management Society of India',
    description: 'Recognized for achieving high marks in Class 10.',
    icon: Award,
  },
  {
    title: 'MindMatrix Internship',
    organization: 'Android App Development using Generative AI',
    description: 'Gained practical experience building Android applications using Kotlin, Jetpack Compose, and Firebase.',
    icon: GraduationCap,
  },
  {
    title: 'FEEL Employable Program',
    organization: 'Learning & Development',
    description: 'Completed a program focused on professional development and employability skills.',
    icon: BookOpen,
  },
];

export default function AwardsSection() {
  return (
    <section
      id="awards"
      className="py-24 bg-[#7d0b07] text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-4">
          Recognition & Experience
        </p>

        <h2 className="font-editorial text-3xl sm:text-5xl font-bold uppercase mb-12">
          Awards & Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awards.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-white/15 bg-white/5 p-6"
              >
                <Icon className="w-7 h-7 text-amber-200 mb-5" />

                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-amber-100 mb-3">
                  {item.organization}
                </p>

                <p className="text-sm leading-relaxed text-white/70">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}