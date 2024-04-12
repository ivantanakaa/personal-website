export default function About() {
  const years_of_experience = new Date().getFullYear() - 2018;
  return (
    <div className="flex justify-center my-4">
      <div className="text-justify max-w-[700px] border-[#3d3d3d] border-y-4 py-2 px-2">
        I&apos;m a <b>software engineer</b> with{" "}
        <b>{years_of_experience} years of experience</b>, specializing in{" "}
        <b>HTML, CSS, and JavaScript.</b> I&apos;ve worked with{" "}
        <b>React, Typescript, Laravel, Next.JS, and Flutter,</b> and I&apos;m
        skilled in <b>Git and Figma</b> for streamlined development and design
        collaboration.
      </div>
    </div>
  );
}
