import Image from "next/image";
import Link from "next/link";

export default function Download() {
  return (
    <div className="fixed right-2 xl:right-10 bottom-2 xl:bottom-10">
      <Link
        download={"Ivan Tanaka CV"}
        target="_blank"
        href="/assets/pdf/Ivan Tanaka CV.pdf"
        prefetch={false}
        locale={false}
      >
        <div className="bg-[#3d3d3d] rounded-full p-2">
          <Image
            alt="download pdf"
            src="/assets/images/file-download-icon.svg"
            width={35}
            height={35}
          />
        </div>
      </Link>
    </div>
  );
}
