"use client";

import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";

import React, { useRef, useState } from "react";

export default function ExperiencesCarousel() {
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideWidth = 500 + 16; // width + gap

  // Helper to jump to real slide after clone
  const jumpToReal = (idx: number) => {
    if (!containerRef.current) return;
    if (idx === 0) {
      setCurrentIndex(total);
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-${total * slideWidth}px)`;
      // Force reflow to apply the style immediately
      void containerRef.current.offsetWidth;
      containerRef.current.style.transition =
        "transform 0.5s cubic-bezier(0.76,0,0.24,1)";
    } else if (idx === slides.length - 1) {
      setCurrentIndex(1);
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-${slideWidth}px)`;
      void containerRef.current.offsetWidth;
      containerRef.current.style.transition =
        "transform 0.5s cubic-bezier(0.76,0,0.24,1)";
    }
  };

  const goTo = (idx: number) => {
    if (!containerRef.current) return;
    setIsTransitioning(true);
    setCurrentIndex(idx);
    containerRef.current.style.transition =
      "transform 0.5s cubic-bezier(0.76,0,0.24,1)";
    containerRef.current.style.transform = `translateX(-${idx * slideWidth}px)`;
  };

  const goToNext = () => {
    if (isTransitioning) return;
    goTo(currentIndex + 1);
  };
  const goToPrev = () => {
    if (isTransitioning) return;
    goTo(currentIndex - 1);
  };

  // After transition, check if we need to jump to real slide
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    jumpToReal(currentIndex);
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
            disabled={isTransitioning}
          >
            <ArrowCircleLeft size={40} weight="fill" />
          </button>
          <button
            className="cursor-pointer p-2 text-black transition-colors hover:text-lime-900"
            aria-label="Next"
            onClick={goToNext}
            disabled={isTransitioning}
          >
            <ArrowCircleRight size={40} weight="fill" />
          </button>
        </div>
      </div>

      {/* Right: Carousel Container */}
      <div className="relative ml-10 overflow-hidden bg-amber-400 md:w-2/3">
        <div
          ref={containerRef}
          className="flex h-full gap-4"
          style={{
            width: `${slides.length * slideWidth}px`,
            transform: `translateX(-${currentIndex * slideWidth}px)`,
            transition: isTransitioning
              ? "transform 0.5s cubic-bezier(0.76,0,0.24,1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((color, i) => (
            <div
              key={i}
              className={`shrink-0 ${color} flex h-[600px] w-[500px] items-center justify-center text-4xl font-bold text-white`}
            >
              {i === 0 ? total - 1 : i === slides.length - 1 ? 0 : i - 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
