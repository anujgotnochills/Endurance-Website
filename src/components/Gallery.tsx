import { motion } from "framer-motion";
import { 
  Film, 
  Camera, 
  Scissors, 
  Palette, 
  Megaphone, 
  Video,
  Sparkles,
  Layers
} from "lucide-react";
import GalleryCard from "./GalleryCard";

const studioServices = [
  {
    title: "Video Production",
    subtitle: "Cinematic storytelling from concept to final cut.",
    Icon: Film,
    color: "#a855f7"
  },
  {
    title: "Photography",
    subtitle: "High-end editorial and product photography.",
    Icon: Camera,
    color: "#E05A00"
  },
  {
    title: "Post-Production",
    subtitle: "Professional grading, VFX, and sound design.",
    Icon: Scissors,
    color: "#FF8C2A"
  },
  {
    title: "Creative Direction",
    subtitle: "Strategic visual planning for your brand.",
    Icon: Palette,
    color: "#a855f7"
  },
  {
    title: "Social Content",
    subtitle: "Viral-ready reels and short-form content.",
    Icon: Megaphone,
    color: "#E05A00"
  },
  {
    title: "VFX & Animation",
    subtitle: "Breathtaking visual effects and 3D motion.",
    Icon: Sparkles,
    color: "#FF8C2A"
  },
  {
    title: "Live Streaming",
    subtitle: "Seamless multi-cam live broadcast solutions.",
    Icon: Video,
    color: "#a855f7"
  },
  {
    title: "Brand Strategy",
    subtitle: "End-to-end visual identity consulting.",
    Icon: Layers,
    color: "#E05A00"
  }
];

import StudioServicesCard from "./StudioServicesCard";

export default function Gallery() {
  // Triple the services to ensure a smooth infinite loop
  const displayServices = [...studioServices, ...studioServices, ...studioServices];

  return (
    <section
      id="gallery"
      className="relative min-h-[600px] flex flex-col justify-center bg-transparent py-24 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full">
        {/* First Row: Moving Right to Left */}
        <div className="flex mb-8 overflow-hidden">
          <motion.div
            animate={{ x: [0, -100 * studioServices.length + "%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex shrink-0 gap-4"
          >
            {displayServices.map((service, i) => {
              // Replace the very first card with the custom StudioServicesCard
              if (i === 0) return <StudioServicesCard key={`row1-${i}`} />;
              
              return (
                <GalleryCard
                  key={`row1-${i}`}
                  title={service.title}
                  subtitle={service.subtitle}
                  Icon={service.Icon}
                  color={service.color}
                />
              );
            })}
          </motion.div>
        </div>

        {/* Second Row: Moving Left to Right */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [-100 * studioServices.length + "%", 0] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex shrink-0 gap-4"
          >
            {[...displayServices].reverse().map((service, i) => (
              <GalleryCard
                key={`row2-${i}`}
                title={service.title}
                subtitle={service.subtitle}
                Icon={service.Icon}
                color={service.color}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
