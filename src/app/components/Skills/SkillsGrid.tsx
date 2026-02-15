'use client';

import { FadeIn } from '../animations/FadeIn';
import { SkillCard } from './SkillCard';
import skillsData from '@/data/skills.json';
import { Code2, Server, Cloud, Wrench } from 'lucide-react';

const categoryIcons: Record<string, any> = {
  'Frontend Development': Code2,
  'Backend Development': Server,
  'DevOps & Infrastructure': Cloud,
  'Tools & Workflow': Wrench,
};

interface SkillItem {
  skill: string;
  highlight: boolean;
}

interface SkillCategory {
  section: string;
  skills: SkillItem[];
}

export function SkillsGrid() {
  const typedSkillsData = skillsData as SkillCategory[];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 print:py-8 print:bg-white" id="skills">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 gradient-text print:text-black print:mb-6 print:text-2xl">
            Skills & Technologies
          </h2>
        </FadeIn>

        <div className="space-y-8 sm:space-y-12 print:space-y-6">
          {typedSkillsData.map((category, categoryIndex) => {
            const Icon = categoryIcons[category.section];
            
            return (
              <FadeIn key={category.section} delay={categoryIndex * 0.1}>
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 print:mb-3">
                    {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-primary print:text-amber-700" />}
                    <h3 className="text-xl sm:text-2xl font-semibold text-text-primary print:text-black print:text-lg">
                      {category.section}
                    </h3>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 print:grid-cols-4 print:gap-2">
                    {category.skills.map((skillItem) => (
                      <SkillCard 
                        key={skillItem.skill} 
                        skill={skillItem.skill}
                        highlight={skillItem.highlight}
                      />
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
