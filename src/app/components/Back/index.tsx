"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BackParams {
  onClick?: () => void;
}

export default function Back(params: BackParams) {
  const { onClick } = params;
  const router = useRouter();

  const handleBack = () => {
    onClick && onClick();
    return router.back();
  };
  return (
    <div className="fixed top-0 left-0" onClick={handleBack}>
      <div className="p-2 md:px-4 flex flex-row items-center hover:opacity-75 hover:transition-all delay-150">
        <Image
          alt="back"
          src="/assets/images/chevron-left-icon.svg"
          width={35}
          height={35}
        />
        <div className="font-semibold text-[#3d3d3d] ml-2 hidden md:block">
          Back
        </div>
      </div>
    </div>
  );
}
