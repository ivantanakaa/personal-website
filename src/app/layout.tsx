import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const years_of_experience = new Date().getFullYear() - 2018;

// Modern Next.js Metadata API
export const metadata: Metadata = {
  title: "Ivan Tanaka | Software Engineer",
  description: `A seasoned software engineer specialist with ${years_of_experience} years of hands-on experience. Proficient in React, Typescript, Laravel, Next.js, and Go.`,
  keywords: "React.js, Next.js, Flutter, Laravel, Typescript, Go, Tailwind, Software Engineer, Ivan Tanaka",
  authors: [{ name: "Ivan Tanaka" }],
  openGraph: {
    title: "Ivan Tanaka | Software Engineer",
    description: "Building impactful solutions with 8 years of engineering expertise.",
    url: "https://ivantanakaa.vercel.app",
    siteName: "Ivan Tanaka Portfolio",
    images: [
      {
        url: "/assets/images/og-image.png",
        width: 1200,
        height: 1200,
        alt: "Ivan Tanaka Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivan Tanaka | Software Engineer",
    description: "Building impactful solutions with 8 years of engineering expertise.",
    images: ["/og-image.png"],
  },
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <GoogleAnalytics gaId="G-S6KXB9Y97V" />
      </body>
    </html>
  );
}