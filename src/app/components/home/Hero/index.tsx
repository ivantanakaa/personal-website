"use client";
import Image from "next/image";
import Link from "next/link";
import contacts from "../../contacts.json";
import { sendGAEvent } from "@next/third-parties/google";

export default function Hero() {
  return (
    <div className="md:p-12 p-8 flex flex-col md:flex-row justify-center gap-2 items-center">
      <h1 className=" text-4xl md:mb-0 mb-4 text-center border-[#3d3d3d] md:border-r-4 md:pr-4">
        Hi, I&apos;m
        <div className="text-6xl mt-4">Ivan Tanaka</div>
        <div className="mt-4"> Software Engineer</div>
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

      <div className="flex gap-2 w-fit border-t-4 pt-4 md:pt-0 md:border-t-0 px-2 h-100 border-[#3d3d3d] flex-col justify-center">
        {contacts.map((contact, index) => {
          return (
            <Link
              href={contact.link}
              className="flex flex-row items-center hover:opacity-70 hover:transition-all  delay-150"
              key={`contact-${index}`}
              target={"_blank"}
              rel={"noreferrer noopener"}
              onClick={() => {
                sendGAEvent("event", "contactClicked", { value: contact.alt });
              }}
            >
              <Image
                alt={contact.alt}
                src={contact.icon}
                width={35}
                height={35}
              />
              <div className="ml-2">{contact.label}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
