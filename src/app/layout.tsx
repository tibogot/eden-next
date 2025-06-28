import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import Menu from "@/components/Navigation4";
// import ScrollProgress from "@/components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ppEditorialNew = localFont({
  src: [
    {
      path: "../fonts/PPEditorialNew-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pp-editorial-new",
  display: "swap",
});

const ppEditorialNewItalic = localFont({
  src: [
    {
      path: "../fonts/PPEditorialNew-Italic.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pp-editorial-new-italic",
  display: "swap",
});

const neueHaasDisplay = localFont({
  src: [
    {
      path: "../fonts/NeueHaasDisplay-Roman.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eden Park & Garden",
  description:
    "Eden Park & Garden is a family-owned and operated business that provides a wide range of services to the community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${ppEditorialNew.variable} ${ppEditorialNewItalic.variable} ${neueHaasDisplay.variable} antialiased`}
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
