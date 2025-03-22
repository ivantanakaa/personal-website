"use client";

import Image from "next/image";
import Link from "next/link";
import contacts from "../../_components/contacts.json";
import { sendGAEvent } from "@next/third-parties/google";

export default function ResumeHero() {
  return (
    <header className="flex flex-col md:flex-row justify-center gap-2 items-center mx-4">
      <h1 className=" text-4xl md:mb-0 mb-4 text-center border-[#3d3d3d] md:border-r-4 md:pr-4">
        Hi, I&apos;m
        <div className="text-6xl mt-4">
          Ivan Tanaka
        </div>
          <span className="text-2xl cursor-help" title="Chényùfán"> (陈裕凡)</span>
        <div className="mt-3"> Software Engineer</div>
      </h1>
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
                sendGAEvent("event", "click", {
                  context: "contact",
                  value: contact.alt,
                  position: "hero",
                });
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
    </header>
  );
}
