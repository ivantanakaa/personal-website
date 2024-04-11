import Hero from "./components/home/Hero";
import Skills from "./components/home/Skills";
import Careers from "./components/home/Careers";
import Educations from "./components/home/Educations";
import Honors from "./components/home/Honors";

function Home() {
  return (
    <>
      <Hero />
      <Careers />
      <Educations />
      <div className="flex flex-col lg:flex-row lg:w-max lg:m-auto">
        <Skills /> <Honors />
      </div>
    </>
  );
}
export default Home;
