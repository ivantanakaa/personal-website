import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

const years_of_experience = new Date().getFullYear() - 2018;

export const metadata: Metadata = {
  title: "Ivan Tanaka",
  description: `A seasoned Software Engineer with ${years_of_experience} years of hands-on experience.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="A seasoned web engineer with five years of hands-on experience. Proficient in an array of cutting-edge technologies and frameworks, including React, Typescript, Laravel, Next.js, and Flutter, I bring a wealth of expertise to every project."
        />
        <meta
          name="keywords"
          content="React.js, Next.js , Flutter, Laravel, Typescript, Vue.js, Tailwind, Web Engineer, Web Developer, Frontend Engineer, Frontend Developer, Software Engineer, Software Developer"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
      <GoogleTagManager gtmId="G-S6KXB9Y97V" />
    </html>
  );
}
