import {
  Award,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

// Data Imports
import about from "@/data/about.json";
import certificates from "@/data/certificates.json";
import educations from "@/data/educations.json";
import honors from "@/data/honors.json";
import PrintWrapper from "./components/PrintWrapper";

// New Futuristic Components
import { Header } from "./components/Navigation/Header";
import { ScrollProgress } from "./components/Navigation/ScrollProgress";
import { BackToTop } from "./components/Navigation/BackToTop";
import { HeroSection } from "./components/Hero/HeroSection";
import { BackgroundEffects } from "./components/Hero/BackgroundEffects";
import { SkillsGrid } from "./components/Skills/SkillsGrid";
import { PortfolioGallery } from "./components/Portfolio/PortfolioGallery";
import { Timeline } from "./components/Experience/Timeline";
import { ContactSection } from "./components/Contact/ContactSection";

export default function ResumePage() {
  const currentYear = new Date().getFullYear();
  const yearsExp = currentYear - about.years_of_experience_start;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-amber-500/30 scroll-smooth">
      {/* Navigation */}
      <Header />
      <ScrollProgress />
      <BackToTop />
      
      {/* PRINTABLE CONTENT START */}
      <PrintWrapper>
        {/* HERO SECTION - New Futuristic Version */}
        <div className="relative print:hidden">
          <BackgroundEffects />
          <HeroSection />
        </div>

        {/* HERO SECTION - Print Version (Legacy) */}
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative hidden print:block print:pt-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/10 blur-[120px] -z-10 rounded-full print:hidden" />
          <div className="max-w-3xl">
            <h1 className="text-6xl font-extrabold tracking-tight mb-8 leading-tight text-white print:text-black print:text-4xl">
              Ivan Tanaka
                <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 bg-clip-text text-transparent print:bg-none print:text-amber-600 accent-text">
                
              Impactful Solutions.<br />
              </span>
            </h1>
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed print:text-slate-800 print:text-sm description-container">
              {about.description.map((desc, i) => (
                <p
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: desc.replace(
                      "{years_of_experience}",
                      yearsExp.toString()
                    ),
                  }}
                />
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4 print:hidden">
              <a
                href="#contact"
                className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(217,119,6,0.3)] flex items-center gap-2"
              >
                Work with me
              </a>
              <a
                href="#portfolios"
                className="px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded-xl transition-all hover:bg-slate-800 flex items-center gap-2"
              >
                View Projects
              </a>
            </div>
          </div>
        </section>

        {/* SKILLS GRID - New Futuristic Version (also for print) */}
        <section id="skills" className="py-24 print:py-8 print:break-before-page">
          <SkillsGrid />
        </section>

        {/* WORK EXPERIENCE - New Futuristic Version (also for print) */}
        <section id="experience" className="py-24 print:py-10 print:break-before-page">
          <Timeline />
        </section>

        {/* PORTFOLIO SECTION - New Futuristic Version */}
        <section id="portfolio" className="py-24 print:hidden">
          <PortfolioGallery />
        </section>

        {/* EDUCATION & HONORS */}
        <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 print:py-8 print:grid-cols-1 print:break-before-page">
          <div className="break-inside-avoid">
            <div className="flex items-center gap-2 mb-8 text-amber-500/80">
              <GraduationCap size={24} />
              <h2 className="text-xl font-bold text-white print:text-black">
                Education
              </h2>
            </div>
            {educations.map((edu, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-lg text-white print:text-black">
                  {edu.university}
                </h3>
                <p className="text-amber-600 mb-4">
                  {edu.degree} ({edu.start_date} - {edu.end_date})
                </p>
                <ul className="space-y-2">
                  {edu.achievements.map((ach, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-400 flex gap-2 print:text-slate-700"
                    >
                      <span className="text-amber-900">•</span>
                      <span dangerouslySetInnerHTML={{ __html: ach }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="break-inside-avoid">
            <div className="flex items-center gap-2 mb-8 text-amber-500/80">
              <Award size={24} />
              <h2 className="text-xl font-bold text-white print:text-black">
                Honors & Mentoring
              </h2>
            </div>
            <ul className="space-y-4">
              {honors.map((honor, idx) => (
                <li
                  key={idx}
                  className="p-4 bg-slate-900/50 rounded-lg border-l-4 border-amber-600 text-slate-300 text-sm print:bg-slate-50 print:text-slate-800"
                  dangerouslySetInnerHTML={{ __html: honor }}
                />
              ))}
            </ul>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="py-24 border-t border-slate-900 bg-slate-950 print:hidden">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-sm font-black text-amber-500/80 uppercase tracking-[0.3em] mb-12 print:mb-4">
              Verified Certifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {certificates.map((cert, idx) => (
                <a
                  key={idx}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 md:p-6 border border-slate-800 rounded-2xl transition-all duration-300 hover:border-amber-500/50"
                >
                  <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-1 rounded group-hover:bg-amber-400 group-hover:text-slate-950">
                    {cert.issued_by}
                  </span>
                  <h3 className="text-sm font-bold text-slate-200 mt-2 md:mt-4 group-hover:text-white">
                    {cert.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2 md:mt-6">
                    <span className="text-[10px] text-slate-500 print:hidden">
                      {cert.issue_date}
                    </span>
                    <ExternalLink
                      size={12}
                      className="text-amber-500 opacity-0 group-hover:opacity-100"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT - New Futuristic Version */}
        <section id="contact" className="py-32 print:hidden">
          <ContactSection />
        </section>
      </PrintWrapper>

      <footer className="py-12 px-6 border-t border-slate-900 bg-black print:hidden opacity-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs font-mono text-white">
            IVAN TANAKA - Software Engineer
          </p>
          <p className="text-[10px] uppercase text-white">
            © {currentYear} • @ivantanakaa
          </p>
        </div>
      </footer>
    </div>
  );
}
