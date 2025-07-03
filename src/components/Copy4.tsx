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
}

export default function Copy2({
  children,
  animateOnScroll = true,
  delay = 0,
}: Copy2Props): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    document.fonts.ready.then(() => {
      if (!ref.current) return;

      const split = new SplitText(ref.current, { type: "lines" });
      const lines = split.lines;

      gsap.set(lines, { y: "100%" });

      const animation = gsap.to(lines, {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay,
      });

      if (animateOnScroll) {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 75%",
          animation,
          once: true,
        });
      }

      return () => split.revert();
    });
  }, [animateOnScroll, delay]);

  if (React.Children.count(children) === 1) {
    const child = React.Children.only(children) as ReactElement;
    //@ts-ignore
    return React.cloneElement(child, { ref });
  }

  return <div ref={ref}>{children}</div>;
}
