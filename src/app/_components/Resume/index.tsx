import About from "@/app/_modules/About";
import Careers from "@/app/_modules/Careers";
import Hero from "@/app/_modules/Hero";
import ResumeHero from "@/app/_modules/Hero/ResumeHero";
import Honors from "@/app/_modules/Honors";
import ResumePortfolios from "@/app/_modules/Portfolios/ResumePortfolios";
import Skills from "@/app/_modules/Skills";
import { MutableRefObject } from "react";

export default function Resume({
  resumeRef,
}: {
  resumeRef: MutableRefObject<HTMLDivElement | null>;
}) {
  return (
    <section
      ref={resumeRef}
      className="flex flex-col items-center w-full resume-container"
    >
      <div className="bg-white rounded shadow-md w-full overflow-visible">
        <ResumeHero />
        <About />
        <Skills />
        <Careers />
        <ResumePortfolios />
        <Honors />
      </div>
    </section>
  );
}
