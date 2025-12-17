"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Image from "next/image";
import { useRef } from "react";
import Resume from "../Resume";

export default function Download() {
  const resumeRef = useRef<HTMLDivElement | null>(null);

  const handleOnClickDownload = async () => {
    if (!resumeRef.current) return;

    const html2pdf = (await import("html2pdf.js")).default;

    const options = {
      margin: 5,
      filename: "Ivan_Tanaka_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "legacy"] },
    };

    sendGAEvent("event", "click", { context: "download_resume" });
    html2pdf().set(options).from(resumeRef.current).save();
  };

  return (
    <div className="fixed right-2 xl:right-10 bottom-2 xl:bottom-10">
      <div className="hidden">
        <Resume resumeRef={resumeRef} />
      </div>

      <button
        className="bg-[#3d3d3d] rounded-full p-2 md:px-4 flex flex-row items-center hover:opacity-75 transition-all"
        onClick={handleOnClickDownload}
      >
        <Image
          alt="download pdf"
          src="/assets/images/file-download-icon.svg"
          width={35}
          height={35}
        />
        <div className="font-semibold text-[#ecf0f1] ml-2 hidden md:block">
          Download Resume
        </div>
      </button>
    </div>
  );
}
