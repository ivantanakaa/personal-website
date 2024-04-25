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
      {/* <div className="flex flex-col lg:flex-row lg:w-max lg:m-auto">
      </div> */}
      <Footer />
    </div>
  );
}
export default HomePage;
