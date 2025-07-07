import Image from "next/image";
import React from "react";

function restaurant() {
  return (
    <div className="wrapper bg-[#FAF3EB]">
      {/* Hero Section */}
      <section className="relative h-svh w-full overflow-hidden bg-white px-4 py-10 md:px-8 md:py-10">
        <Image
          src="/images/resto.webp"
          alt="restaurant"
          fill
          priority
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black to-transparent opacity-35"></div>

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
      <section className="px-4 py-10 md:px-8 md:py-30">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-PPItalic text-4xl text-black md:text-6xl">
            Savor the Flavors <br />
            of Eden Garden
          </h2>
          <p className="mt-6 w-1/3 text-lg leading-tight text-gray-600">
            Welcome to Eden Garden's culinary paradise, where the rich
            traditions of Nigerian cuisine meet international flavors in perfect
            harmony. Nestled in the heart of Abuja, our restaurant offers an
            unforgettable dining experience that celebrates both local heritage
            and global gastronomy.
          </p>
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

      <section className="flex h-screen w-full flex-col gap-4 px-4 py-10 md:flex-row md:px-8 md:py-30">
        <div className="left bg-red-500 md:w-1/2"></div>
        <div className="right flex flex-col justify-between bg-blue-500 md:w-1/2">
          <h2>Drinks & Refreshing Beverages </h2>
          <p className="w-3/4 text-lg leading-tight text-gray-600">
            Complement your meal with our extensive selection of beverages.
            Choose from traditional Nigerian drinks like zobo and palm wine,
            international favorites including fresh juices and sodas, or our
            signature cocktails that blend local ingredients with classic
            mixology. Whether you're looking for something refreshing on a warm
            Abuja afternoon or the perfect pairing for your meal, we have
            something to satisfy every taste.
          </p>
        </div>
      </section>
    </div>
  );
}

export default restaurant;
