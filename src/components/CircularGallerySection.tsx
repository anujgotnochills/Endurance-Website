import CircularGallery from './CircularGallery';
import { useGalleryPhotos } from '@/lib/hooks';

export default function CircularGallerySection() {
  const { data: galleryPhotos } = useGalleryPhotos();

  // Map to CircularGallery's expected format
  const galleryItems = galleryPhotos.map(p => ({
    image: p.image_url,
    text: p.caption,
  }));

  return (
    <section id="gallery" className="relative h-[600px] md:h-[900px] bg-transparent mt-12 py-10 md:py-20 overflow-hidden">
      <div className="text-center mb-16 relative z-10 px-6">
        <p className="text-primary font-black text-sm tracking-widest uppercase mb-3">
          Studio Showcase
        </p>
        <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-4">
          Faces We&apos;ve Worked With
        </h2>
      </div>

      <div className="absolute inset-0 top-60">
        <CircularGallery 
          items={galleryItems}
          bend={-4} 
          textColor="hsl(var(--foreground))" 
          borderRadius={0.05} 
          scrollEase={0.08}
          scrollSpeed={3.5}
        />
      </div>
    </section>
  );
}
