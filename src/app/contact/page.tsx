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
          quality={90}
          sizes="100vw"
          className="absolute top-0 left-0 h-full w-full object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
