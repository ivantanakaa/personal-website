"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import portfolios from "./portfolios.json";
import { usePathname } from "next/navigation";
import Back from "@/app/_components/Back";

const HOME_PAGE_PATH = "/";

export default function Portfolios() {
  const pathname = usePathname();
  const isHomePage = pathname === HOME_PAGE_PATH;

  const handleShowAll = () => {
    sendGAEvent("event", "click", { context: "portfolios.show_more" });
  };

  const renderTitle = () => {
    if (isHomePage) {
      return "Latest Portfolios";
    } else {
      return "Portfolios";
    }
  };

  const renderPortfolios = () => {
    return portfolios.map((portfolio, index) => {
      if (isHomePage && index >= 2) {
        return;
      }
      return (
        <li
          className="flex flex-col md:flex-row justify-center items-center md:items-start"
          key={`portfolios-${index}`}
        >
          <Image
            alt={portfolio.alt}
            src={portfolio.src}
            className="shadow-xl rounded-lg"
            width={400}
            height={225}
          />
          <div className="flex flex-col justify-center items-center md:block md:ml-4 md:max-w-[500px] mb-2 mt-12 md:mt-2">
            <h2 className="font-medium text-xl w-fit text-center mb-4 md:mb-2 border-b-4 pb-2 px-4 md:p-0 border-txt-dark md:border-none">
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
                    onClick={() => {
                      sendGAEvent("event", "click", {
                        context: "portfolio",
                        value: {
                          title: portfolio.name,
                        },
                      });
                    }}
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
    <section className="xl:p-6 p-4 flex flex-col justify-center items-center w-full my-8">
      {!isHomePage && (
        <Back
          onClick={() => {
            sendGAEvent("event", "click", {
              context: "portfolios.back",
            });
          }}
        />
      )}
      <h1 className="text-txt-dark mb-4 text-4xl pb-4 border-b-4 px-4 w-fit border-txt-dark text-center">
        {renderTitle()}
      </h1>

      <ul className="list-none gap-y-4 gap-x-16 my-4">{renderPortfolios()}</ul>
      {isHomePage && (
        <Link
          href={"/portfolios"}
          className={
            "text-txt-dark mb-4 pb-1 border-b-4 px-4 w-fit border-txt-dark cursor-pointer mt-4 hover:opacity-75 hover:transition-all delay-150"
          }
          onClick={handleShowAll}
        >
          Explore My Portfolio
        </Link>
      )}
    </section>
  );
}
