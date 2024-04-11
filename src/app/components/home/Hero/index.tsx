import Image from "next/image";

export default function Hero() {
  return (
    <div className="md:p-12 p-8 flex flex-row justify-center gap-2">
      <h1 className=" text-4xl mb-6 text-center">
        Hi, I&apos;m
        <div className="text-6xl mt-4">Ivan Tanaka</div>
        <div className="mt-8"> A Web Engineer</div>
      </h1>
      {/* <p className="text-txt-light xl:w-1/2 mb-4">
        A seasoned web engineer with five years of hands-on experience.
        Proficient in an array of cutting-edge technologies and frameworks,
        including React, Typescript, Laravel, Next.js, and Flutter, I bring a
        wealth of expertise to every project.
      </p>
      <p className="text-txt-light xl:w-1/2">
        My passion lies in creating seamless and user-centric digital
        experiences. I am always eager to collaborate on exciting new ventures,
        so feel free to reach out and connect with me!
      </p> */}
      
      <div className="flex gap-2 w-fit border-l-4 px-2 h-100 border-[#3d3d3d] flex-col justify-center">
        <a
          href={"https://wa.link/nf8yeb"}
          target={"_blank"}
          rel={"noreferrer noopener"}
        >
          <Image
            alt="whatsapp"
            src="/assets/images/whatsapp-icon.svg"
            width={35}
            height={35}
          />
        </a>
        <a
          href={"https://www.linkedin.com/in/ivantanakaa/"}
          target={"_blank"}
          rel={"noreferrer noopener"}
        >
          <Image
            alt="linkedin"
            src="/assets/images/linkedin-icon.svg"
            width={35}
            height={35}
          />
        </a>
        <a
          href={"https://github.com/IvanTanakaa"}
          target={"_blank"}
          rel={"noreferrer noopener"}
        >
          <Image
            alt="github"
            src="/assets/images/github-icon.svg"
            width={35}
            height={35}
          />
        </a>
      </div>
    </div>
  );
}
