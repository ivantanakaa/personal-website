import { Metadata } from "next";
import Download from "../components/Download";
import Footer from "../components/Footer";
import Portfolios from "../components/modules/Portfolios";

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
