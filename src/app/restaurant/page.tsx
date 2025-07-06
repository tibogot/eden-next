import Image from "next/image";
import React from "react";

function restaurant() {
  return (
    <div className="wrapper bg-[#FAF3EB]">
      {/* Hero Section */}
      <section className="relative h-svh w-full overflow-hidden bg-white px-4 py-10 md:px-8 md:py-10">
        <Image
          src="/images/isiewu.webp"
          alt="restaurant"
          fill
          priority
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black to-transparent opacity-25"></div>

        <div className="relative z-10 mb-12 flex h-full w-full flex-col items-start justify-end">
          {/* <p className="font-PPItalic mb-12 text-3xl text-white md:w-1/2">
          Discover the flavors of the world,
          <br /> crafted to your every desire
        </p> */}
          <h1 className="font-PPRegular text-6xl text-white md:text-9xl">
            Restaurant
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-10 md:px-8 md:py-20">
        <div className="md:flex">
          <div className="left md:w-1/2">
            <h2 className="font-PPItalic text-4xl text-black md:text-6xl">
              Savor the Flavors <br />
              of Eden Garden
            </h2>
          </div>
          <div className="right md:flex md:w-1/2 md:justify-end">
            <p className="mt-6 text-lg leading-tight text-gray-600 md:mt-0 md:w-3/4">
              Welcome to Eden Garden's culinary paradise, where the rich
              traditions of Nigerian cuisine meet international flavors in
              perfect harmony. Nestled in the heart of Abuja, our restaurant
              offers an unforgettable dining experience that celebrates both
              local heritage and global gastronomy.
            </p>
          </div>
        </div>
      </section>
      <section className="relative h-[150vh] w-full overflow-hidden bg-green-500 px-4 py-10 md:px-8 md:py-20">
        <div className="relative z-10 flex h-full w-full justify-center">
          <h1 className="font-PPItalic text-center text-4xl leading-tight text-white md:text-6xl">
            A New Standard of
            <br />
            Living at Eden
          </h1>
        </div>

        <Image
          src="/images/soup.webp"
          alt="restaurant"
          fill
          className="absolute top-0 left-0 z-0 h-full w-full object-cover"
          priority
        />
      </section>
    </div>
  );
}

export default restaurant;
