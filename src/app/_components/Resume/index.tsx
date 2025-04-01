import about from "@/app/_modules/About/about.json";
import careers from "@/app/_modules/Careers/careers.json";
import contacts from "@/app/_components/contacts.json";
import honors from "@/app/_modules/Honors/honors.json";
import portfolios from "@/app/_modules/Portfolios/portfolios.json";
import skills from "@/app/_modules/Skills/skills.json";
import { dateFormatMonthYear } from "@/app/utils";
import Link from "next/link";
import { MutableRefObject } from "react";
import Image from "next/image";

export default function Resume({
  resumeRef,
}: {
  resumeRef?: MutableRefObject<HTMLDivElement | null>;
}) {
  const years_of_experience =
    new Date().getFullYear() - about.years_of_experience_start;

  const renderCareers = () => {
    return careers.map((career, index) => {
      const startDate = dateFormatMonthYear(career.start_date);
      const endDate = career.end_date && dateFormatMonthYear(career.end_date);
      return (
        <div
          className="flex flex-col justify-start my-4 w-full px-4"
          key={`career-${index}`}
        >
          <h2 className=" font-medium text-xl w-full">
            {career.corporate_link ? (
              <Link
                className="text-blue-500 hover:text-blue-700 hover:transition-all delay-150"
                href={career.corporate_link}
                target={"_blank"}
                rel={"noreferrer noopener"}
              >
                {career.corporate}
              </Link>
            ) : (
              career.corporate
            )}
            <span className="block mt-2 md:mt-0 text-md  border-l-4  pl-2  mb-2 border-[#3d3d3d]">
              {career.position}
            </span>
          </h2>
          <div>
            <span>
              {startDate} - {endDate ? endDate : <i>Present</i>}
            </span>
          </div>
          <div className="mt-1 pl-1">
            <ul className="list-disc">
              {career.jobs.map((job, index) => {
                return (
                  <li
                    key={`job-${index}`}
                    dangerouslySetInnerHTML={{ __html: job }}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      );
    });
  };

  const renderPortfolios = () => {
    return portfolios.map((portfolio, index) => {
      return (
        <li
          className="flex flex-row justify-center items-center px-4"
          key={`portfolios-${index}`}
        >
          <div className="flex flex-col justify-center mb-2">
            <h2 className="font-medium text-lg w-fit mb-4 border-txt-dark">
              {portfolio.name}
            </h2>
            <div
              className="text-justify"
              dangerouslySetInnerHTML={{ __html: portfolio.description }}
            />
            <div className="my-6 w-full">
              {portfolio.link?.url && portfolio.link?.text && (
                <div className="font-medium mb-2 text-sm">
                  Link:{" "}
                  <Link
                    href={portfolio.link.url}
                    className="text-blue-500 hover:text-blue-700 hover:transition-all delay-150"
                    target="_blank"
                    rel={"noreferrer noopener"}
                  >
                    {portfolio.link?.text}
                  </Link>
                </div>
              )}
              <div className="font-medium mt-2 text-sm">
                Tags:{" "}
                <span className="font-semibold">
                  {portfolio.tags.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <section
      ref={resumeRef}
      className="flex flex-col items-center w-full resume-container p-8"
    >
      <header className="flex flex-col justify-center w-full">
        <h1 className=" text-xl mb-0 text-center pr-4 w-full">
          <div className="text-2xl flex flex-col items-center justify-center">
            IVAN TANAKA
            <span className="text-lg cursor-help" title="Chényùfán">
              {" "}
              (陈裕凡)
            </span>
          </div>
          <div className="mt-3"> Software Engineer</div>
        </h1>
        <div className="grid grid-cols-2 gap-4 w-full px-4 h-100 pt-4 mt-4 border-[#3d3d3d] border-t-4">
          {contacts.map((contact, index) => (
            <Link
              href={contact.link}
              className="flex flex-row items-center hover:opacity-70 hover:transition-all delay-150 w-fit"
              key={`contact-${index}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image
                alt={contact.alt}
                src={contact.icon}
                width={25}
                height={25}
              />
              <div className="ml-2">{contact.label}</div>
            </Link>
          ))}
        </div>
      </header>
      <div className="w-full border-[#3d3d3d] border-y-2 my-4"></div>
      {about.description.map((paragraph, index) => (
        <p
          key={index}
          className="px-4 text-justify my-3"
          dangerouslySetInnerHTML={{
            __html: paragraph.replace(
              "{years_of_experience}",
              String(years_of_experience)
            ),
          }}
        />
      ))}
      <div className="w-full border-[#3d3d3d] border-y-2 my-4"></div>
      <div className="flex items-center flex-col">
        <h1 className="text-txt-dark text-2xl mb-4 pb-4 border-b-4 px-4 w-fit border-txt-dark text-center">
          Skills
        </h1>
      </div>
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="mb-0 w-full px-4">
          <h3 className="text-md font-semibold mb-0 text-center">{category}</h3>
          <ul className="list-disc grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-flow-row gap-y-2 gap-x-16 my-4">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      <h1 className="text-txt-dark mb-4 text-2xl pb-4 border-b-4 px-4 w-fit border-txt-dark">
        Careers
      </h1>
      {renderCareers()}

      <h1 className="text-txt-dark mb-4 text-2xl pb-4 border-b-4 px-4 w-fit border-txt-dark text-center">
        Portfolios
      </h1>
      {renderPortfolios()}

      <h1 className="text-txt-dark text-2xl mb-4 pb-4 border-b-4 px-4 w-fit border-txt-dark">
        Honors
      </h1>
      <ul className="list-disc my-4 w-full px-5">
        {honors.map((data, index) => {
          return (
            <li
              className="mb-4"
              key={`honor-${index}`}
              dangerouslySetInnerHTML={{ __html: data }}
            />
          );
        })}
      </ul>
    </section>
  );
}
