"use client";

import Link from "next/link";
import Image from "next/image";
import { InstagramLogo, Phone, FacebookLogo } from "@phosphor-icons/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF3EB]">
      <section className="h-screen w-full overflow-hidden">
        <div className="relative flex h-full">
          {/* Info block: now in normal flow, left-aligned */}
          <div className="font-NHD mt-32 flex flex-col gap-4 self-start px-4 text-xl text-lime-900 md:mt-32 md:px-8">
            {/* <nav className="flex flex-col gap-1">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link href="/services" className="hover:underline">
                Services
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </nav> */}
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

            {/* Social Media Icons */}
            <div className="mt-4 flex gap-4">
              {/* Phone Icon */}
              <Link
                href="tel:+12345678900"
                className="text-lime-900 transition-colors hover:text-lime-700"
              >
                <Phone size={32} />
              </Link>

              {/* Instagram Icon */}
              <Link
                href="https://instagram.com/edenpark"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-900 transition-colors hover:text-lime-700"
              >
                <InstagramLogo size={32} />
              </Link>

              {/* Facebook Icon */}
              <Link
                href="https://facebook.com/edenpark"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-900 transition-colors hover:text-lime-700"
              >
                <FacebookLogo size={32} />
              </Link>
            </div>

            {/* <span className="mt-2 text-xs text-lime-900/60">
              © {currentYear} Eden Park & Garden
            </span> */}
          </div>

          {/* Decorative plant image (absolute) */}
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

          {/* Logo (absolute, centered at bottom) */}
          <div className="absolute bottom-0 left-1/2 w-[90vw] -translate-x-1/2 md:w-[65vw]">
            <img src="/logo2.svg" alt="Logo green" className="h-auto w-full" />
          </div>
        </div>
      </section>
    </footer>
  );
}
