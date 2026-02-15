'use client';

import { FadeIn } from '../animations/FadeIn';
import { SlideIn } from '../animations/SlideIn';
import Button from '../ui/Button';
import aboutData from '@/data/about.json';
import contactsData from '@/data/contacts.json';

export function HeroSection() {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - aboutData.years_of_experience_start;

  // Replace {years_of_experience} placeholder in description
  const processedDescription = aboutData.description.map((text) =>
    text.replace('{years_of_experience}', yearsOfExperience.toString())
  );

  // Get email and LinkedIn for CTAs
  const emailContact = contactsData.find((c) => c.alt === 'email');
  const linkedInContact = contactsData.find((c) => c.alt === 'linkedin');

  return (
    <section
      className="relative min-h-screen lg:min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
      id="hero"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Name with gradient effect */}
        <FadeIn delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
            <span className="text-text-primary">Ivan Tanaka</span>
            <br />
            <span className="gradient-text">Impactful Solutions.</span>
          </h1>
        </FadeIn>

        {/* Animated tagline */}
        <FadeIn delay={0.4}>
          <p className="text-lg sm:text-xl lg:text-2xl text-text-secondary mb-8 font-medium">
            Software Engineer
          </p>
        </FadeIn>

        {/* Staggered description paragraphs */}
        <SlideIn delay={0.6} stagger={0.15} className="space-y-3 sm:space-y-4 mb-10 sm:mb-12">
          {processedDescription.map((paragraph, index) => (
            <p
              key={index}
              className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto px-2"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </SlideIn>

        {/* CTA Buttons */}
        <FadeIn delay={1.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {emailContact && (
              <Button
                variant="primary"
                onClick={() => window.location.href = emailContact.link}
                className="w-full sm:w-auto"
              >
                Get In Touch
              </Button>
            )}
            {linkedInContact && (
              <Button
                variant="secondary"
                onClick={() => window.open(linkedInContact.link, '_blank')}
                className="w-full sm:w-auto"
              >
                View LinkedIn
              </Button>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
