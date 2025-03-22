import { Metadata } from "next";
import dynamic from "next/dynamic";
const Download = dynamic(() => import("../_components/Download"), {
  ssr: false,
});

import Footer from "../_components/Footer";
import Portfolios from "../_modules/Portfolios";

export const metadata: Metadata = {
  title: "Portfolios",
};

function PortfoliosPage() {
  return (
    <div className="relative mx-4">
      <Download />
      <Portfolios />
      <Footer />
    </div>
  );
}
export default PortfoliosPage;
