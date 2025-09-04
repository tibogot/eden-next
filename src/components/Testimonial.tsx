import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

// SEO-friendly testimonials data
const testimonials = [
  {
    text: "Eden Park & Garden transformed our corporate event into an unforgettable experience. The lush gardens provided the perfect backdrop for our team building activities, while the exceptional catering service exceeded all expectations. The professional staff ensured every detail was perfectly executed.",
    author: "LINDA KAWUMA",
  },
  {
    text: "From the moment we stepped into Eden Park & Garden, we knew we had found something truly special. The panoramic views from the elevated dining area are breathtaking, especially during sunset. The traditional Nigerian cuisine is expertly prepared with fresh, local ingredients that showcase authentic flavors.",
    author: "MARIE JOHNSON",
  },
  {
    text: "Eden Park & Garden offers a unique blend of entertainment and relaxation that's unmatched in Abuja. The football field is professionally maintained, the pool tables are tournament-quality, and the live music performances create an electric atmosphere that keeps guests coming back.",
    author: "JONATHAN ADEBAYO",
  },
  {
    text: "As a food enthusiast, I've dined at many establishments across Abuja, but Eden Park & Garden stands out for its commitment to quality and innovation. The garden-to-table concept ensures the freshest ingredients, while the skilled chefs create culinary masterpieces that delight both the eyes and palate.",
    author: "SOPHIA OKAFOR",
  },
];

const Testimonial = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (sliderRef.current && slidesRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const totalSlideWidth = slidesRef.current.scrollWidth;
      setDragConstraints({
        left: -(totalSlideWidth - sliderWidth),
        right: 0,
      });
    }
  }, [sliderRef, slidesRef, testimonials.length]);

  return (
    <div
      ref={sliderRef}
      className="h-[70vh] w-full overflow-hidden bg-[#3d5736] py-20"
    >
      <motion.div
        ref={slidesRef}
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.2}
        dragTransition={{ bounceDamping: 18 }}
        className="flex cursor-grab items-stretch gap-0 px-0 active:cursor-grabbing"
        style={{ touchAction: "pan-y", height: "100%" }}
      >
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className={`relative flex w-[85vw] flex-shrink-0 flex-col justify-between md:w-[50vw] ${
              idx > 0
                ? "border-l border-white/40 pl-8 md:pl-16"
                : "pl-8 md:pl-16"
            }`}
          >
            <p className="font-PPRegularUL text-lg leading-relaxed text-white md:text-xl md:leading-relaxed lg:text-2xl lg:leading-relaxed">
              {t.text}
            </p>
            <span className="font-NHD mt-8 text-xs text-white/80">
              {t.author}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonial;
