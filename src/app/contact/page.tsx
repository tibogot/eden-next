"use client";
import React, { useState } from "react";
import Image from "next/image";
import Copy from "@/components/Copy5";
import BookingForm from "@/components/BookingForm";

function contact() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div>
      <section className="relative h-svh w-full overflow-hidden px-4 py-10 md:px-8 md:py-10">
        <Image
          src="/images/contact-bg.webp"
          alt="Contact Background"
          fill
          priority
          className="absolute top-0 left-0 h-full w-full object-cover"
          sizes="100vw"
          quality={90}
          onLoad={() => setImageLoaded(true)}
        />
        <div
          className={`absolute inset-0 z-10 bg-gradient-to-b from-black to-transparent transition-opacity duration-300 ${
            imageLoaded ? "opacity-35" : "opacity-0"
          }`}
        />

        <div className="relative z-10 mb-12 flex h-full w-full flex-col items-start justify-end">
          <Copy isHero>
            <h1 className="font-PPRegular text-6xl text-white md:text-9xl">
              Contact us
            </h1>
          </Copy>
        </div>
      </section>
      <BookingForm />
    </div>
  );
}

export default contact;
