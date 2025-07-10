import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import Copy from "./Copy5";

interface Service {
  name: string;
  href: string;
  image: string;
  color: string;
}

interface ModalState {
  active: boolean;
  index: number;
}

const services: Service[] = [
  {
    name: "Weddings",
    href: "/weddings",
    image: "/images/wedding-services.webp",
    color: "#f3f4f6",
  },
  {
    name: "Live Match",
    href: "/live-match",
    image: "/images/livematch-services.webp",
    color: "#fef3c7",
  },
  {
    name: "Church",
    href: "/church",
    image: "/images/church-services.webp",
    color: "#ddd6fe",
  },
  {
    name: "Comedy Shows",
    href: "/comedy-shows",
    image: "/images/comedy-services.webp",
    color: "#fecaca",
  },
];

// Animation variants for Framer Motion
const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as any },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as any },
  },
};

// Individual Service Component
interface ServiceItemProps {
  index: number;
  name: string;
  href: string;
  setModal: (modal: ModalState) => void;
}

function ServiceItem({ index, name, href, setModal }: ServiceItemProps) {
  return (
    <div
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      className="group relative cursor-pointer border-b border-stone-300 px-4 py-8 transition-colors duration-300 last:border-b-0 hover:bg-stone-50"
    >
      <a href={href} className="block">
        <div className="flex items-center justify-between">
          <h3 className="text-4xl text-gray-800 transition-all duration-300 group-hover:translate-x-2 group-hover:text-lime-900 md:text-6xl">
            {name}
          </h3>
          {/* <div className="text-sm tracking-wide text-gray-400 uppercase">
            Explore
          </div> */}
        </div>
      </a>
    </div>
  );
}

// Modal Component with GSAP mouse following
interface ModalProps {
  modal: ModalState;
  services: Service[];
}

function Modal({ modal, services }: ModalProps) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if elements exist before creating GSAP animations
    if (!modalContainer.current || !cursor.current || !cursorLabel.current)
      return;

    // GSAP quickTo functions for smooth mouse following - exactly like in Olivier's tutorial
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });

    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    // Mouse move handler - exactly like in the tutorial
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xMoveContainer(clientX);
      yMoveContainer(clientY);
      xMoveCursor(clientX);
      yMoveCursor(clientY);
      xMoveCursorLabel(clientX);
      yMoveCursorLabel(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Modal Container */}
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-50 h-60 w-80 overflow-hidden rounded-sm shadow-2xl"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Modal Slider - slides based on index */}
        <div
          className="relative h-full w-full"
          style={{
            top: `${index * -100}%`,
            transition: "top 0.3s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        >
          {services.map((service, idx) => (
            <div
              key={`modal_${idx}`}
              className="absolute h-full w-full"
              style={{
                backgroundColor: service.color,
                top: `${idx * 100}%`,
              }}
            >
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                draggable={false}
                sizes="(max-width: 768px) 100vw, 384px"
                style={{ objectFit: "cover" }}
                priority={idx === index}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Custom Cursor */}
      <motion.div
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed"
        style={{
          left: "0px",
          top: "0px",
        }}
      />

      {/* Cursor Label */}
      <motion.div
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-50 flex items-center justify-center"
        style={{
          left: "0px",
          top: "0px",
        }}
      ></motion.div>
    </>
  );
}

// Main Component
export default function ManyServices() {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });

  return (
    <section className="relative min-h-screen w-full bg-[#FAF3EB] px-4 py-20 md:px-8 md:py-20">
      {/* Title */}
      <Copy>
        <h3 className="font-PPRegular mb-4 text-center text-5xl leading-tight text-gray-800 md:text-8xl">
          And many more
        </h3>
      </Copy>
      {/* Description */}
      <p className="font-NHD mx-auto mb-16 text-center text-lg text-gray-600 md:w-1/3">
        Eden Park & Garden is a vibrant oasis in Abuja offering a unique blend
        of entertainment and relaxation. From live music and dance shows to
        thrilling football matches, there's something for everyone.
      </p>

      {/* Services List */}
      <div className="font-PPItalic">
        {services.map((service, index) => (
          <ServiceItem
            key={service.name}
            index={index}
            name={service.name}
            href={service.href}
            setModal={setModal}
          />
        ))}
      </div>

      {/* Modal */}
      <Modal modal={modal} services={services} />
    </section>
  );
}
