'use client';

import { FadeIn } from '../animations/FadeIn';
import { ExperienceCard } from './ExperienceCard';
import careersData from '@/data/careers.json';

export function Timeline() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 print:py-10 print:bg-white" id="experience">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 gradient-text print:text-black print:mb-6 print:text-2xl">
            Work Experience
          </h2>
        </FadeIn>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent-primary/30 transform md:-translate-x-1/2 print:hidden" />

          {/* Experience cards */}
          <div className="space-y-8 sm:space-y-12 print:space-y-6">
            {careersData.map((experience, index) => (
              <FadeIn key={experience.corporate} delay={index * 0.1}>
                <ExperienceCard experience={experience} index={index} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
