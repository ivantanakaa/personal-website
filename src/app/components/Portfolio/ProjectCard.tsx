'use client';

import Image from 'next/image';
import Card from '../ui/Card';
import { ExternalLink } from 'lucide-react';

interface ProjectLink {
  url: string;
  text: string;
}

interface ProjectCardProps {
  project: {
    name: string;
    alt: string;
    link?: string | ProjectLink;
    src: string;
    description: string;
    tags: string[];
  };
  onCardClick: (project: ProjectCardProps['project']) => void;
}

export function ProjectCard({ project, onCardClick }: ProjectCardProps) {
  const hasLink = !!project.link;
  const linkUrl = typeof project.link === 'string' ? project.link : project.link?.url;

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    if (linkUrl) {
      window.open(linkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card
      hover={true}
      onClick={() => onCardClick(project)}
      className="group overflow-hidden"
    >
      {/* Project Image */}
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
        <Image
          src={project.src}
          alt={project.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {hasLink && (
          <button
            onClick={handleLinkClick}
            className="absolute inset-0 bg-bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
            aria-label={`Open ${project.name} in new tab`}
          >
            <ExternalLink className="w-8 h-8 text-accent-primary" />
          </button>
        )}
      </div>

      {/* Project Info */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-text-primary">{project.name}</h3>
          {hasLink && (
            <button
              onClick={handleLinkClick}
              className="text-accent-primary flex-shrink-0 ml-2 hover:text-accent-primary/80 transition-colors"
              aria-label={`Open ${project.name} in new tab`}
            >
              <ExternalLink className="w-5 h-5" />
            </button>
          )}
        </div>

        <div
          className="text-text-secondary text-sm mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-accent-primary/10 text-accent-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
