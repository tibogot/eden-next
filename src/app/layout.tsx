import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer3";
import LenisProvider from "@/components/LenisProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import Menu from "@/components/Navigation7";
// import ScrollProgress from "@/components/ScrollProgress";

const ppEditorialNew = localFont({
  src: [
    {
      path: "../fonts/PPEditorialNew-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pp-editorial-new",
  display: "swap",
  preload: true,
  fallback: ["serif"],
});
const ppEditorialNewUL = localFont({
  src: [
    {
      path: "../fonts/PPEditorialNew-Ultralight.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pp-editorial-new-ultralight",
  display: "optional",
  preload: false,
  fallback: ["serif"],
});

const ppEditorialNewItalic = localFont({
  src: [
    {
      path: "../fonts/PPEditorialNew-Italic.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pp-editorial-new-italic",
  display: "optional",
  preload: false,
  fallback: ["serif"],
});

const neueHaasDisplay = localFont({
  src: [
    {
      path: "../fonts/NeueHaasDisplay-Roman.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas-display",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Eden Park & Garden",
  description:
    "Eden Park & Garden is a family-owned and operated business that provides a wide range of services to the community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/PPEditorialNew-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/NeueHaasDisplay-Roman.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        suppressHydrationWarning
        className={` ${ppEditorialNew.variable} ${ppEditorialNewUL.variable} ${ppEditorialNewItalic.variable} ${neueHaasDisplay.variable} antialiased`}
      >
        <LenisProvider>
          <ScrollToTop />
          {/* <ScrollProgress /> */}
          {/* <Navigation /> */}
          <Menu />
          <main className="">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
