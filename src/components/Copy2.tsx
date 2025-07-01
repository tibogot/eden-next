"use client";

import React, { useRef, ReactElement, ReactNode } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface Copy2Props {
  children: ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  isHero?: boolean;
}

export default function Copy2({
  children,
  animateOnScroll = true,
  delay = 0,
  isHero = false,
}: Copy2Props): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const splitInstanceRef = useRef<SplitText | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Clean up any existing split instance
      if (splitInstanceRef.current) {
        splitInstanceRef.current.revert();
        splitInstanceRef.current = null;
      }

      // Create new split instance with modern API
      try {
        splitInstanceRef.current = new SplitText(containerRef.current, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
        });

        const lines = splitInstanceRef.current.lines;

        if (!lines || lines.length === 0) return;

        // Set initial state - same as original
        gsap.set(lines, { y: "100%" });

        // Add gsap-ready class to prevent FOUC
        containerRef.current.classList.add("gsap-ready");

        const animationProps = {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: delay,
        };

        if (animateOnScroll) {
          // Check if element is already in viewport
          const rect = containerRef.current.getBoundingClientRect();
          const isInInitialViewport = rect.top < window.innerHeight * 0.75;

          if (isHero || isInInitialViewport) {
            // For hero elements or elements already in view
            gsap.to(lines, {
              ...animationProps,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 95%",
                once: true,
                refreshPriority: 1,
              },
            });
          } else {
            // Standard trigger for elements below the fold
            gsap.to(lines, {
              ...animationProps,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                once: true,
              },
            });
          }
        } else {
          gsap.to(lines, animationProps);
        }
      } catch (error) {
        console.warn("SplitText error:", error);
      }

      // Cleanup function
      return () => {
        if (splitInstanceRef.current) {
          splitInstanceRef.current.revert();
          splitInstanceRef.current = null;
        }
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, isHero],
    },
  );

  // Handle single child case
  if (React.Children.count(children) === 1) {
    const child = React.Children.only(children) as ReactElement;
    return React.cloneElement(child, {
      // @ts-ignore
      ...child.props,
      ref: containerRef,
    } as any);
  }

  // Handle multiple children case
  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
