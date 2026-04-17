"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useCallback, useMemo, useRef } from "react";

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // Memoize chunks to prevent recalculation on every render
  // Distribute images equally across 5 columns
  const chunks = useMemo(() => {
    const chunkSize = Math.ceil(images.length / 5);
    return Array.from({ length: 5 }, (_, colIndex) => {
      const start = colIndex * chunkSize;
      return images.slice(start, start + chunkSize);
    });
  }, [images]);

  // Memoize motion variants for better performance
  const motionVariants = useMemo(
    () => ({
      animate: (colIndex: number) => ({
        y: colIndex % 2 === 0 ? 100 : -100,
        transition: {
          duration: colIndex % 2 === 0 ? 3 : 4,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "linear" as const,
        },
      }),
      hover: {
        y: -10,
        transition: {
          duration: 0.3,
          ease: "easeInOut" as const,
        },
      },
    }),
    []
  );

  // Optimize hover handlers with useCallback
  const handleMouseEnter = useCallback(
    (image: string) => {
      if (isInView) {
        setHoveredImage(image);
      }
    },
    [isInView]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredImage(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "mx-auto block h-[600px] overflow-visible max-sm:h-100 relative",
        className
      )}
      style={{ willChange: "transform" }}
    >
      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-70 sm:scale-85 md:scale-90 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-[450px] right-[65%] grid size-full origin-top-left grid-cols-5 gap-8 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={isInView ? motionVariants.animate(colIndex) : { y: 0 }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-8"
                style={{ willChange: "transform" }}
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <motion.img
                      whileHover={isInView ? motionVariants.hover : {}}
                      onMouseEnter={() => handleMouseEnter(image)}
                      onMouseLeave={handleMouseLeave}
                      key={imageIndex + image}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      className="aspect-[970/700] rounded-lg object-cover hover:shadow-2xl cursor-pointer"
                      width={970}
                      height={700}
                      loading="lazy"
                      decoding="async"
                      style={{ willChange: "transform" }}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hovered Image Overlay - Only render when in view */}
      {isInView && (
        <AnimatePresence>
          {hoveredImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-[9999] flex items-center justify-center pointer-events-none"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <motion.div
                initial={{ scale: 0.8, rotateY: -15 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0.8, rotateY: 15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative"
              >
                <img
                  src={hoveredImage}
                  alt="Enlarged view"
                  className="max-w-[80vw] max-h-[80vh] w-auto h-auto rounded-2xl shadow-2xl object-contain"
                  style={{
                    filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8))",
                  }}
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};
