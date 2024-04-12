import Hero from "./components/home/Hero";
import Skills from "./components/home/Skills";
import Careers from "./components/home/Careers";
import Educations from "./components/home/Educations";
import Honors from "./components/home/Honors";
import Download from "./components/Download";
import About from "./components/home/About";
import Footer from "./components/Footer";

function Home() {
  return (
    <div className="relative mx-4">
      <Download />
      <Hero />
      <About />
      <Careers />
      <Educations />
      <div className="flex flex-col lg:flex-row lg:w-max lg:m-auto">
        <Skills /> <Honors />
      </div>
      <Footer />
    </div>
  );
}
export default Home;
