import { useMemo } from 'react';
import { useReels } from '@/lib/hooks';
import { cn } from '@/lib/utils';

interface Reel {
  id: string;
  youtubeUrl: string;
  videoId: string;
  title: string;
}

/** One strip: compact on small screens, original marquee sizes from md up. */
const ReelCard = ({ reel }: { reel: Reel }) => (
  <a
    href={reel.youtubeUrl}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      'group relative block h-[268px] w-36 shrink-0 overflow-hidden rounded-2xl bg-black shadow-xl sm:h-[300px] sm:w-40 sm:rounded-3xl',
      'md:h-[320px] md:w-44 md:rounded-3xl',
      'lg:h-[426px] lg:w-60',
      'xl:h-[455px] xl:w-64'
    )}
    style={{ margin: '0 6px' }}
  >
    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-white/10 z-10" />

    <img
      src={`https://i.ytimg.com/vi/${reel.videoId}/hqdefault.jpg`}
      alt={reel.title}
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white text-sm font-bold shadow-md">
        ▶
      </span>
    </div>

    <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center z-20">
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 text-white text-xs font-black px-3 py-1.5 rounded-full tracking-wide">
        Watch Full ↗
      </span>
    </div>
  </a>
);

const Reels = () => {
  const { data: reelsData } = useReels();

  const reels: Reel[] = reelsData.map(r => ({
    id: r.id,
    youtubeUrl: r.youtube_url,
    videoId: r.video_id,
    title: r.title,
  }));

  const marqueeTrack = useMemo(() => [...reels, ...reels, ...reels], [reels]);

  return (
    <section id="portfolio" className="relative py-20 lg:pt-8 lg:pb-14 bg-background overflow-hidden">
      <div className="max-w-[95%] md:max-w-[85%] lg:max-w-[80%] mx-auto px-4 md:px-6 mb-8 md:mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
          Our Work in Motion
        </h2>
        <p className="text-base md:text-lg text-muted-foreground font-medium">A glimpse of the stories, brands, and moments we’ve brought to life.</p>
      </div>

      <div className="relative w-full overflow-hidden pb-4 lg:pb-6">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-20 lg:w-24"
          style={{ background: 'linear-gradient(to right, var(--background), transparent)' }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-20 lg:w-24"
          style={{ background: 'linear-gradient(to left, var(--background), transparent)' }}
        />
        {marqueeTrack.length > 0 && (
          <div
            className="flex items-center"
            style={{
              width: 'max-content',
              animation: 'reels-marquee-left 48s linear infinite',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running';
            }}
          >
            {marqueeTrack.map((reel, i) => (
              <ReelCard key={`reels-mq-${reel.id}-${i}`} reel={reel} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes reels-marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
};

export default Reels;
