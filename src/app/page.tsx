import {
  Award,
  Code2,
  GraduationCap,
  Github,
  Phone,
  ExternalLink,
} from "lucide-react";

// Data Imports
import careers from "@/data/careers.json";
import skills from "@/data/skills.json";
import portfolios from "@/data/portfolios.json";
import about from "@/data/about.json";
import certificates from "@/data/certificates.json";
import educations from "@/data/educations.json";
import honors from "@/data/honors.json";
import contacts from "@/data/contacts.json";
import PrintWrapper from "./components/PrintWrapper";

export default function ResumePage() {
  const currentYear = new Date().getFullYear();
  const yearsExp = currentYear - about.years_of_experience_start;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-amber-500/30 scroll-smooth">
      {/* PRINTABLE CONTENT START */}
      <PrintWrapper>
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative print:pt-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/10 blur-[120px] -z-10 rounded-full print:hidden" />
          <div className="max-w-3xl">
            <h1 className="text-6xl font-extrabold tracking-tight mb-8 leading-tight text-white print:text-black print:text-4xl">
              Software Engineer <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 bg-clip-text text-transparent print:bg-none print:text-amber-600 accent-text">
                Impactful Solutions.
              </span>
            </h1>
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed print:text-slate-800 print:text-sm">
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

        {/* SKILLS GRID */}
        <section className="bg-slate-900/30 py-24 border-y border-slate-900 print:bg-white print:py-8 print:border-slate-200">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-2 mb-12 text-amber-500/80 print:mb-4">
              <Code2 size={24} className="print:text-amber-600" />
              <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] print:text-black">
                Technical Toolkit
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 print:grid-cols-2 print:gap-4">
              {Object.entries(skills).map(([category, items]) => (
                <div
                  key={category}
                  className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 print:border-slate-200 print:bg-slate-50 print:p-4"
                >
                  <h3 className="font-bold text-slate-100 mb-6 flex items-center gap-2 print:text-black print:mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 print:bg-amber-600" />
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-slate-950 text-slate-400 rounded-md text-xs font-medium border border-slate-800 print:bg-white print:text-black print:border-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section className="max-w-6xl mx-auto px-6 py-24 print:py-10">
          <h2 className="text-sm font-black text-amber-500/80 uppercase tracking-[0.3em] mb-16 print:mb-6 accent-text">
            Work Experience
          </h2>
          <div className="space-y-16 print:space-y-8">
            {careers.map((exp, idx) => (
              <div
                key={idx}
                className="group relative pl-12 print:pl-0 break-inside-avoid"
              >
                <div className="absolute left-0 top-2 w-[1px] h-full bg-slate-800 group-hover:bg-amber-500 transition-colors duration-500 print:hidden" />
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700 group-hover:border-amber-400 group-hover:bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0)] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.6)] print:hidden transition-all duration-300" />

                <div className="flex flex-wrap justify-between items-baseline mb-4 gap-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300 print:text-black print:text-lg">
                    {exp.position}
                  </h3>
                  <span className="font-mono text-xs text-slate-500 tracking-widest transition-colors duration-300 group-hover:text-slate-200 origin-right print:text-slate-500">
                    {exp.start_date} — {exp.end_date || "PRESENT"}
                  </span>
                </div>

                <a
                  href={exp.corporate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-600 font-bold mb-4 hover:text-amber-400 transition-colors duration-300 print:text-amber-700"
                >
                  @{exp.corporate}
                  <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
                </a>

                <ul className="grid gap-3">
                  {exp.jobs.map((job, jIdx) => (
                    <li key={jIdx} className="text-slate-400 text-sm leading-relaxed flex gap-3 print:text-slate-700">
                      <span className="text-slate-700 group-hover:text-amber-600 mt-1.5 font-bold">•</span>
                      <span dangerouslySetInnerHTML={{ __html: job }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO SECTION - FIXED onClick Error */}
        <section className="bg-black py-24 print:hidden" id="portfolios">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-16 text-center">
              Selected Works
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((project, idx) => {
                const projectUrl = typeof project.link === "object" ? project.link.url : project.link;
                const hasLink = !!projectUrl;

                return (
                  <a
                    key={idx}
                    href={hasLink ? projectUrl : undefined}
                    target={hasLink ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`group relative bg-slate-900/20 border border-slate-800/50 rounded-xl p-1 transition-all duration-500 block
                      ${hasLink ? "hover:border-amber-500/30 hover:-translate-y-2 cursor-pointer" : "cursor-default opacity-80 pointer-events-none"}`}
                  >
                    <div className="bg-slate-950 p-6 rounded-lg h-full flex flex-col relative overflow-hidden">
                      {hasLink && (
                        <div className="absolute top-4 right-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          <ExternalLink size={16} />
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400">
                        {project.name}
                      </h3>
                      <p className="text-slate-500 text-xs mb-6 line-clamp-3 leading-relaxed group-hover:text-slate-300" dangerouslySetInnerHTML={{ __html: project.description }} />
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[9px] font-bold text-slate-400 border border-slate-800 px-2 py-0.5 rounded uppercase group-hover:text-amber-500/80">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* EDUCATION & HONORS */}
        <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 print:py-8 print:grid-cols-1">
          <div className="break-inside-avoid">
            <div className="flex items-center gap-2 mb-8 text-amber-500/80">
              <GraduationCap size={24} />
              <h2 className="text-xl font-bold text-white print:text-black">Education</h2>
            </div>
            {educations.map((edu, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-lg text-white print:text-black">{edu.university}</h3>
                <p className="text-amber-600 mb-4">{edu.degree} ({edu.start_date} - {edu.end_date})</p>
                <ul className="space-y-2">
                  {edu.achievements.map((ach, i) => (
                    <li key={i} className="text-sm text-slate-400 flex gap-2 print:text-slate-700">
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
              <h2 className="text-xl font-bold text-white print:text-black">Honors & Mentoring</h2>
            </div>
            <ul className="space-y-4">
              {honors.map((honor, idx) => (
                <li key={idx} className="p-4 bg-slate-900/50 rounded-lg border-l-4 border-amber-600 text-slate-300 text-sm print:bg-slate-50 print:text-slate-800" dangerouslySetInnerHTML={{ __html: honor }} />
              ))}
            </ul>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="py-24 border-t border-slate-900 bg-slate-950 print:bg-white print:py-8">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-sm font-black text-amber-500/80 uppercase tracking-[0.3em] mb-12 print:mb-4">Verified Certifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {certificates.map((cert, idx) => (
                <a key={idx} href={cert.link} target="_blank" rel="noopener noreferrer" className="group p-4 md:p-6 border border-slate-800 rounded-2xl transition-all duration-300 hover:border-amber-500/50">
                  <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-1 rounded group-hover:bg-amber-400 group-hover:text-slate-950">{cert.issued_by}</span>
                  <h3 className="text-sm font-bold text-slate-200 mt-2 md:mt-4 group-hover:text-white">{cert.title}</h3>
                  <div className="flex justify-between items-center mt-2 md:mt-6">
                    <span className="text-[10px] text-slate-500 print:hidden">{cert.issue_date}</span>
                    <ExternalLink size={12} className="text-amber-500 opacity-0 group-hover:opacity-100" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-32 px-6 bg-slate-950 border-t border-slate-900 print:hidden">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Interested in working together?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {contacts.map((contact, idx) => (
                <a key={idx} href={contact.link} target="_blank" className="flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-full text-sm font-bold text-slate-300 hover:bg-amber-600 hover:text-white duration-300">
                  {contact.alt === "whatsapp" && <Phone size={18} />}
                  {contact.alt === "github" && <Github size={18} />}
                  {contact.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </PrintWrapper>

      <footer className="py-12 px-6 border-t border-slate-900 bg-black print:hidden opacity-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs font-mono text-white">IVAN TANAKA - Software Engineer</p>
          <p className="text-[10px] uppercase text-white">© {currentYear} • @ivantanakaa</p>
        </div>
      </footer>
    </div>
  );
}