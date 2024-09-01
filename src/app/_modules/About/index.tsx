export default function About() {
  const years_of_experience = new Date().getFullYear() - 2018;
  return (
    <div className="flex justify-center my-4 mx-4">
      <div className="text-justify max-w-[700px] border-[#3d3d3d] border-y-4 py-2 px-2">
        I&apos;m a <strong>software engineer</strong> with{" "}
        <strong>{years_of_experience} years of experience</strong>, specializing in{" "}
        <strong>HTML, CSS, and JavaScript.</strong> I&apos;ve worked with{" "}
        <strong>React, Typescript, Laravel, Next.JS, and Flutter,</strong> and I&apos;m
        skilled in <strong>Git and Figma</strong> for streamlined development and design
        collaboration.
      </div>
    </div>
  );
}
