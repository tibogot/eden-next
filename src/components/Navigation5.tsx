"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/contact", label: "Contact" },
];

const Menu = () => {
  const container = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const closeIconRef = useRef<HTMLDivElement>(null);
  const showreelRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroVariant, setIsHeroVariant] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  const tl = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Scroll to top on route change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Reset variant state when navigating
    const checkHeroSection = () => {
      const heroSection = document.querySelector(".hero");
      if (heroSection) {
        setIsHeroVariant(true);
      } else {
        setIsHeroVariant(false);
      }
    };

    // Check immediately and after a small delay to ensure DOM is updated
    checkHeroSection();
    const timeoutId = setTimeout(checkHeroSection, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, lenis]);

  // Also scroll to top on initial load
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  // Separate effect to handle ScrollTrigger recreation
  useEffect(() => {
    const setupScrollTrigger = () => {
      const heroSection = document.querySelector(".hero");
      if (heroSection) {
        // Kill any existing ScrollTrigger for hero section
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
          scrollTriggerRef.current = null;
        }

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
        // If no hero section, set to default variant
        setIsHeroVariant(false);
      }
    };

    // Setup immediately
    setupScrollTrigger();

    // Setup after a delay to ensure DOM is ready
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
      // Integrate Lenis with ScrollTrigger
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      }

      // Initial setup
      gsap.set(".menu-overlay", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      });

      gsap.set(".menu-link-item-holder", {
        y: 75,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      });

      // Create timeline
      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });

      // Cleanup function
      return () => {
        if (lenis) {
          lenis.off("scroll", ScrollTrigger.update);
        }
      };
    },
    { scope: container, dependencies: [lenis] },
  );

  // Handle menu state changes
  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play();
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      tl.current?.reverse();
      // Restore body scroll when menu is closed
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (path: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      router.push(path);
    }, 200);
  };

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Define variant styles
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
    <div className="relative" ref={container}>
      {/* Header */}
      <div
        className={`fixed top-0 left-0 z-40 flex w-full items-center justify-between border-b p-4 transition-all duration-300 ${currentVariant.bg} ${currentVariant.border}`}
      >
        <div className="text-xl font-bold">
          <Link href="/" className="flex items-center space-x-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${currentVariant.logoIcon}`}
            >
              <span
                className={`text-sm font-bold transition-colors duration-300 ${currentVariant.logoIconText}`}
              >
                E
              </span>
            </div>
            <span
              className={`text-xl font-bold transition-colors duration-300 ${currentVariant.logoText}`}
            >
              Eden Park
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
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
          <button
            className={`font-NHD rounded-lg border px-6 py-2 font-medium transition-all duration-300 ${currentVariant.button}`}
          >
            Visit Us
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className={`cursor-pointer rounded-lg px-4 py-2 transition-all duration-300 md:hidden ${currentVariant.menuButton}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <p className="font-medium">{isMenuOpen ? "Close" : "Menu"}</p>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className="menu-overlay fixed top-0 left-0 z-50 h-[100svh] w-full bg-lime-900 md:hidden"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        }}
        ref={overlayRef}
      >
        {/* Menu Header */}
        <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-between p-4">
          <div className="text-xl font-bold">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <span className="text-sm font-bold text-white">E</span>
              </div>
              <span className="text-xl font-bold text-white">Eden Park</span>
            </Link>
          </div>
          <button
            className="cursor-pointer rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-white/10"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <p className="font-medium text-white">Close</p>
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex h-full justify-between p-4 pt-20">
          {/* Close Icon Left */}
          <div className="flex flex-1 items-end">
            <div
              ref={closeIconRef}
              className="cursor-pointer text-4xl font-bold text-white/60 transition-colors duration-200 hover:text-white"
              onClick={toggleMenu}
            >
              <p>&#x2715;</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-4 flex-col pt-20" ref={menuLinksRef}>
            <div className="space-y-2">
              {menuLinks.map((link, index) => (
                <div
                  className="menu-link-item-holder overflow-hidden"
                  key={index}
                >
                  <div className="group relative">
                    <a
                      href={link.path}
                      className="font-PPRegular block text-7xl leading-tight text-white transition-opacity hover:opacity-70 md:text-8xl"
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
          </div>

          {/* Showreel Right */}
          <div className="flex flex-1 items-end justify-end">
            <div ref={showreelRef} className="group cursor-pointer">
              <p className="font-NHD text-xl font-semibold text-white transition-opacity group-hover:opacity-70 md:text-2xl">
                Visit Us
              </p>
              <div className="mt-1 h-0.5 origin-right scale-x-0 transform bg-white transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
