import { Metadata } from "next";
import Footer from "../_components/Footer";
import Certificates from "../_modules/Certificates";
import Download from "../_components/Download";

export const metadata: Metadata = {
  title: "Certificates",
};

function CertificatesPage() {
  return (
    <div className="relative mx-4">
      <Download />
      <Certificates />
      <Footer />
    </div>
  );
}
export default CertificatesPage;
