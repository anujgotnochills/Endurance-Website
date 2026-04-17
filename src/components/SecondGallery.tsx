import { useEffect, useRef, useState } from 'react';
import DomeGallery from './DomeGallery';

export default function SecondGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="second-gallery"
      ref={sectionRef}
      className="min-h-screen px-6 py-20 bg-black flex flex-col items-center justify-center"
    >
      <div className={`w-full max-w-[80%] mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black text-white mb-4">Gallery</h2>
          <p className="text-xl text-white/70">Explore our interactive 3D gallery</p>
        </div>

        <div className="w-full relative h-[600px] md:h-[700px]">
          <DomeGallery
            overlayBlurColor="#000000"
            grayscale={false}
            fit={0.65}
            minRadius={700}
          />
        </div>
      </div>
    </section>
  );
}

