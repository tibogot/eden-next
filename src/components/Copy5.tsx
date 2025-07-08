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

      // Wait for fonts to load before splitting text
      const initSplitText = () => {
        document.fonts.ready
          .then(() => {
            if (!containerRef.current) return;

            // Clean up any existing split instance
            if (splitInstanceRef.current) {
              splitInstanceRef.current.revert();
              splitInstanceRef.current = null;
            }

            // Create new split instance with onSplit callback
            splitInstanceRef.current = SplitText.create(containerRef.current, {
              type: "lines",
              mask: "lines",
              linesClass: "line++",
              autoSplit: true, // Enable responsive re-splitting
              onSplit: (self) => {
                // This runs every time the text splits/re-splits
                const lines = self.lines;

                if (!lines || lines.length === 0) return;

                // Set initial state
                gsap.set(lines, { y: "100%" });

                // Add gsap-ready class to prevent FOUC
                if (containerRef.current) {
                  containerRef.current.classList.add("gsap-ready");
                }

                const animationProps = {
                  y: "0%",
                  duration: 1,
                  stagger: 0.1,
                  ease: "power4.out",
                  delay: delay,
                };

                let animation;

                if (animateOnScroll) {
                  // Check if element is already in viewport
                  const rect = containerRef.current?.getBoundingClientRect();
                  const isInInitialViewport = rect
                    ? rect.top < window.innerHeight * 0.75
                    : false;

                  if (isHero || isInInitialViewport) {
                    // For hero elements or elements already in view
                    animation = gsap.to(lines, {
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
                    animation = gsap.to(lines, {
                      ...animationProps,
                      scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        once: true,
                      },
                    });
                  }
                } else {
                  animation = gsap.to(lines, animationProps);
                }

                // Return the animation so SplitText can manage cleanup/re-splitting
                return animation;
              },
            });
          })
          .catch((error) => {
            console.warn("Font loading error:", error);
            // Fallback if fonts.ready fails
            if (containerRef.current && !splitInstanceRef.current) {
              splitInstanceRef.current = SplitText.create(
                containerRef.current,
                {
                  type: "lines",
                  mask: "lines",
                  linesClass: "line++",
                  autoSplit: true,
                  onSplit: (self) => {
                    const lines = self.lines;
                    if (!lines || lines.length === 0) return;

                    gsap.set(lines, { y: "100%" });
                    containerRef.current?.classList.add("gsap-ready");

                    const animationProps = {
                      y: "0%",
                      duration: 1,
                      stagger: 0.1,
                      ease: "power4.out",
                      delay: delay,
                    };

                    if (animateOnScroll) {
                      const rect =
                        containerRef.current?.getBoundingClientRect();
                      const isInInitialViewport = rect
                        ? rect.top < window.innerHeight * 0.75
                        : false;

                      if (isHero || isInInitialViewport) {
                        return gsap.to(lines, {
                          ...animationProps,
                          scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 95%",
                            once: true,
                            refreshPriority: 1,
                          },
                        });
                      } else {
                        return gsap.to(lines, {
                          ...animationProps,
                          scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 75%",
                            once: true,
                          },
                        });
                      }
                    } else {
                      return gsap.to(lines, animationProps);
                    }
                  },
                },
              );
            }
          });
      };

      initSplitText();

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
