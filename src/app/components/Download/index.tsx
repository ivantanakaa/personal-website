import Image from "next/image";
import Link from "next/link";

export default function Download() {
  return (
    <div className="fixed right-2 xl:right-10 bottom-2 xl:bottom-10">
      <Link
        download={"Ivan Tanaka Resume"}
        target="_blank"
        href="/assets/pdf/Ivan Tanaka Resume.pdf"
        prefetch={false}
        locale={false}
      >
        <div className="bg-[#3d3d3d] rounded-full p-2 md:px-4 flex flex-row items-center">
          <Image
            alt="download pdf"
            src="/assets/images/file-download-icon.svg"
            width={35}
            height={35}
          />
          <div className="font-semibold text-[#ecf0f1] ml-2 hidden md:block">
            Download Resume
          </div>
        </div>
      </Link>
    </div>
  );
}
