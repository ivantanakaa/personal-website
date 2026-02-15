'use client';

import { FadeIn } from '../animations/FadeIn';
import Image from 'next/image';
import contactsData from '@/data/contacts.json';

export function ContactSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary/50" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 gradient-text">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {contactsData.map((contact, index) => (
            <FadeIn key={contact.alt} delay={index * 0.1}>
              <a
                href={contact.link}
                target={contact.link.startsWith('http') ? '_blank' : undefined}
                rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-bg-tertiary border border-accent-primary/20 rounded-xl hover:border-accent-primary/40 hover:bg-bg-secondary transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                  <Image
                    src={contact.icon}
                    alt={contact.alt}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-text-muted text-xs sm:text-sm capitalize">{contact.alt}</p>
                  <p className="text-text-primary text-sm sm:text-base font-medium group-hover:text-accent-primary transition-colors truncate">
                    {contact.label}
                  </p>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
