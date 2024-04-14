"use client";

import Image from "next/image";
import certificates from "./certificates.json";
import React from "react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

export default function Cerificates() {
  const renderCertificates = () => {
    return certificates.map((certificate, index) => {
      const issueDate = new Date(certificate.issue_date)
        .toLocaleDateString("en-GB", {
          month: "short",
          year: "numeric",
        })
        .replace(" ", ". ");
      return (
        <Link
          href={certificate.link}
          target="_blank"
          rel={"noreferrer noopener"}
          key={`certificates-${index}`}
          onClick={() => {
            sendGAEvent("event", "certificates_clicked", {
              value: {
                title: certificate.title,
                issued_by: certificate.issued_by,
              },
            });
          }}
        >
          <li className="flex flex-col justify-start my-4">
            <h2 className=" font-medium text-2xl w-fit">{certificate.title}</h2>
            <div>
              <span>
                {certificate.issued_by} | {issueDate}
              </span>
            </div>
            <div>
              <Image
                alt={certificate.title}
                src={certificate.src}
                width={330}
                height={255}
              />
            </div>
          </li>
        </Link>
      );
    });
  };

  return (
    <div className="xl:p-6 p-4  flex flex-col justify-center items-center">
      <h1 className="text-txt-dark mb-4 text-4xl pb-4 border-b-4 px-4 w-fit border-txt-dark">
        Licenses & Certificates
      </h1>

      <ul className="list-disc grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1  grid-flow-row gap-y-4 gap-x-16">
        {renderCertificates()}
      </ul>
    </div>
  );
}
