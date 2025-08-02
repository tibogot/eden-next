"use client";

import React, {
  useRef,
  ReactElement,
  ReactNode,
  useState,
  useEffect,
} from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

interface CopyProps {
  children: ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  isHero?: boolean;
}

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
  isHero = false,
}: CopyProps): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLElement[]>([]);
  const splitRef = useRef<SplitText[]>([]);
  const lines = useRef<HTMLElement[]>([]);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  // Check if document fonts are loaded
  useEffect(() => {
    // Modern approach using the Font Loading API
    if ("fonts" in document) {
      document.fonts.ready
        .then(() => {
          setFontsLoaded(true);
        })
        .catch((err) => {
          console.warn("Font loading API error:", err);
          // Fallback to timeout if the API fails
          setTimeout(() => setFontsLoaded(true), 1000);
        });
    } else {
      // Fallback for browsers that don't support the Font Loading API
      setTimeout(() => setFontsLoaded(true), 1000);
    }
  }, []);

  useGSAP(
    () => {
      // Don't run the animation setup until fonts are loaded
      if (!containerRef.current || !fontsLoaded) return;

      // Clear previous state
      splitRef.current = [];
      elementRef.current = [];
      lines.current = [];

      let elements: HTMLElement[] = [];
      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children) as HTMLElement[];
      } else {
        elements = [containerRef.current];
      }

      // Short timeout to ensure DOM is fully ready after fonts load
      setTimeout(() => {
        elements.forEach((element) => {
          elementRef.current.push(element);

          try {
            const split = SplitText.create(element, {
              type: "lines",
              mask: "lines",
              linesClass: "line++",
            });

            splitRef.current.push(split);

            const computedStyle = window.getComputedStyle(element);
            const textIndent = computedStyle.textIndent;

            if (textIndent && textIndent != "0px") {
              if (split.lines.length > 0) {
                //@ts-ignore
                split.lines[0].style.paddingLeft = textIndent;
              }
              element.style.textIndent = "0";
            }
            //@ts-ignore
            lines.current.push(...split.lines);
          } catch (error) {
            console.warn("SplitText error:", error);
          }
        });

        if (lines.current.length === 0) return;

        gsap.set(lines.current, { y: "100%" });

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

        if (animateOnScroll) {
          // Check if element is already in viewport
          //@ts-ignore
          const rect = containerRef.current.getBoundingClientRect();
          const isInInitialViewport = rect.top < window.innerHeight * 0.75;

          if (isHero || isInInitialViewport) {
            // For hero elements or elements already in view, use more lenient trigger
            gsap.to(lines.current, {
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
            gsap.to(lines.current, {
              ...animationProps,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                once: true,
              },
            });
          }
        } else {
          gsap.to(lines.current, animationProps);
        }
      }, 100); // Small delay after fonts loaded

      return () => {
        splitRef.current.forEach((split) => {
          if (split) {
            try {
              split.revert();
            } catch (error) {
              console.warn("SplitText revert error:", error);
            }
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [fontsLoaded, animateOnScroll, delay, isHero],
    }
  );

  if (React.Children.count(children) == 1) {
    const child = React.Children.only(children) as ReactElement;
    //@ts-ignore
    return React.cloneElement(child, { ref: containerRef });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
