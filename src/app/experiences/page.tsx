import Copy from "@/components/Copy3";
import ExperiencesCarouselGSAP from "@/components/ExperiencesCarouselGSAP2";
import Image from "next/image";
import React from "react";

function experiences() {
  return (
    <div className="wrapper bg-[#FAF3EB]">
      <section className="relative h-svh w-full overflow-hidden px-4 py-10 md:px-8 md:py-10">
        <Image
          src="/images/barmaid-exp.webp"
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
          <Copy isHero>
            <h1 className="font-PPRegular text-6xl text-white md:text-9xl">
              Experiences
            </h1>
          </Copy>
        </div>
      </section>
      <section className="px-4 py-10 md:px-8 md:py-30">
        <div className="flex flex-col items-center text-center">
          <Copy>
            <h3 className="font-PPItalic text-4xl text-black md:text-6xl">
              Savor the Flavors <br />
              of Eden Garden
            </h3>
          </Copy>

          <p className="font-NHD mt-6 text-lg leading-tight text-gray-600 md:w-1/3">
            Welcome to Eden Garden's culinary paradise, where the rich
            traditions of Nigerian cuisine meet international flavors in perfect
            harmony. Nestled in the heart of Abuja, our restaurant offers an
            unforgettable dining experience that celebrates both local heritage
            and global gastronomy.
          </p>
        </div>
      </section>
      <section className="flex w-full flex-col gap-10 px-4 py-10 md:flex-row md:gap-60 md:px-8 md:py-20">
        <div className="left h-[500px] bg-red-500 md:h-[700px] md:w-1/2">
          <div className="relative h-full w-full">
            <Image
              src="/images/foot-exp.webp"
              alt="Drinks & Refreshing Beverages"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute top-0 left-0 z-0 h-full w-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="right flex flex-col justify-end md:w-1/2">
          {/* <h3 className="font-PPItalic">Drinks & Refreshing Beverages </h3> */}
          <p className="font-NHD w-3/4 text-lg leading-tight text-gray-600">
            Eden Park & Garden is a vibrant oasis in Abuja, offering a unique
            blend of entertainment and relaxation. From live music and dance
            shows to thrilling football matches, there's something for everyone.
            Indulge in traditional cuisine while enjoying the l
          </p>
        </div>
      </section>
      {/* <ExperiencesCarousel /> */}
      {/* <ExperiencesCarouselFM /> */}
      <ExperiencesCarouselGSAP />
      <section className="h-[800px] w-full px-4 py-10 md:px-8 md:py-20">
        <div className="h-full w-full bg-blue-500">
          <img
            src="./images/drone2.webp"
            alt="drone map"
            className="h-full w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}

export default experiences;
