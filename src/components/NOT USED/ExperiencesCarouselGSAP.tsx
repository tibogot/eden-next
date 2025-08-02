"use client";

import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];
const total = colors.length;
// Duplicate slides for seamless looping
const slides = [...colors, ...colors];
const slideWidth = 500 + 16; // width + gap

export default function ExperiencesCarouselGSAP() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);
  const indexRef = useRef(0);

  // Move to a given slide index (with animation)
  const goTo = (idx: number) => {
    if (!containerRef.current) return;
    if (animRef.current) animRef.current.kill();
    indexRef.current = idx;
    animRef.current = gsap.to(containerRef.current, {
      x: -idx * slideWidth,
      duration: 0.5,
      ease: "power1.inOut",
      onComplete: () => {
        // If at the end of the first set, jump instantly to the start set
        if (idx >= total) {
          gsap.set(containerRef.current, { x: -(idx - total) * slideWidth });
          indexRef.current = idx - total;
        } else if (idx < 0) {
          gsap.set(containerRef.current, { x: -(idx + total) * slideWidth });
          indexRef.current = idx + total;
        }
      },
    });
  };

  // Arrow navigation
  const goToNext = () => goTo(indexRef.current + 1);
  const goToPrev = () => goTo(indexRef.current - 1);

  // On mount, set initial position and setup Draggable
  useEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, { x: 0 });
      indexRef.current = 0;
      // Setup Draggable
      const draggable = Draggable.create(containerRef.current, {
        type: "x",
        inertia: true,
        edgeResistance: 0.65,
        snap: (endValue) => {
          // Snap to nearest slide
          const snapped = Math.round(-endValue / slideWidth);
          return -snapped * slideWidth;
        },
        onDrag: function () {
          // Seamless looping while dragging
          if (this.x <= -total * slideWidth) {
            gsap.set(containerRef.current, { x: this.x + total * slideWidth });
            this.update();
          } else if (this.x > 0) {
            gsap.set(containerRef.current, { x: this.x - total * slideWidth });
            this.update();
          }
        },
        onThrowUpdate: function () {
          // Seamless looping while throwing
          if (this.x <= -total * slideWidth) {
            gsap.set(containerRef.current, { x: this.x + total * slideWidth });
            this.update();
          } else if (this.x > 0) {
            gsap.set(containerRef.current, { x: this.x - total * slideWidth });
            this.update();
          }
        },
        onDragEnd: function () {
          // Snap to nearest slide index
          const snapped = Math.round(-this.x / slideWidth);
          goTo(snapped);
        },
        onThrowComplete: function () {
          // Snap to nearest slide index after inertia
          const snapped = Math.round(-this.x / slideWidth);
          goTo(snapped);
        },
      });
      return () => {
        if (draggable && draggable[0]) draggable[0].kill();
      };
    }
    // Cleanup
    return () => {
      if (animRef.current) animRef.current.kill();
    };
  }, []);

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
          >
            <ArrowCircleLeft size={40} weight="fill" />
          </button>
          <button
            className="cursor-pointer p-2 text-black transition-colors hover:text-lime-900"
            aria-label="Next"
            onClick={goToNext}
          >
            <ArrowCircleRight size={40} weight="fill" />
          </button>
        </div>
      </div>

      {/* Right: Carousel Container */}
      <div className="relative ml-10 overflow-hidden bg-amber-400 md:w-2/3">
        <div
          ref={containerRef}
          className="flex h-full gap-4 will-change-transform"
          style={{ width: `${slides.length * slideWidth}px` }}
        >
          {slides.map((color, i) => (
            <div
              key={i}
              className={`shrink-0 ${color} flex h-[600px] w-[500px] items-center justify-center text-4xl font-bold text-white`}
            >
              {i % total}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
