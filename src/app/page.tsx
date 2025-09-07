"use client";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import Copy from "@/components/Copy5";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HorizontalScrollCards from "@/components/HorizontalScrollCards2";
import Link from "next/link";
import { useRef } from "react";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ManyServices from "@/components/ManyServices2";
import BlogPreview from "@/components/BlogPreview";
import client from "@/sanityClient";
import { useEffect, useState } from "react";
import BookingForm from "@/components/BookingForm";
import Testimonial from "@/components/Testimonial";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const servicesRef = useRef<HTMLElement>(null);
  const scaleImgRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [aboutImageLoaded, setAboutImageLoaded] = useState(false);
  const [stickyImageLoaded, setStickyImageLoaded] = useState(false);

  // Parallax effect for hero image (isolated from GSAP/useGSAP)
  useEffect(() => {
    const handleScroll = () => {
      if (!heroParallaxRef.current) return;
      const scrollY = window.scrollY;
      // Adjust 0.25 for more/less parallax
      heroParallaxRef.current.style.transform = `translateY(${scrollY * 0.25}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await client.fetch(
        `*[_type == "post"]|order(_createdAt desc)[0...3]{
          _id,
          title,
          slug,
          mainImage {
            asset->{url}
          },
          publishedAt,
          body
        }`,
      );
      setBlogPosts(posts);
    }
    fetchPosts();
  }, []);

  useGSAP(
    () => {
      // Store animations for proper cleanup
      const animations: gsap.core.Tween[] = [];
      const triggers: ScrollTrigger[] = [];

      // About section sticky effect
      // const aboutSection = aboutRef.current;
      // if (aboutSection) {
      //   const aboutTimeline = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: aboutSection,
      //       start: "top top",
      //       end: "bottom top",
      //       pin: true,
      //       pinSpacing: false,
      //     },
      //   });
      //   triggers.push(aboutTimeline.scrollTrigger as ScrollTrigger);
      // }

      // Existing clip-path animations
      const images = gsap.utils.toArray<HTMLImageElement>(
        ".service-image:not(#scaleimg .service-image)",
      );

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
          },
        });

        animations.push(animation);
        if (animation.scrollTrigger) {
          triggers.push(animation.scrollTrigger as ScrollTrigger);
        }
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

        animations.push(clipAnimation);
        if (clipAnimation.scrollTrigger) {
          triggers.push(clipAnimation.scrollTrigger as ScrollTrigger);
        }

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

        if (scaleTimeline.scrollTrigger) {
          triggers.push(scaleTimeline.scrollTrigger as ScrollTrigger);
        }

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

      // Cleanup function - only kill animations created by this component
      return () => {
        // Kill only animations created by this component
        animations.forEach((anim) => anim.kill());
        triggers.forEach((trigger) => trigger.kill());

        if (scaleTimeline) scaleTimeline.kill();
      };
    },
    {
      // Add dependencies to ensure proper cleanup and re-initialization
      dependencies: [],
    },
  );
  return (
    <div className="wrapper bg-primary">
      {/* Hero Section */}
      <section className="relative h-svh w-full overflow-hidden">
        {/* Parallax only on the background image */}
        <div className="relative h-full w-full">
          <div
            ref={heroParallaxRef}
            className="absolute inset-0 will-change-transform"
            style={{ zIndex: 1 }}
          >
            <Image
              src="/images/hero-bg.webp"
              alt="Hero background"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
              onLoad={() => setHeroImageLoaded(true)}
            />
            <div
              className={`absolute inset-0 z-10 bg-gradient-to-b from-black to-transparent transition-opacity duration-300 ${
                heroImageLoaded ? "opacity-25" : "opacity-0"
              }`}
            />
          </div>
          <div className="absolute bottom-0 left-1/2 z-20 w-[90vw] -translate-x-1/2 md:w-[75vw]">
            <img src="/logo.svg" alt="Logo" className="h-auto w-full" />
          </div>
        </div>
      </section>
      {/* Intro Section */}
      <section className="flex flex-col px-4 pt-10 md:px-8 md:pt-20">
        <div className="flex flex-col items-center text-center text-balance">
          <Copy>
            <h1 className="text-4xl text-gray-800 md:text-6xl">
              <span className="font-PPRegular">Experience Paradise </span>
              {/* <br className="md:hidden" /> */}
              <span className="font-PPRegular">in </span>
              <span className="font-PPItalic">every sip </span>
              <br />
              <span className="font-PPRegular">and bite</span>
            </h1>
          </Copy>
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
            src="/images/chris-abney.webp"
            alt="Drone terrain background"
            fill
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
            onLoad={() => setAboutImageLoaded(true)}
          />

          {/* Background gradient overlay - behind the text */}
          <div
            className={`absolute inset-0 z-10 bg-gradient-to-b from-black to-transparent transition-opacity duration-300 ${
              aboutImageLoaded ? "opacity-35" : "opacity-0"
            }`}
          />
          {/* Content sits above overlay */}
          <div className="relative z-10 h-full w-full">
            <div className="flex h-full w-full items-center justify-center">
              <p className="font-PPItalic max-w-7xl pt-10 text-center text-4xl leading-tight text-white md:pt-20 md:text-9xl">
                A new standard of living
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary relative px-4 py-10 md:px-8 md:py-20">
        <div className="wrap w-full text-center">
          <Copy>
            <h2 className="font-PPRegular mt-10 text-gray-800">Services</h2>
          </Copy>
          <Copy delay={0.2}>
            <p className="font-NHD mx-auto mt-4 text-lg text-stone-500 md:w-1/3">
              Step into our vibrant garden bar, where great drinks meet even
              better company. Whether you're looking for a refreshing cocktail,
              a cold beer.
            </p>
          </Copy>
        </div>
        {/* Services Section with clip-path animation */}
        <section ref={servicesRef} className="mt-50 space-y-10 md:space-y-50">
          {/* Card 1 - Small, Left */}
          <div className="flex w-full flex-col md:flex-row md:justify-start">
            <div className="flex w-full flex-col md:w-1/2 md:flex-row md:overflow-hidden">
              <div className="relative h-64 w-full md:h-98">
                <img
                  src="./images/the-bar.webp"
                  alt="Cozy Bar"
                  className="service-image absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="mt-2 flex w-full flex-col items-start justify-start gap-4 p-4 md:mt-0 md:gap-8 md:pl-8">
                <h3 className="font-PPItalic text-gray-800">The Bar</h3>
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
                  src="./images/the-pools.webp"
                  alt="pools"
                  className="service-image absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="mt-2 flex w-full flex-col justify-start gap-4 p-4 md:mt-0 md:gap-8 md:pl-8">
                <h3 className="font-PPItalic text-gray-800">The Pools</h3>
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
                  src="./images/the-field.webp"
                  alt="football field"
                  className="service-image absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="mt-2 flex w-full flex-col items-start justify-start gap-4 p-4 md:mt-0 md:gap-8 md:pl-8">
                <h3 className="font-PPItalic text-gray-800">The Field</h3>
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
                <h3 className="font-PPItalic text-gray-800">The Shows</h3>
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
        <div className="bg-primary absolute inset-0 flex items-center justify-center">
          {/* Wrap image and overlay in one container */}
          <div className="scale-image relative h-[50vh] w-[50vw]">
            <img
              src="/images/chris-abney.webp"
              alt="Scaling Image"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-35"></div>
          </div>
        </div>

        <div className="imgscaletxt absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center opacity-0 blur-2xl md:p-8">
          <h1 className="font-PPItalic max-w-7xl pt-10 text-4xl text-white md:pt-20 md:text-9xl">
            Eden Garden
          </h1>
        </div>
      </div>
      <ManyServices />
      <Testimonial />
      {/* <ReviewsCarousel /> */}
      {/* Blog Previews Section */}
      <section className="px-4 py-10 md:px-8 md:py-20">
        <Copy>
          <div className="flex w-full flex-col items-center">
            <h2 className="font-PPRegular text-gray-800">Events</h2>
          </div>
        </Copy>
        <ul className="mt-20 flex list-none flex-col gap-8 p-0 md:flex-row md:justify-center md:gap-6">
          {blogPosts.map((post) => (
            <BlogPreview key={post._id} post={post} />
          ))}
        </ul>
        <div className="mt-6">
          <Link href="/blog" className="font-medium text-lime-900 underline">
            See all blog posts
          </Link>
        </div>
      </section>
      {/* Last Image Section */}
      <div className="h-screen w-full">
        <div className="relative h-full p-4 py-24 md:px-8">
          <Image
            src="/images/sticky-img.webp"
            alt="Drone terrain background"
            fill
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />

          {/* Background gradient overlay - behind the text */}
          {/* <div className="absolute inset-0 z-10 bg-gradient-to-b from-black to-transparent opacity-55"></div> */}
          {/* Content sits above overlay */}
          {/* <div className="relative z-10 h-full w-full">
            <div className="flex h-full w-full items-center justify-center">
              <h4 className="font-PPRegularUL pt-10 text-center text-4xl leading-tight text-white md:w-1/2 md:pt-20 md:text-6xl">
                Relax or explore your <br />
                very own personal playground
              </h4>
            </div>
          </div> */}
        </div>
      </div>
      <BookingForm />
    </div>
  );
}
