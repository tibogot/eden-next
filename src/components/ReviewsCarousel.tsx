import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowCircleRight,
  ArrowCircleLeft,
  Star,
  StarHalf,
  Star as StarFull,
  Star as StarBorder,
} from "@phosphor-icons/react";

// Review data (add a stars property for each review)
const reviews = [
  {
    text: "Eden is a hidden gem. The atmosphere is magical and the service is impeccable. A truly unforgettable dining experience.",
    author: "Sarah Mitchell",
    stars: 5,
  },
  {
    text: "The garden setting creates such a unique ambiance. Every dish was a work of art. Can't wait to return!",
    author: "James Wilson",
    stars: 4,
  },
  {
    text: "An oasis in the city. The fusion of flavors and the romantic setting make this place absolutely special.",
    author: "Emma Thompson",
    stars: 5,
  },
  {
    text: "Exceptional cuisine in a breathtaking setting. The attention to detail is remarkable.",
    author: "Michael Chen",
    stars: 4,
  },
  {
    text: "A dining experience that engages all your senses. The garden view and ambient lighting create pure magic.",
    author: "Isabella Rodriguez",
    stars: 5,
  },
];

// Framer Motion animation variants
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const ReviewsCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const paginate = (newDirection: number) => {
    const newPage = (page + newDirection + reviews.length) % reviews.length;
    setPage([newPage, newDirection]);
  };

  const currentReview = reviews[page];

  return (
    <div
      className={`relative h-[400px] w-full overflow-hidden bg-lime-900 px-4 py-12 ${
        isGrabbing ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div className="relative flex h-full items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragStart={() => setIsGrabbing(true)}
            onDragEnd={(_e, { offset, velocity }) => {
              setIsGrabbing(false);

              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute flex w-full flex-col items-center px-8 text-center"
          >
            {/* Star rating */}
            <div className="mb-6 flex justify-center">
              {Array.from({ length: 5 }).map((_, i) =>
                i < currentReview.stars ? (
                  <StarFull
                    key={i}
                    size={24}
                    weight="fill"
                    className="text-white drop-shadow"
                  />
                ) : (
                  <StarBorder
                    key={i}
                    size={24}
                    weight="regular"
                    className="text-white"
                  />
                ),
              )}
            </div>
            <p className="font-PPRegular mb-10 w-3/4 text-2xl text-white md:w-1/2 md:text-3xl/12">
              “{currentReview.text}”
            </p>
            <p className="font-NHD text-sm text-white/80">
              {currentReview.author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer p-2 text-white transition-colors hover:text-white"
        onClick={() => paginate(-1)}
        aria-label="Previous slide"
      >
        <ArrowCircleLeft size={40} weight="fill" />
      </button>
      <button
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer p-2 text-white transition-colors hover:text-white"
        onClick={() => paginate(1)}
        aria-label="Next slide"
      >
        <ArrowCircleRight size={40} weight="fill" />
      </button>
    </div>
  );
};

export default ReviewsCarousel;
