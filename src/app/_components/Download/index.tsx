"use client";
import { sendGAEvent } from "@next/third-parties/google";
import Image from "next/image";
import { useRef } from "react";
import Resume from "../Resume";
import html2pdf from "html2pdf.js";


export default function Download() {
  const resumeRef = useRef(null);

  const handleOnClickDownload = () => {
    const element = resumeRef.current;
    const options = {
      margin: 5,
      filename: "Ivan_Tanaka_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2,useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "legacy"] },
    };
  
    if (element) {
      html2pdf().set(options).from(element).save();
    }
  };

  return (
    <div className="fixed right-2 xl:right-10 bottom-2 xl:bottom-10">
      <div className="hidden">
        <Resume resumeRef={resumeRef} />
      </div>

      <button
        className="bg-[#3d3d3d] rounded-full p-2 md:px-4 flex flex-row items-center hover:opacity-75 hover:transition-all delay-150"
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
