import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stack from "./Stack";

gsap.registerPlugin(ScrollTrigger);

interface Event {
  name: string;
  date: string;
  description: string;
  registerLink?: string;
  isUpcoming: boolean;
  images: string[];
}

// Helper functions to parse and format dates that support month/year only
function parseDate(dateString: string): Date | null {
  // Check if it's a month/year format (e.g., "Jan 2026", "January 2026", "2026-01")
  const monthYearPattern =
    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})$/i;
  const yearMonthPattern = /^(\d{4})-(\d{2})$/;

  if (monthYearPattern.test(dateString)) {
    // Parse month name format
    const match = dateString.match(/^(\w+)\s+(\d{4})$/i);
    if (match) {
      const monthNames: { [key: string]: number } = {
        jan: 0,
        january: 0,
        feb: 1,
        february: 1,
        mar: 2,
        march: 2,
        apr: 3,
        april: 3,
        may: 4,
        jun: 5,
        june: 5,
        jul: 6,
        july: 6,
        aug: 7,
        august: 7,
        sep: 8,
        september: 8,
        oct: 9,
        october: 9,
        nov: 10,
        november: 10,
        dec: 11,
        december: 11,
      };
      const month = monthNames[match[1].toLowerCase()];
      const year = parseInt(match[2]);
      if (month !== undefined) {
        return new Date(year, month, 1);
      }
    }
  } else if (yearMonthPattern.test(dateString)) {
    // Parse YYYY-MM format
    const [year, month] = dateString.split("-").map(Number);
    return new Date(year, month - 1, 1);
  }

  // Try parsing as full date
  const parsed = new Date(dateString);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function isMonthYearOnly(dateString: string): boolean {
  const monthYearPattern =
    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})$/i;
  const yearMonthPattern = /^(\d{4})-(\d{2})$/;
  return monthYearPattern.test(dateString) || yearMonthPattern.test(dateString);
}

function formatEventDate(dateString: string): string {
  const isMonthYear = isMonthYearOnly(dateString);
  const parsedDate = parseDate(dateString);

  if (!parsedDate) return dateString;

  if (isMonthYear) {
    // Format as "Jan 2026"
    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } else {
    // Format as full date "Mar 15, 2024"
    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}

function formatEventDateFull(dateString: string): string {
  const isMonthYear = isMonthYearOnly(dateString);
  const parsedDate = parseDate(dateString);

  if (!parsedDate) return dateString;

  if (isMonthYear) {
    // Format as "January 2026"
    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } else {
    // Format as full date "Monday, March 15, 2024"
    return parsedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

const events: Event[] = [
  {
    name: "Coders Quest",
    date: "2024-10-24",
    description:
      "A competitive coding event that challenged participants to solve complex algorithmic problems and showcase their programming skills.",
    isUpcoming: false,
    images: [
      "/media/events/codersQuest/codersQuest.webp",
      "/media/events/codersQuest/CQ (1).webp",
      "/media/events/codersQuest/CQ (2).webp",
      "/media/events/codersQuest/CQ (3).webp",
      "/media/events/codersQuest/CQ (4).webp",
    ],
  },
  {
    name: "Sync Up",
    date: "2025-09-04",
    description:
      "An orientation and networking event to welcome new members and sync the community with upcoming activities and opportunities.",
    isUpcoming: false,
    images: [
      "/media/events/syncUp/syncUp.webp",
      "/media/events/syncUp/orientation.webp",
      "/media/events/syncUp/SU (1).webp",
      "/media/events/syncUp/SU (2).webp",
      "/media/events/syncUp/SU (3).webp",
      "/media/events/syncUp/SU (4).webp",
      "/media/events/syncUp/SU (5).webp",
    ],
  },
  {
    name: "SIH Internal Hackathon",
    date: "2024-09-09",
    description:
      "Internal round of SIH 2024 national level hackathon where teams competed to qualify for the national stage.",
    isUpcoming: false,
    images: ["/media/events/InternalSIH2024/interalSIH.webp"],
  },
  {
    name: "Syncathon",
    date: "2025-09-22",
    description:
      "A hackathon event bringing together developers, designers, and innovators to create innovative solutions in a collaborative environment.",
    isUpcoming: false,
    images: [
      "/media/events/Syncathon/syncathon.webp",
      "/media/events/Syncathon/SYN (1).webp",
      "/media/events/Syncathon/SYN (2).webp",
      "/media/events/Syncathon/SYN (3).webp",
      "/media/events/Syncathon/SYN (4).webp",
    ],
  },
  {
    name: "Coders Quest 2.0",
    date: "Mar 2026",
    description:
      "The second edition of our competitive coding championship, featuring advanced challenges and exciting prizes.",
    isUpcoming: true,
    images: ["/media/events/codersQuest2.0/codersQuest2.0.webp"],
  },
  {
    name: "Tech Fest",
    date: "Jan 2026",
    description:
      "A grand technology festival showcasing the latest innovations, workshops, and tech competitions. Coming soon!",
    isUpcoming: true,
    images: ["/media/events/techFest/ComingSoon.webp"],
  },
];

// Sort events by date
const sortedEvents = [...events].sort((a, b) => {
  const dateA = parseDate(a.date);
  const dateB = parseDate(b.date);
  if (!dateA || !dateB) return 0;
  return dateA.getTime() - dateB.getTime();
});

interface TimelineItemProps {
  event: Event;
  index: number;
  onImageClick: (event: Event) => void;
}

function TimelineItem({ event, index, onImageClick }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!itemRef.current) return;

    const isAlternate = index % 2 === 1;
    const isMobile = window.innerWidth < 1024;

    // Content animation
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          x: isMobile ? 0 : isAlternate ? 50 : -50,
          y: isMobile ? 20 : 0,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.5,
            markers: false,
          },
        }
      );
    }

    // Image animation (only on desktop)
    if (imageRef.current && !isMobile) {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: isAlternate ? -50 : 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.5,
            markers: false,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [index]);

  const isAlternate = index % 2 === 1;
  const formattedDate = formatEventDate(event.date);

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the image modal
    if (event.registerLink) {
      // Check if it's a URL or internal route
      if (
        event.registerLink.startsWith("http://") ||
        event.registerLink.startsWith("https://")
      ) {
        window.open(event.registerLink, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = event.registerLink;
      }
    }
  };

  return (
    <div ref={itemRef} className="relative mb-8 lg:mb-16">
      {/* Mobile Layout - Single Column with global line */}
      <div className="lg:hidden relative px-2">
        <div className="pt-1">
          <div className="grid grid-cols-[1fr_24px_1fr] gap-3 items-start">
            <div>
              {isAlternate ? (
                event.images.length > 0 ? (
                  <div
                    className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => onImageClick(event)}
                  >
                    <img
                      src={event.images[0]}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                    {event.images.length > 1 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-bold text-xs">
                          +{event.images.length - 1}
                        </span>
                      </div>
                    )}
                  </div>
                ) : null
              ) : (
                <div ref={contentRef} className="transform">
                  <div
                    className="bg-card/50 backdrop-blur-lg border border-border rounded-2xl p-4 hover:border-primary/30 transition-all duration-300 cursor-pointer group shadow-sm"
                    onClick={() => onImageClick(event)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-black text-foreground group-hover:text-primary transition-colors flex-1">
                        {event.name}
                      </h3>
                      <span
                        className={`${
                          event.isUpcoming
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        } px-2 py-0.5 rounded-full text-[10px] font-black whitespace-nowrap`}
                      >
                        {event.isUpcoming ? "UPCOMING" : "PAST"}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs font-medium mb-2">
                      {event.description}
                    </p>
                    <p className="text-muted-foreground/60 text-[10px] font-bold mb-2">
                      {formattedDate}
                    </p>
                    {event.isUpcoming && (
                      <button
                        onClick={handleRegisterClick}
                        disabled={!event.registerLink}
                        className={`${
                          event.registerLink
                            ? "bg-primary text-primary-foreground hover:scale-[1.02] cursor-pointer active:scale-95"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        } w-full mt-2 px-3 py-1.5 rounded-xl text-xs font-black transition-all duration-300 shadow-sm`}
                      >
                        {event.registerLink
                          ? "Register Now"
                          : "Registration link coming soon"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="relative flex items-center justify-center">
              <div
                className={`w-3 h-3 rounded-full border-2 border-primary bg-background transition-transform duration-700 ${
                  isInView ? "scale-100 shadow-lg shadow-primary" : "scale-75"
                }`}
              />
              <div
                className={`absolute h-0.5 bg-primary/40 ${
                  isAlternate ? "left-1/2 w-[16px]" : "right-1/2 w-[16px]"
                }`}
              />
            </div>
            <div>
              {isAlternate ? (
                <div ref={contentRef} className="transform">
                  <div
                    className="bg-card/50 backdrop-blur-lg border border-border rounded-2xl p-4 hover:border-primary/30 transition-all duration-300 cursor-pointer group shadow-sm"
                    onClick={() => onImageClick(event)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-black text-foreground group-hover:text-primary transition-colors flex-1">
                        {event.name}
                      </h3>
                      <span
                        className={`${
                          event.isUpcoming
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        } px-2 py-0.5 rounded-full text-[10px] font-black whitespace-nowrap`}
                      >
                        {event.isUpcoming ? "UPCOMING" : "PAST"}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs font-medium mb-2">
                      {event.description}
                    </p>
                    <p className="text-muted-foreground/60 text-[10px] font-bold mb-2">
                      {formattedDate}
                    </p>
                    {event.isUpcoming && (
                      <button
                        onClick={handleRegisterClick}
                        disabled={!event.registerLink}
                        className={`${
                          event.registerLink
                            ? "bg-primary text-primary-foreground hover:scale-[1.02] cursor-pointer active:scale-95"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        } w-full mt-2 px-3 py-1.5 rounded-xl text-xs font-black transition-all duration-300 shadow-sm`}
                      >
                        {event.registerLink
                          ? "Register Now"
                          : "Registration link coming soon"}
                      </button>
                    )}
                  </div>
                </div>
              ) : event.images.length > 0 ? (
                <div
                  className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => onImageClick(event)}
                >
                  <img
                    src={event.images[0]}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  {event.images.length > 1 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-bold text-xs">
                        +{event.images.length - 1}
                      </span>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Alternating */}
      <div
        className={`hidden lg:flex items-center ${
          isAlternate ? "flex-row-reverse" : ""
        }`}
      >
        {/* Content */}
        <div className={`w-5/12 ${isAlternate ? "pr-12" : "pl-12"}`}>
          <div ref={contentRef} className="transform">
            <div
              className="bg-card/50 backdrop-blur-lg border border-border rounded-[2rem] p-8 hover:border-primary/20 transition-all duration-500 cursor-pointer group shadow-sm"
              onClick={() => onImageClick(event)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-black text-foreground group-hover:text-primary transition-colors">
                  {event.name}
                </h3>
                <span
                  className={`px-4 py-1 rounded-full text-xs font-black ${
                    event.isUpcoming
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {event.isUpcoming ? "UPCOMING" : "PAST"}
                </span>
              </div>
              <p className="text-muted-foreground text-base font-medium mb-4 leading-relaxed">{event.description}</p>
              <p className="text-muted-foreground/60 text-sm font-bold mb-6">{formattedDate}</p>
              {event.isUpcoming && (
                <button
                  onClick={handleRegisterClick}
                  disabled={!event.registerLink}
                  className={`w-full px-6 py-3 rounded-2xl text-sm font-black transition-all duration-300 ${
                    event.registerLink
                      ? "bg-primary text-primary-foreground hover:scale-105 hover:shadow-xl hover:shadow-primary/20 cursor-pointer active:scale-95"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {event.registerLink
                    ? "Register Now"
                    : "Registration link coming soon"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Timeline Center */}
        <div className="w-2/12 flex justify-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full border-2 border-primary bg-background transform transition-all duration-700 ${
                isInView ? "scale-100 shadow-lg shadow-primary" : "scale-75"
              }`}
            />
            {/* Vertical line connector */}
            <div className="w-0.5 h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent mt-2" />
          </div>
        </div>

        {/* Image Stack - Desktop */}
        <div className={`w-5/12 ${isAlternate ? "pl-12" : "pr-12"}`}>
          <div ref={imageRef} className="transform">
            {event.images.length > 0 && (
              <div
                className="flex justify-center cursor-pointer group"
                onClick={() => onImageClick(event)}
              >
                <div className="relative w-48 h-48 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-4 border-white/50">
                  <img
                    src={event.images[0]}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {event.images.length > 1 && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-black text-lg">
                        +{event.images.length - 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const mobileProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!timelineRef.current || !mobileProgressRef.current) return;
    const container = timelineRef.current;
    const progressEl = mobileProgressRef.current;

    gsap.fromTo(
      progressEl,
      { height: 0 },
      {
        height: () => container.scrollHeight,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleImageClick = (event: Event) => {
    if (event.images.length > 0) {
      setSelectedEvent(event);
      setShowImageModal(true);
    }
  };

  return (
    <section
      id="events"
      ref={sectionRef}
      className="min-h-screen px-4 lg:px-6 py-12 lg:py-20 bg-transparent overflow-visible"
    >
      <div
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-4xl lg:text-6xl font-black text-foreground mb-3 lg:mb-4">
            Events Timeline
          </h2>
          <p className="text-base lg:text-xl text-muted-foreground font-medium">
            Explore our journey through innovation and collaboration
          </p>
        </div>

        {/* Vertical Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent transform -translate-x-1/2" />
          <div className="lg:hidden absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent transform -translate-x-1/2" />
          <div
            ref={mobileProgressRef}
            className="lg:hidden absolute left-1/2 top-0 w-0.5 bg-primary transform -translate-x-1/2"
            style={{ height: 0 }}
          />

          {/* Timeline Items */}
          <div className="relative">
            {sortedEvents.map((event, index) => (
              <TimelineItem
                key={event.name}
                event={event}
                index={index}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && selectedEvent && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-8 max-w-4xl w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-black text-foreground">
                {selectedEvent.name}
              </h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X size={24} className="text-foreground" />
              </button>
            </div>
            <div className="flex justify-center">
              <Stack
                cardsData={selectedEvent.images
                  .filter((img) => img && img.trim() !== "")
                  .map((img, index) => ({
                    id: index + 1,
                    img: img,
                  }))}
                cardDimensions={{ width: 300, height: 300 }}
                randomRotation={true}
                sensitivity={150}
              />
            </div>
            <div className="text-center mt-6">
              <p className="text-muted-foreground font-medium mb-2">{selectedEvent.description}</p>
              <p className="text-primary font-black text-sm">
                {formatEventDateFull(selectedEvent.date)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
