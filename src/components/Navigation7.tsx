"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const menuLinks = [
  { path: "/", label: "Home" },
  // { path: "/about", label: "About" },
  { path: "/restaurant", label: "Restaurant" },
  { path: "/experiences", label: "Experiences" },
  // { path: "/services", label: "Services" },
  { path: "/blog", label: "Events" },
  { path: "/contact", label: "Contact" },
];

const Menu = () => {
  const container = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const showreelRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroVariant, setIsHeroVariant] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  const tl = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Fix viewport height on mobile browsers
  useEffect(() => {
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateVH();
    window.addEventListener("resize", updateVH);
    return () => window.removeEventListener("resize", updateVH);
  }, []);

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    const checkHeroSection = () => {
      const heroSection = document.querySelector(".hero");
      setIsHeroVariant(!!heroSection);
    };

    checkHeroSection();
    const timeoutId = setTimeout(checkHeroSection, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, lenis]);

  useEffect(() => {
    const setupScrollTrigger = () => {
      const heroSection = document.querySelector(".hero");

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      if (heroSection) {
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: heroSection,
          start: "bottom top",
          end: "bottom top",
          onEnter: () => setIsHeroVariant(false),
          onEnterBack: () => setIsHeroVariant(true),
          onLeave: () => setIsHeroVariant(false),
          onLeaveBack: () => setIsHeroVariant(true),
        });
      } else {
        setIsHeroVariant(false);
      }
    };

    setupScrollTrigger();
    const timeoutId = setTimeout(setupScrollTrigger, 200);

    return () => {
      clearTimeout(timeoutId);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [pathname]);

  useGSAP(
    () => {
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      }

      gsap.set(".menu-overlay", {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      });

      gsap.set(".menu-link-item-holder", {
        y: 75,
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });

      return () => {
        if (lenis) lenis.off("scroll", ScrollTrigger.update);
      };
    },
    { scope: container, dependencies: [lenis] },
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current?.reverse();
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLinkClick = (path: string) => {
    setIsMenuOpen(false);
    setTimeout(() => router.push(path), 200);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const headerVariants = {
    hero: {
      bg: "bg-transparent",
      border: "border-white/20",
      logoText: "text-white",
      logoIcon: "bg-white/20",
      logoIconText: "text-white",
      navText: "text-white hover:text-green-400",
      button: "bg-white/20 hover:bg-white/30 text-white border border-white/30",
      menuButton: "hover:bg-white/10 text-white",
    },
    default: {
      bg: "bg-[#FAF3EB]",
      border: "border-lime-900/20",
      logoText: "text-lime-900",
      logoIcon: "bg-lime-900",
      logoIconText: "text-white",
      navText: "text-lime-900 hover:text-green-600",
      button:
        "bg-lime-900 hover:bg-lime-800 text-white border border-transparent",
      menuButton: "hover:bg-lime-900/10 text-lime-900",
    },
  };

  const currentVariant = isHeroVariant
    ? headerVariants.hero
    : headerVariants.default;

  return (
    <div className="relative select-none" ref={container}>
      {/* HEADER */}
      <div
        className={`fixed top-0 left-0 z-40 flex w-full items-center justify-between border-b p-4 transition-all duration-300 ${currentVariant.bg} ${currentVariant.border}`}
      >
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={isHeroVariant ? "/navlogo4.svg" : "/navlogo3.svg"}
            alt="Eden Park"
            width={108}
            height={40}
            priority
          />
          {/* <span className={`text-xl font-bold ${currentVariant.logoText}`}>
            Eden Park
          </span> */}
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          {menuLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-NHD font-medium transition-colors duration-300 ${currentVariant.navText}`}
            >
              {link.label}
            </Link>
          ))}
          {/* <button
            className={`font-NHD rounded-lg border px-6 py-2 transition-all duration-300 ${currentVariant.button}`}
          >
            Visit Us
          </button> */}
        </div>

        <button
          className={`cursor-pointer rounded-lg py-2 transition-all duration-300 md:hidden ${currentVariant.menuButton}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <p className="font-medium">{isMenuOpen ? "Close" : "Menu"}</p>
        </button>
      </div>

      {/* MOBILE OVERLAY FIXED HEIGHT */}
      <div
        className="menu-overlay fixed top-0 left-0 z-50 w-full bg-lime-900 md:hidden"
        style={{
          height: "calc(var(--vh, 1vh) * 100)",
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        }}
        ref={overlayRef}
      >
        <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/navlogo.svg"
              alt="Eden Park Logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-xl font-bold text-white">Eden Park</span>
          </div>
          <button
            className="cursor-pointer rounded-lg py-2 transition-colors duration-200 hover:bg-white/10"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <p className="font-medium text-white">Close</p>
          </button>
        </div>

        <div className="flex h-full justify-between p-4 pt-20">
          <div
            className="flex w-full flex-col items-end pt-20 text-right"
            ref={menuLinksRef}
          >
            <div className="space-y-2">
              {menuLinks.map((link, index) => (
                <div
                  className="menu-link-item-holder overflow-hidden"
                  key={index}
                >
                  <div className="group relative">
                    <a
                      href={link.path}
                      className="font-PPRegular block text-5xl leading-tight text-white transition-opacity hover:opacity-70 md:text-6xl"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.path);
                      }}
                    >
                      {link.label}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-20 text-white">
              <p>Eden Park 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
