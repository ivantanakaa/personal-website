"use client";
import Link from "next/link";
import contacts from "../contacts.json";
import Image from "next/image";
import { sendGAEvent } from "@next/third-parties/google";
export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center mt-8 py-2">
      <div className="flex mb-2 justify-center items-center">
        {contacts.map((contact, index) => {
          return (
            <Link
              href={contact.link}
              key={`contact-${index}`}
              className="flex flex-row items-center hover:opacity-70 hover:transition-all mx-1 delay-150"
              target={"_blank"}
              rel={"noreferrer noopener"}
              onClick={() => {
                sendGAEvent("event", "click", {
                  context: "contact",
                  value: contact.alt,
                  position: "footer",
                });
              }}
            >
              <Image
                alt={contact.alt}
                src={contact.icon}
                width={30}
                height={30}
              />
            </Link>
          );
        })}
      </div>
      Ivan Tanaka | est. 2024
    </footer>
  );
}
