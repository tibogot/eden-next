"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";

const experiences = [
  { image: "https://picsum.photos/id/1011/800/500", alt: "Live Music Nights" },
  { image: "https://picsum.photos/id/1015/800/500", alt: "Family Events" },
  { image: "https://picsum.photos/id/1016/800/500", alt: "Gourmet Dining" },
  { image: "https://picsum.photos/id/1021/800/500", alt: "Outdoor Fun" },
  { image: "https://picsum.photos/id/1025/800/500", alt: "Nightlife" },
  { image: "https://picsum.photos/id/1035/800/500", alt: "Relaxation" },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function ExperiencesCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex =
    ((page % experiences.length) + experiences.length) % experiences.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="flex min-h-[400px] w-full flex-col bg-[#FAF3EB] px-4 py-10 md:flex-row md:px-8 md:py-20">
      {/* Left: Fixed Title, Description, Arrows */}
      <div className="flex w-full flex-col justify-between text-black md:w-1/3">
        <div>
          <h2 className="font-PPItalic text-4xl">Experience</h2>
          <p className="mb-8 min-h-[80px] text-lg text-gray-700">
            Eden Park & Garden is a vibrant oasis in Abuja, offering a unique
            blend of entertainment and relaxation.
          </p>
        </div>
        <div className="mt-auto flex justify-end gap-4">
          <button
            onClick={() => paginate(-1)}
            className="cursor-pointer p-2 text-black transition-colors hover:text-amber-600"
            aria-label="Previous"
          >
            <ArrowCircleLeft size={40} weight="fill" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="cursor-pointer p-2 text-black transition-colors hover:text-amber-600"
            aria-label="Next"
          >
            <ArrowCircleRight size={40} weight="fill" />
          </button>
        </div>
      </div>

      {/* Right: Image Carousel */}
      <div className="relative ml-10 flex h-[600px] w-full items-center justify-center overflow-hidden md:w-2/3">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={experiences[imageIndex].image}
            alt={experiences[imageIndex].alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute h-full w-[520px] cursor-grab object-cover"
            whileTap={{ cursor: "grabbing" }}
            draggable={false}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
