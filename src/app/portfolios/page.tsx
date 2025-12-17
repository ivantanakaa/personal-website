import { Metadata } from "next";

import Footer from "../_components/Footer";
import Portfolios from "../_modules/Portfolios";
import Download from "../_components/Download";

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
