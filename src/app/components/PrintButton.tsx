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
    <div className="fixed bottom-8 right-8 z-50 print:hidden">
      <button
        onClick={() => handlePrint()}
        className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border border-amber-400/50"
      >
        <Download size={20} />
        Download CV
      </button>
    </div>
  );
}