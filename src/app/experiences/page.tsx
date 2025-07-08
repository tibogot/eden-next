import ExperiencesCarousel from "@/components/ExperiencesCarousel2";
import Image from "next/image";
import React from "react";

function experiences() {
  return (
    <div className="wrapper bg-[#FAF3EB]">
      <section className="relative h-svh w-full overflow-hidden px-4 py-10 md:px-8 md:py-10">
        <Image
          src="/images/pool-exp.webp"
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
            Experiences
          </h1>
        </div>
      </section>
      <section className="flex w-full flex-col gap-40 px-4 py-10 md:flex-row md:px-8 md:py-30">
        <div className="right flex flex-col justify-between md:w-1/2">
          <h3 className="font-PPItalic">Authentic Nigerian Delicacies </h3>
          <p className="font-NHD mt-8 w-3/4 text-lg leading-tight text-gray-600">
            Step into the soul of Nigeria through our carefully crafted
            traditional dishes. From aromatic jollof rice and tender suya to
            rich egusi soup and freshly grilled catfish, every meal tells a
            story of our cultural heritage. Our expert chefs use time-honored
            recipes passed down through generations, ensuring each bite delivers
            the authentic flavors that make Nigerian cuisine truly special.
          </p>
        </div>
      </section>
      <section className="flex w-full flex-col gap-40 px-4 py-10 md:flex-row md:px-8 md:py-20">
        <div className="left h-[700px] bg-red-500 md:w-1/2">
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
      <ExperiencesCarousel />
      <section className="flex min-h-screen w-full flex-col bg-red-500 px-4 py-10 md:flex-row md:px-8 md:py-20"></section>
    </div>
  );
}

export default experiences;
