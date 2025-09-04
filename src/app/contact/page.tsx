import React from "react";
import Image from "next/image";
import Copy from "@/components/Copy5";
import BookingForm from "@/components/BookingForm";

function contact() {
  return (
    <div>
      <section className="relative h-svh w-full overflow-hidden bg-white px-4 py-10 md:px-8 md:py-10">
        <Image
          src="/images/contact-bg.webp"
          alt="Contact Background"
          fill
          priority
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black to-transparent opacity-35"></div>

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
