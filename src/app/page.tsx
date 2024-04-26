import Hero from "./components/modules/Hero";
import About from "./components/modules/About";
import Skills from "./components/modules/Skills";
import Careers from "./components/modules/Careers";
import Educations from "./components/modules/Educations";
import Honors from "./components/modules/Honors";
import Portfolios from "./components/modules/Portfolios";
import Cerificates from "./components/modules/Certificates";
import Footer from "./components/Footer";
import Download from "./components/Download";
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
