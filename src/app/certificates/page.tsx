import { Metadata } from "next";
import Download from "../_components/Download";
import Footer from "../_components/Footer";
import Certificates from "../_modules/Certificates";

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
