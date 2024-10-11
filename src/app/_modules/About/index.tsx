export default function About() {
  const years_of_experience = new Date().getFullYear() - 2018;
  return (
    <section className="flex justify-center my-4 mx-4">
      <div className="text-justify max-w-[700px] border-[#3d3d3d] border-y-4 py-2 px-2">
        I&apos;m a <strong>software engineer specialist</strong> with{" "}
        <strong>{years_of_experience} years of experience</strong>, specializing
        in <strong>HTML, CSS, and JavaScript.</strong> My expertise extends to
        working with{" "}
        <strong>React, TypeScript, Laravel, Next.js, and Flutter,</strong> and
        I&apos;m skilled in using <strong>Git and Figma</strong> for seamless
        development and design collaboration.
        <br />
        <br /> I love software engineering because it allows me to make a{" "}
        <strong>real impact</strong> on users through the systems I build.
        Having <strong>led several projects,</strong> I&apos;ve come to believe
        that work is not just about completing tasks—
        <strong>
          it&apos;s about embracing the positive change we can create for those
          around us.
        </strong>
      </div>
    </section>
  );
}
