import { Metadata } from "next";
import dynamic from "next/dynamic";
const Download = dynamic(() => import("../_components/Download"), {
  ssr: false,
});
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
