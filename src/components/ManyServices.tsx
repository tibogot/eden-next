import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    name: "Weddings",
    href: "/weddings",
    image: "/images/garden-1.png",
  },
  {
    name: "Live Match",
    href: "/live-match",
    image: "/images/drone-terrain.webp",
  },
  {
    name: "Church",
    href: "/church",
    image: "/images/garden-2.png",
  },
  {
    name: "Cannoli",
    href: "/cannoli",
    image: "/images/drone-terrain.webp",
  },
];

export default function ManyServices() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  return (
    <section className="w-full bg-[#FAF3EB] px-4 py-10 md:px-8 md:py-30">
      {/* Title */}
      <h2 className="font-PPItalic mb-2 text-center text-5xl md:text-8xl">
        Many Services
      </h2>
      {/* Description */}
      <p className="font-NHD mx-auto mb-10 text-center text-lg text-stone-600 md:w-1/3">
        Eden Park & Garden is a vibrant oasis in Abuja offering a unique blend
        of entertainment and relaxation. From live music and dance shows to
        thrilling football matches, there's.
      </p>
      {/* Service List */}
      <div className="mt-28 w-full cursor-pointer select-none">
        {services.map((service, idx) => (
          <div
            key={service.name}
            className="group relative cursor-pointer border-b border-stone-300 last:border-b-0"
            style={{ minHeight: "110px" }}
            // onMouseEnter/onMouseLeave/onMouseMove can be left for future hover image effect
          >
            <Link href={service.href} className="block h-full w-full">
              <span
                className={`font-PPItalic inline-block px-2 py-8 text-4xl text-gray-800 transition-colors duration-200 group-hover:text-lime-900 md:text-6xl ${idx === 1 ? "italic" : ""}`}
              >
                {service.name}
              </span>
            </Link>
            {/*
            {hoveredIdx === idx && (
              <span
                className="pointer-events-none absolute z-20"
                style={{
                  left: mousePos.x,
                  top: mousePos.y,
                  transform: "translate(-50%, -60%) rotate(-6deg)",
                  transition: "opacity 0.2s",
                }}
              >
                <Image
                  src={service.image}
                  alt={service.name + " preview"}
                  width={120}
                  height={80}
                  className="rounded-md shadow-lg select-none"
                  style={{ objectFit: "cover" }}
                />
              </span>
            )}
            */}
          </div>
        ))}
      </div>
    </section>
  );
}
