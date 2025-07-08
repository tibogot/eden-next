"use client";

import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";

export default function ExperiencesCarouselFM() {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  const total = colors.length;
  // Add clones for seamless looping
  const slides = [colors[total - 1], ...colors, colors[0]];
  const [currentIndex, setCurrentIndex] = useState(1); // Start at first real slide
  const [isAnimating, setIsAnimating] = useState(false);
  const slideWidth = 500 + 16; // width + gap
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate the container
  const [x, setX] = useState(-slideWidth);

  // Arrow navigation
  const goTo = (idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(idx);
    setX(-idx * slideWidth);
  };
  const goToNext = () => goTo(currentIndex + 1);
  const goToPrev = () => goTo(currentIndex - 1);

  // After animation, jump to real slide if at a clone
  const handleAnimationComplete = () => {
    if (!containerRef.current) return;
    if (currentIndex === 0) {
      setCurrentIndex(total);
      setX(-total * slideWidth);
      // Instantly jump to real last slide (no animation)
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(${-total * slideWidth}px)`;
      // Force reflow
      void containerRef.current.offsetWidth;
      containerRef.current.style.transition = "";
    } else if (currentIndex === slides.length - 1) {
      setCurrentIndex(1);
      setX(-slideWidth);
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(${-slideWidth}px)`;
      void containerRef.current.offsetWidth;
      containerRef.current.style.transition = "";
    }
    setIsAnimating(false);
  };

  return (
    <section className="flex min-h-[400px] w-full flex-col bg-[#FAF3EB] px-4 py-10 md:flex-row md:px-8 md:py-20">
      {/* Left: Title, Paragraph, Arrows */}
      <div className="flex w-full flex-col justify-between text-black md:w-1/3">
        <div>
          <h2 className="font-PPItalic text-4xl">Experience</h2>
          <p className="mb-8 text-lg text-gray-700">
            Eden Park & Garden is a vibrant oasis in Abuja, offering a unique
            blend of entertainment and relaxation.
          </p>
        </div>
        <div className="mt-auto flex justify-end gap-4">
          <button
            className="cursor-pointer p-2 text-black transition-colors hover:text-lime-900"
            aria-label="Previous"
            onClick={goToPrev}
            disabled={isAnimating}
          >
            <ArrowCircleLeft size={40} weight="fill" />
          </button>
          <button
            className="cursor-pointer p-2 text-black transition-colors hover:text-lime-900"
            aria-label="Next"
            onClick={goToNext}
            disabled={isAnimating}
          >
            <ArrowCircleRight size={40} weight="fill" />
          </button>
        </div>
      </div>

      {/* Right: Carousel Container */}
      <div className="relative ml-10 overflow-hidden bg-amber-400 md:w-2/3">
        <motion.div
          ref={containerRef}
          className="flex h-full gap-4"
          style={{ width: `${slides.length * slideWidth}px` }}
          animate={{ x }}
          transition={{
            x: { type: "tween", duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
          onAnimationComplete={handleAnimationComplete}
        >
          {slides.map((color, i) => (
            <div
              key={i}
              className={`shrink-0 ${color} flex h-[600px] w-[500px] items-center justify-center text-4xl font-bold text-white`}
            >
              {i === 0 ? total - 1 : i === slides.length - 1 ? 0 : i - 1}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
