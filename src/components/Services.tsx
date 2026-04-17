import { Film, Camera, Scissors, Palette, Megaphone, Video } from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Video Production",
    description:
      "From concept to screen — cinematic storytelling with professional crews, equipment, and direction.",
  },
  {
    icon: Camera,
    title: "Photography",
    description:
      "Editorial, product, and event photography that captures the essence of your brand.",
  },
  {
    icon: Scissors,
    title: "Post-Production",
    description:
      "Color grading, VFX, sound design, and editing that transforms raw footage into art.",
  },
  {
    icon: Palette,
    title: "Creative Direction",
    description:
      "Strategic visual planning that aligns every frame with your brand identity and goals.",
  },
  {
    icon: Megaphone,
    title: "Brand Content",
    description:
      "Social media reels, ad films, and branded content optimized for engagement and reach.",
  },
  {
    icon: Video,
    title: "Live Event Coverage",
    description:
      "Multi-camera setups, live streaming, and same-day edits for conferences, launches, and more.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 px-4 md:px-6 bg-transparent">
      <div className="max-w-[95%] md:max-w-[85%] lg:max-w-[80%] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-black text-sm tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            We bring your vision to life with end-to-end creative solutions
            tailored to your brand.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Icon
                    size={28}
                    className="text-primary"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-tr-3xl rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
