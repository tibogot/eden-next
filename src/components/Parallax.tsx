"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://picsum.photos/id/1015/300/400",
  "https://picsum.photos/id/1016/250/350",
  "https://picsum.photos/id/1018/200/300",
  "https://picsum.photos/id/1020/220/320",
  "https://picsum.photos/id/1024/300/400",
  "https://picsum.photos/id/1025/250/350",
  "https://picsum.photos/id/1027/200/300",
  "https://picsum.photos/id/1035/220/320",
];

// Absolute positions for cards in first and second sections
const positionsFirstHalf = [
  { top: "10%", left: "0%" },
  { top: "0%", right: "10%" },
  { bottom: "5%", left: "15%" },
  { bottom: "0%", right: "5%" },
];

const positionsSecondHalf = [
  { top: "5%", left: "10%" },
  { top: "25%", right: "15%" },
  { bottom: "20%", left: "25%" },
  { bottom: "0%", right: "0%" },
];

// Example food/cocktail names for each card
const cardTitles = [
  "Negroni",
  "Espresso Martini",
  "Aperol Spritz",
  "Margarita",
  "Avocado Toast",
  "Truffle Fries",
  "Caprese Salad",
  "Tuna Tartare",
];

function ParallaxCard({
  src,
  style,
  speed,
  title,
}: {
  src: string;
  style: React.CSSProperties;
  speed: number;
  title: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !imageRef.current) return;

    // Outer card parallax (variable speed)
    gsap.to(cardRef.current, {
      y: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Inner image parallax (fixed speed for all cards)
    gsap.to(imageRef.current, {
      y: 60,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [speed]);

  return (
    <div
      ref={cardRef}
      className="absolute flex h-60 w-44 flex-col items-start overflow-visible will-change-transform md:h-100 md:w-80"
      style={style}
    >
      <div className="relative h-full w-full overflow-hidden bg-white">
        <img
          ref={imageRef}
          src={src}
          alt="Card"
          className="h-full w-full scale-150 object-cover will-change-transform"
          draggable={false}
        />
      </div>
      <span className="font-PPRegular mt-2 w-full text-left text-xl text-black select-none">
        {title}
      </span>
    </div>
  );
}

export default function ParallaxLayout() {
  return (
    <div className="relative h-[150vh] w-full bg-[#FAF3EB] px-4 md:h-[200vh] md:px-8">
      {/* First Section - Lunch */}
      <div className="relative flex h-[75vh] w-full items-center justify-center md:h-[100vh]">
        <h2 className="font-PPItalic z-10 text-center text-4xl text-black md:text-6xl">
          Lunch
        </h2>
        {positionsFirstHalf.map((pos, i) => (
          <ParallaxCard
            key={i}
            src={images[i]}
            style={{ ...pos, zIndex: 5 }}
            speed={0.5 + i * 0.7}
            title={cardTitles[i]}
          />
        ))}
      </div>

      {/* Second Section - Dinner */}
      <div className="relative flex h-[75vh] w-full items-center justify-center md:h-[100vh]">
        <h2 className="font-PPItalic z-10 text-center text-4xl text-black md:text-6xl">
          Dinner
        </h2>
        {positionsSecondHalf.map((pos, i) => (
          <ParallaxCard
            key={i}
            src={images[i + 4]}
            style={{ ...pos, zIndex: 5 }}
            speed={0.7 + i * 1.1}
            title={cardTitles[i + 4]}
          />
        ))}
      </div>
    </div>
  );
}
