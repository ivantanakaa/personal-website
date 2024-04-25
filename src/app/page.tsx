import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Skills from "./components/home/Skills";
import Careers from "./components/home/Careers";
import Educations from "./components/home/Educations";
import Honors from "./components/home/Honors";
import Portfolios from "./components/home/Portfolios";
import Cerificates from "./components/home/Certificates";
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
