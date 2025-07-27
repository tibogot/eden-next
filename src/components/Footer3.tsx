"use client";

import Link from "next/link";
import Image from "next/image";
import { InstagramLogo, Phone, FacebookLogo } from "@phosphor-icons/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="relative h-[100svh]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative -top-[100vh] h-[calc(100vh+100svh)]">
        <div className="sticky top-[calc(100vh-100svh)] h-[100svh] bg-[#FAF3EB]">
          <section className="relative flex h-full w-full overflow-hidden">
            {/* Info block */}
            <div className="font-NHD mt-32 flex flex-col gap-4 self-start px-4 text-xl text-lime-900 md:mt-32 md:px-8">
              <address className="mt-3 leading-tight not-italic">
                Eden Park & Garden
                <br />
                123 Garden Lane
                <br />
                City, Country
                <br />
                info@edenpark.com
                <br />
                +1 234 567 8900
              </address>

              <div className="mt-4 flex gap-4">
                <Link
                  href="tel:+12345678900"
                  className="text-lime-900 transition-colors hover:text-lime-700"
                >
                  <Phone size={32} />
                </Link>
                <Link
                  href="https://instagram.com/edenpark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-900 transition-colors hover:text-lime-700"
                >
                  <InstagramLogo size={32} />
                </Link>
                <Link
                  href="https://facebook.com/edenpark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-900 transition-colors hover:text-lime-700"
                >
                  <FacebookLogo size={32} />
                </Link>
              </div>
            </div>

            {/* Decorative plant image */}
            <div className="absolute top-[-10%] right-[-25%] z-10 md:top-[-20%] md:right-[-10%]">
              <Image
                src="/images/plants-png.webp"
                alt="Plants decoration"
                width={300}
                height={200}
                className="h-auto w-auto"
                priority
              />
            </div>

            {/* Logo at bottom center */}
            <div className="absolute bottom-0 left-1/2 w-[90vw] -translate-x-1/2 md:w-[65vw]">
              <img
                src="/logo2.svg"
                alt="Logo green"
                className="h-auto w-full"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
