"use client";

import Image from "next/image";
import certificates from "./certificates.json";
import React from "react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import { dateFormatMonthYear } from "@/app/utils";
import { usePathname } from "next/navigation";
import Back from "@/app/_components/Back";
const HOME_PAGE_PATH = "/";

export default function Cerificates() {
  const pathname = usePathname();
  const isHomePage = pathname === HOME_PAGE_PATH;

  const handleShowAll = () => {
    sendGAEvent("event", "click", { context: "certificates.show_more" });
  };

  const renderCertificates = () => {
    return certificates.map((certificate, index) => {
      const issueDate = dateFormatMonthYear(certificate.issue_date);
      return (
        <Link
          href={certificate.link}
          className={index < 4 || !isHomePage ? "block" : "hidden"}
          target="_blank"
          rel={"noreferrer noopener"}
          key={`certificates-${index}`}
          onClick={() => {
            sendGAEvent("event", "click", {
              context: "certificates",
              value: {
                title: certificate.title,
                issued_by: certificate.issued_by,
              },
            });
          }}
        >
          <li className={"flex flex-row items-center"}>
            <div className={"mr-2"}>
              <Image
                alt={certificate.title}
                src={certificate.src}
                width={80}
                height={0}
              />
            </div>
            <div className="flex flex-col justify-start">

            <h2 className="font-medium text-xl w-fit">{certificate.title}</h2>
            <div>
              <span>
                {certificate.issued_by} | {issueDate}
              </span>
            </div>
            </div>
          </li>
        </Link>
      );
    });
  };

  return (
    <div className="xl:p-6 p-4  flex flex-col justify-center items-center">
    {!isHomePage && (
      <Back
        onClick={() => {
          sendGAEvent("event", "click", {
            context: "certificates.back",
          });
        }}
      />
    )}
      <h1 className="text-txt-dark mb-4 text-4xl pb-4 border-b-4 px-4 w-fit border-txt-dark text-center">
        Licenses & Certificates
      </h1>

      <ul className="list-none grid md:grid-cols-2 grid-cols-1  grid-flow-row gap-y-4 gap-x-16 my-4">
        {renderCertificates()}
      </ul>
      {isHomePage && (
        <Link
          href={"/certificates"}
          className={
            "text-txt-dark mb-4 pb-1 border-b-4 px-4 w-fit border-txt-dark cursor-pointer mt-4 hover:opacity-75 hover:transition-all delay-150"
          }
          onClick={handleShowAll}
        >
          Check Certificates
        </Link>
      )}
    </div>
  );
}
