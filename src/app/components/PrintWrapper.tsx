"use client";

import { useRef } from "react";
import PrintButton from "./PrintButton"; // The button we discussed earlier

export default function PrintWrapper({ children }: { children: React.ReactNode }) {
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* This button is client-side, receiving the ref */}
      <PrintButton contentRef={componentRef} />

      {/* This div marks the area to be printed */}
      <div ref={componentRef} className="print:bg-white">
        {children}
      </div>
    </>
  );
}