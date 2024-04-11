import Hero from "./components/home/Hero";
import Skills from "./components/home/Skills";
import Careers from "./components/home/Careers";
import Educations from "./components/home/Educations";
import Honors from "./components/home/Honors";
import Download from "./components/Download";

function Home() {
  return (
    <div className="relative mx-4">
      <Download />
      <Hero />
      <Careers />
      <Educations />
      <div className="flex flex-col lg:flex-row lg:w-max lg:m-auto">
        <Skills /> <Honors />
      </div>
      <div className="mb-10" />
    </div>
  );
}
export default Home;
