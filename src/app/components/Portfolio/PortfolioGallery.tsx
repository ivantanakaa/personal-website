'use client';

import { useState } from 'react';
import { FadeIn } from '../animations/FadeIn';
import { ProjectCard } from './ProjectCard';
import portfoliosData from '@/data/portfolios.json';

export function PortfolioGallery() {
  const [filter, setFilter] = useState<string>('All');

  // Get unique tags
  const allTags = Array.from(
    new Set(portfoliosData.flatMap((project) => project.tags))
  ).sort();

  const filters = ['All', ...allTags];

  // Filter projects
  const filteredProjects =
    filter === 'All'
      ? portfoliosData
      : portfoliosData.filter((project) => project.tags.includes(filter));

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary/50" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 gradient-text">
            Portfolio
          </h2>
          <p className="text-sm sm:text-base text-text-secondary text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            A selection of projects I've worked on, ranging from fintech platforms to e-learning applications.
          </p>
        </FadeIn>

        {/* Filter Buttons */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {filters.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  filter === tag
                    ? 'bg-accent-primary text-bg-primary shadow-lg'
                    : 'bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <FadeIn key={project.name} delay={0.1 * (index % 6)}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-text-muted py-12 text-sm sm:text-base">
            No projects found with the selected filter.
          </p>
        )}
      </div>
    </section>
  );
}
