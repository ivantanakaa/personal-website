'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollAnimation } from '@/app/hooks/useScrollAnimation';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScrollAnimation();
  const isScrolled = scrollY > 50;

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden ${
        isScrolled
          ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-accent-primary/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#hero')}
            className="text-lg sm:text-xl font-bold gradient-text hover:scale-105 transition-transform"
            aria-label="Go to home"
          >
            IT
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium transition-colors relative group ${
                  activeSection === link.href.substring(1)
                    ? 'text-accent-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent-primary transition-all ${
                  activeSection === link.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:text-accent-primary transition-colors rounded-lg hover:bg-accent-primary/10"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-accent-primary/10 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-left px-4 py-3 text-sm font-medium transition-all rounded-lg ${
                    activeSection === link.href.substring(1)
                      ? 'text-accent-primary bg-accent-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
