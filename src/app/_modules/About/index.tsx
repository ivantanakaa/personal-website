export default function About() {
  const years_of_experience = new Date().getFullYear() - 2018;
  return (
    <section className="flex justify-center my-4 mx-4">
      <div className="text-justify max-w-[700px] border-[#3d3d3d] border-y-4 py-2 px-2">
        I&apos;m a <strong>software engineer</strong> with{" "}
        <strong>{years_of_experience} years of experience</strong>, specializing
        in <strong>HTML, CSS, and JavaScript.</strong> My expertise spans both
        frontend and backend development, working with{" "}
        <strong>
          React, TypeScript, Next.js, Vue.js, Flutter, Go, Laravel, MySQL, and
          PostgreSQL.
        </strong>{" "}
        I&apos;m also skilled in <strong>Git and Figma</strong> for seamless
        development and design collaboration.
        <br />
        <br />I have experience building scalable and high-performance
        applications, particularly in{" "}
        <strong>fintech, e-commerce, and SaaS</strong>. From creating{" "}
        <strong>investment platforms</strong> to optimizing{" "}
        <strong>e-commerce workflows,</strong> my work is focused on delivering
        impactful solutions.
        <br />
        <br />I love software engineering because it allows me to create{" "}
        <strong>real impact</strong> through the systems I build. Having{" "}
        <strong>led multiple projects</strong>, I believe work isn&apos;t just about
        completing tasks— <strong>it&apos;s about driving meaningful change</strong>{" "}
        for users and businesses alike.
      </div>
    </section>
  );
}
