"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
  const router = useRouter();

  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
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
    },
    { scope: container }
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

  return (
    <div className="relative" ref={container}>
      {/* Header */}
      <div className="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-40 ">
        <div className="font-bold text-xl">
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div> */}
            <span className="text-xl font-bold text-gray-900">Eden Park</span>
          </Link>
        </div>
        <button
          className="cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <p className="font-medium text-gray-700">
            {isMenuOpen ? "Close" : "Menu"}
          </p>
        </button>
      </div>

      {/* Menu Overlay */}
      <div
        className="menu-overlay h-screen fixed top-0 left-0 w-full z-50 bg-lime-900"
        style={{
          // background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        }}
        ref={overlayRef}
      >
        {/* Menu Header */}
        <div className="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-50">
          <div className="font-bold text-xl">
            <Link href="/" className="flex items-center space-x-2 text-white">
              {/* <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div> */}
              <span className="text-xl font-bold text-white">Eden Park</span>
            </Link>
          </div>
          <button
            className="cursor-pointer px-4 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <p className="font-medium text-white">Close</p>
          </button>
        </div>

        {/* Menu Content */}
        <div className="h-full flex justify-between p-4 pt-20">
          {/* Close Icon Left */}
          <div className="flex-1 flex items-end">
            <div
              ref={closeIconRef}
              className="text-4xl font-bold text-white/60 cursor-pointer hover:text-white transition-colors duration-200"
              onClick={toggleMenu}
            >
              <p>&#x2715;</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-4 flex flex-col pt-20" ref={menuLinksRef}>
            <div className="space-y-2">
              {menuLinks.map((link, index) => (
                <div
                  className="menu-link-item-holder overflow-hidden"
                  key={index}
                >
                  <div className="relative group">
                    <a
                      href={link.path}
                      className="block text-7xl md:text-8xl leading-tight text-white hover:opacity-70 transition-opacity font-PPRegular"
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
          <div className="flex-1 flex justify-end items-end">
            <div ref={showreelRef} className="cursor-pointer group">
              <p className="text-xl md:text-2xl font-semibold text-white group-hover:opacity-70 transition-opacity font-NHD">
                Visit Us
              </p>
              <div className="h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
