import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface GalleryCardProps {
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  color: string;
}

export default function GalleryCard({ title, subtitle, Icon, color }: GalleryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative w-[300px] h-[400px] flex-shrink-0 mx-4"
    >
      {/* Background Card */}
      <div className="absolute inset-0 bg-black rounded-[3rem] shadow-2xl border border-border/50 overflow-hidden">
        {/* Decorative Circles */}
        <div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: color }}
        />
        <div 
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: color }}
        />

        {/* Content Container */}
        <div className="relative h-full flex flex-col items-center justify-between p-10 text-center">
          <div className="w-full">
            <p className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4 opacity-70">
              Studio Service
            </p>
            <h3 className="text-2xl font-black text-foreground leading-tight px-4">
              {title}
            </h3>
          </div>

          {/* 3D-ish Icon Container */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 shadow-xl flex items-center justify-center border border-white/50"
            >
              <Icon size={56} strokeWidth={1.5} style={{ color }} />
            </motion.div>
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none rounded-[2.5rem]" />
            
            {/* Soft Shadow */}
            <div className="absolute -bottom-4 w-20 h-4 bg-black/5 blur-xl rounded-full" />
          </div>

          <div className="w-full">
            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
              {subtitle}
            </p>
            <div className="mt-6 flex items-center justify-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div className="w-8 h-1 rounded-full bg-primary/20" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
