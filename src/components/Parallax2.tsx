"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const images1 = [
  "https://picsum.photos/id/1015/300/400",
  "https://picsum.photos/id/1016/250/350",
  "https://picsum.photos/id/1018/200/300",
  "https://picsum.photos/id/1020/220/320",
];
const images2 = [
  "https://picsum.photos/id/1024/300/400",
  "https://picsum.photos/id/1025/250/350",
  "https://picsum.photos/id/1027/200/300",
  "https://picsum.photos/id/1035/220/320",
];

const imgStyles = [
  { top: "-10%", left: "5%", speed: 1.2 },
  { top: "80%", left: "25%", speed: 1.7 },
  { top: "40%", left: "75%", speed: 2.1 },
  { top: "120%", left: "55%", speed: 1.5 },
];

function ParallaxSection({
  images,
  label,
}: {
  images: string[];
  label: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-visible bg-amber-300 px-4 py-10 md:px-8 md:py-30"
    >
      {images.map((src, i) => {
        // Parallax: as section scrolls into view, move image upward by up to 600px * speed
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [0, -600 * imgStyles[i].speed],
        );
        return (
          <motion.img
            key={src}
            src={src}
            alt="parallax"
            style={{
              top: imgStyles[i].top,
              left: imgStyles[i].left,
              width: "360px",
              height: "480px",
              objectFit: "cover",
              zIndex: 2,
              position: "absolute",
              y,
            }}
            className="shadow-lg"
            draggable={false}
          />
        );
      })}
      <h2 className="font-PPItalic relative z-10 text-4xl text-black md:text-6xl">
        {label}
      </h2>
    </section>
  );
}

export default function Parallax() {
  return (
    <div className="overflow-visible">
      <ParallaxSection images={images1} label="Lunch" />
      <ParallaxSection images={images2} label="Lunch" />
    </div>
  );
}
