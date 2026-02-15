'use client';

import Card from '../ui/Card';
import { Briefcase } from 'lucide-react';

interface ExperienceCardProps {
  experience: {
    corporate: string;
    position: string;
    corporate_link: string;
    start_date: string;
    end_date: string | null;
    jobs: string[];
  };
  index: number;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const startDate = formatDate(experience.start_date);
  const endDate = experience.end_date ? formatDate(experience.end_date) : 'Present';

  return (
    <div className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} print:flex-row`}>
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-accent-primary rounded-full transform md:-translate-x-1/2 z-10 border-2 sm:border-4 border-bg-primary print:hidden" />

      {/* Card */}
      <div className={`w-full md:w-[calc(50%-2rem)] ml-10 sm:ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} print:ml-0 print:w-full break-inside-avoid`}>
        <Card hover={true}>
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-accent-primary/10 rounded-lg flex-shrink-0 print:bg-amber-100">
              <Briefcase className="w-4 h-4 sm:w-6 sm:h-6 text-accent-primary print:text-amber-700" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary print:text-black">
                  {experience.position}
                </h3>
                <span className="text-xs sm:text-sm text-accent-primary font-medium whitespace-nowrap print:text-amber-700">
                  {startDate} - {endDate}
                </span>
              </div>

              <a
                href={experience.corporate_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base text-text-secondary hover:text-accent-primary transition-colors inline-block mb-3 sm:mb-4 print:text-amber-700 print:font-semibold"
              >
                {experience.corporate}
              </a>

              <ul className="space-y-2">
                {experience.jobs.map((job, jobIndex) => (
                  <li
                    key={jobIndex}
                    className="text-xs sm:text-sm text-text-secondary flex gap-2 print:text-slate-700"
                  >
                    <span className="text-accent-primary mt-1 sm:mt-1.5 flex-shrink-0 print:text-amber-700">•</span>
                    <span dangerouslySetInnerHTML={{ __html: job }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
