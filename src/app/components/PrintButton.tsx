"use client";
import { Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";

export default function PrintButton({ contentRef }: { contentRef: React.RefObject<HTMLDivElement> }) {
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Ivan_Tanaka_Resume`,
    pageStyle: `
      @page { size: auto; margin: 15mm; }
      @media print {
        body { background-color: white !important; -webkit-print-color-adjust: exact; }
        .print-white { background-color: white !important; color: black !important; }
        .no-print { display: none !important; }
        h1, h2, h3, p, li, span { color: black !important; }
        .accent-text { color: #d97706 !important; } /* Amber-600 */
        li { list-style: none }
      }
    `,
  });

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 print:hidden">
      <button
        onClick={() => handlePrint()}
        className="group flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 border border-amber-400/30"
        aria-label="Download CV as PDF"
      >
        <Download size={18} className="sm:w-5 sm:h-5 group-hover:animate-bounce" />
        <span className="text-sm sm:text-base">Download CV</span>
      </button>
    </div>
  );
}