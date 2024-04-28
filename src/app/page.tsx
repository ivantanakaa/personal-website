import Hero from "./_modules/Hero";
import About from "./_modules/About";
import Skills from "./_modules/Skills";
import Careers from "./_modules/Careers";
import Educations from "./_modules/Educations";
import Honors from "./_modules/Honors";
import Portfolios from "./_modules/Portfolios";
import Cerificates from "./_modules/Certificates";
import Footer from "./_components/Footer";
import Download from "./_components/Download";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

function HomePage() {
  return (
    <div className="relative mx-4">
      <Download />
      <Hero />
      <About />
      <Skills />
      <Careers />
      <Educations />
      <Honors />
      <Portfolios />
      <Cerificates />
      <Footer />
    </div>
  );
}
export default HomePage;
