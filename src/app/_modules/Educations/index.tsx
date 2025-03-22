"use client";

import { dateFormatYear } from "@/app/utils";
import educations from "./educations.json";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

export default function Educations() {
  const renderEducations = () => {
    return educations.map((education, index) => {
      const startDate = dateFormatYear(education.start_date);
      const endDate = education.end_date && dateFormatYear(education.end_date);
      return (
        <div
          className="flex flex-col justify-start my-4"
          key={`education-${index}`}
        >
          <h2 className="font-medium text-2xl mb-2 w-fit ">
            <Link
              className="text-blue-500 hover:text-blue-700 hover:transition-all delay-150"
              href={education.link}
              target={"_blank"}
              rel={"noreferrer noopener"}
              onClick={() => {
                sendGAEvent("event", "click", {
                  context: "education",
                });
              }}
            >
              {education.university}
            </Link>
          </h2>
          <div>
            <span>
              {startDate} - {endDate ? endDate : <i>Present</i>}
            </span>

            <span className=" border-l-4 ml-4 pl-4 h-100 border-[#3d3d3d]">
              {education.degree}
            </span>
          </div>
          <div className="mt-4 pl-1 max-w-[700px]">
            <ul className="list-disc">
              {education.achievements.map((achievement, index) => {
                return (
                  <li
                    key={`achievement-${index}`}
                    dangerouslySetInnerHTML={{ __html: achievement }}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      );
    });
  };
  return (
    <section className="xl:p-6 p-4 flex flex-col justify-center items-center mx-4">
      <h1 className="text-txt-dark mb-4 text-4xl pb-4 border-b-4 px-4 w-fit border-txt-dark">
        Educations
      </h1>
      <div className="flex flex-col">{renderEducations()}</div>
    </section>
  );
}
