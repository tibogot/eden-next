"use client";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import Copy from "@/components/Copy";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HorizontalScrollCards from "@/components/HorizontalScrollCards";
import Link from "next/link";
import { useRef } from "react";
import ReviewsCarousel from "@/components/ReviewsCarousel";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const servicesRef = useRef<HTMLElement>(null);
  const scaleImgRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Integrate Lenis with ScrollTrigger for better performance
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      }

      // About section sticky effect
      const aboutSection = aboutRef.current;
      if (aboutSection) {
        gsap.timeline({
          scrollTrigger: {
            trigger: aboutSection,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          },
        });
      }

      // Existing clip-path animations
      const images = gsap.utils.toArray<HTMLImageElement>(
        ".service-image:not(#scaleimg .service-image)",
      );

      const imageAnimations: gsap.core.Tween[] = [];

      images.forEach((image) => {
        gsap.set(image, {
          clipPath: "inset(0 100% 100% 0)",
        });

        const animation = gsap.to(image, {
          clipPath: "inset(0 0% 0% 0",
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: image,
            start: "top 90%",
            end: "top 10%",
            scrub: 1,
            // markers: true,
          },
        });

        imageAnimations.push(animation);
      });

      // Scale animation with clip path reveal
      const scaleSection = scaleImgRef.current;
      const scaleImg = scaleSection?.querySelector(".scale-image");

      let scaleTimeline: gsap.core.Timeline | null = null;
      let clipAnimation: gsap.core.Tween | null = null;

      if (scaleSection && scaleImg) {
        // Initial clip-path state
        gsap.set(scaleImg, {
          clipPath: "inset(0 100% 100% 0)",
        });

        // First timeline for clip-path reveal (before pinning)
        clipAnimation = gsap.to(scaleImg, {
          clipPath: "inset(0 0% 0% 0",
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: scaleImg,
            start: "top 80%",
            end: "top 10%",
            scrub: 1,
          },
        });

        // Second timeline for pinning and scaling
        scaleTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: scaleSection,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 1,
          },
        });

        // First animation: Scale the image
        scaleTimeline.to(scaleImg, {
          width: "110vw",
          height: "110vh",
          maxWidth: "none",
          duration: 1,
        });

        // Second animation: Reveal text
        scaleTimeline.to(
          ".imgscaletxt",
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
          },
          "-=0.5", // Overlapping animation for smoother transition
        );
      }

      // Cleanup function - this is automatically called by useGSAP
      return () => {
        // Kill all animations
        imageAnimations.forEach((anim) => anim.kill());
        if (clipAnimation) clipAnimation.kill();
        if (scaleTimeline) scaleTimeline.kill();

        // Kill all ScrollTriggers
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        // Remove Lenis integration
        if (lenis) {
          lenis.off("scroll", ScrollTrigger.update);
        }
      };
    },
    {
      // Add dependencies to ensure proper cleanup and re-initialization
      dependencies: [],
    },
  );
  return (
    <div className="wrapper bg-[#FAF3EB]">
      {/* Hero Section */}
      <section className="hero h-[100svh] w-full overflow-hidden">
        <div className="relative flex h-full items-center justify-center bg-[url('https://images.unsplash.com/photo-1630305106122-80b9ace010c7?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
          {/* <div className="absolute inset-0 z-0 bg-gradient-to-b from-black to-transparent opacity-25"></div> */}

          <div className="absolute bottom-0 left-1/2 w-[90vw] -translate-x-1/2 md:w-[75vw]">
            <img src="/logo.svg" alt="Logo" className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="flex flex-col px-4 pt-10 md:px-8 md:pt-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl">
            <span className="font-PPRegular">Experience Paradise </span>
            <br className="md:hidden" />
            <span className="font-PPRegular">in </span>
            <span className="font-PPItalic">every sip </span>
            <br />
            <span className="font-PPRegular">and bite</span>
          </h1>
          <Copy>
            <p className="font-NHD mt-4 max-w-2xl py-4 text-lg text-stone-500 md:py-8 md:text-xl">
              Welcome to Eden Park & Garden, your ultimate destination for
              entertainment and leisure in Abuja. Enjoy live music, delicious
              traditional food, and exciting activities in a serene environment.
            </p>
          </Copy>
        </div>
      </section>

      <HorizontalScrollCards />

      <div ref={aboutRef} className="h-screen w-full">
        <div className="relative h-full p-4 py-24 md:px-8">
          <Image
            src="/images/drone-terrain.webp"
            alt="Drone terrain background"
            fill
            className="object-cover object-center"
          />

          {/* Background gradient overlay - behind the text */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black to-transparent opacity-25"></div>
          {/* Content sits above overlay */}
          {/* <div className="relative z-10">
            <h6 className="font-NHD text-white">ABOUT</h6>

            <div className="mt-10 flex flex-col md:flex-row">
              <div className="left w-full md:w-1/2">
                <h1 className="font-PPItalic text-4xl leading-tight text-white md:text-6xl">
                  A New Standard of
                  <br />
                  Living at Eden
                </h1>
              </div>
              <div className="right w-full md:w-1/2 md:pl-20">
                <p className="font-NHD w-3/4 text-lg text-white md:text-xl">
                  Experience the best of Abuja's nightlife at Eden Park &
                  Garden. From live music to delicious food and refreshing
                  drinks, we offer a unique and unforgettable experience.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="relative">
        {/* Services Section with clip-path animation */}
        <section
          ref={servicesRef}
          className="space-y-20 bg-[#FAF3EB] px-4 py-10 md:space-y-50 md:px-8 md:py-20"
        >
          {/* Card 1 - Small, Left */}
          <div className="flex w-full flex-col md:flex-row md:justify-start">
            <div className="flex w-full flex-col md:w-1/2 md:flex-row md:overflow-hidden">
              <div className="relative h-64 w-full md:h-98">
                <img
                  src="https://picsum.photos/200/300?random=1"
                  alt="Cozy Bar"
                  className="service-image absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="mt-2 flex w-full flex-col items-start justify-start gap-4 p-4 md:mt-0 md:gap-8 md:pl-8">
                <h2 className="font-PPItalic text-4xl text-gray-800 md:text-6xl">
                  The Bar
                </h2>
                <p className="font-NHD text-lg text-stone-500">
                  Step into our vibrant garden bar, where great drinks meet even
                  better company. Whether you're looking for a refreshing
                  cocktail, a cold beer, or a fine selection of wines, our bar
                  has something for everyone. Enjoy your favorite drink in a
                  relaxed atmosphere surrounded by lush greenery.
                </p>
                <div className="flex justify-start">
                  <Link
                    href="/about"
                    className="font-NHD flex items-center gap-2 text-lg text-gray-800 transition-all"
                  >
                    See all
                    <ArrowRight className="-rotate-45" size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Large, Center */}
          <div className="flex w-full flex-col md:flex-row md:justify-center">
            <div className="flex w-full flex-col md:w-2/3 md:flex-row md:overflow-hidden">
              <div className="relative h-64 w-full md:h-150">
                <img
                  src="https://picsum.photos/200/300?random=2"
                  alt="Cocktail Lounge"
                  className="service-image absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="mt-2 flex w-full flex-col justify-start gap-4 p-4 md:mt-0 md:gap-8 md:pl-8">
                <h2 className="font-PPItalic text-4xl text-gray-800 md:text-6xl">
                  The Pools
                </h2>
                <p className="font-NHD text-lg text-stone-500">
                  Unwind and have fun with friends at our pool tables. Perfect
                  for both casual players and competitive challengers, our
                  well-maintained tables provide endless entertainment. Whether
                  you're a pro or just playing for fun, it's a great spot to
                  socialize and enjoy your time.
                </p>
                <div className="flex justify-start">
                  <Link
                    href="/about"
                    className="font-NHD flex items-center gap-2 text-lg text-gray-800 transition-all"
                  >
                    See all
                    <ArrowRight className="-rotate-45" size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Medium, Right */}
          <div className="flex w-full flex-col md:flex-row md:justify-start">
            <div className="flex w-full flex-col md:w-1/2 md:flex-row md:overflow-hidden">
              <div className="relative h-64 w-full md:h-98">
                <img
                  src="https://picsum.photos/200/300?random=3"
                  alt="Cozy Bar"
                  className="service-image absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="mt-2 flex w-full flex-col items-start justify-start gap-4 p-4 md:mt-0 md:gap-8 md:pl-8">
                <h2 className="font-PPItalic text-4xl text-gray-800 md:text-6xl">
                  The Field
                </h2>
                <p className="font-NHD text-lg text-stone-500">
                  For the sports lovers, our football field is the perfect spot
                  to show off your skills or cheer for your favorite team. With
                  ample space for matches and friendly games, it's a hub for
                  football enthusiasts looking to stay active or have a fun time
                  with friends.
                </p>
                <div className="flex justify-start">
                  <Link
                    href="/about"
                    className="font-NHD flex items-center gap-2 text-lg text-gray-800 transition-all"
                  >
                    See all
                    <ArrowRight className="-rotate-45" size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - Large, Center */}
          <div className="flex w-full flex-col md:flex-row md:justify-center">
            <div className="w-full flex-col md:w-2/3 md:flex-row md:overflow-hidden">
              <div className="relative h-64 w-full md:h-150">
                <img
                  src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Wine Collection"
                  className="service-image absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="mt-2 flex w-full flex-col justify-start gap-4 p-4 md:mt-0 md:w-1/2 md:gap-8 md:py-8">
                <h2 className="font-PPItalic text-4xl text-gray-800 md:text-6xl">
                  The Shows
                </h2>
                <p className="font-NHD text-lg text-stone-500">
                  Hillbrook Estate & Farm is a luxury coastal property and
                  working farm situated just north of Whangamata on New
                  Zealand's Coromandel coast. Available for exclusive rental,
                  our estate is the perfect setting for your next luxury escape.
                </p>
                <div className="flex justify-start">
                  <Link
                    href="/about"
                    className="font-NHD flex items-center gap-2 text-lg text-gray-800 transition-all"
                  >
                    See all
                    <ArrowRight className="-rotate-45" size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        ref={scaleImgRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-[#FAF3EB]">
          <img
            src="/images/night-life.avif"
            alt="Scaling Image"
            className="scale-image h-[50vh] w-[50vw] object-cover"
          />
        </div>
        <div className="imgscaletxt absolute inset-0 flex flex-col items-start justify-end p-4 opacity-0 blur-2xl md:p-8">
          <h1 className="font-PPItalic pt-10 text-6xl text-white md:pt-20 md:text-9xl">
            The Night Life
          </h1>
        </div>
      </div>
      <section className="h-screen w-full bg-red-300"></section>
      <ReviewsCarousel />
    </div>
  );
}
