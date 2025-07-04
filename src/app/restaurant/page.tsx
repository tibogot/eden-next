import Image from "next/image";
import React from "react";

function restaurant() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-white px-4 py-10 md:px-10 md:py-20">
      {/* <Image
        src="/images/garden-2.png"
        alt="restaurant"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 h-full w-full object-cover"
      /> */}
      <div className="relative z-10 mb-12 flex h-full w-full flex-col items-start justify-end">
        <p className="mb-2 text-lg text-white drop-shadow-lg">
          Enjoy fine dining in a lush garden setting.
        </p>
        <h1 className="font-PPRegular text-5xl text-white drop-shadow-lg md:text-8xl">
          Restaurant
        </h1>
      </div>
    </div>
  );
}

export default restaurant;
