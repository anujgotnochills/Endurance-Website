import { motion } from "framer-motion";
import { Mic2 } from "lucide-react";

export default function StudioServicesCard() {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative w-[300px] h-[400px] flex-shrink-0 mx-4"
    >
      <div className="absolute inset-0 bg-black rounded-[3rem] shadow-2xl border border-border/50 flex flex-col items-center justify-between p-10 text-center select-none overflow-hidden">
        {/* ENDURANCE Text */}
        <h2 className="text-[44px] font-black text-foreground leading-none tracking-tighter mb-4 uppercase">
          Endurance
        </h2>

        {/* Microphone Icon (Stylized like the user image) */}
        <div className="relative flex items-center justify-center py-6">
          <motion.div
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-foreground"
          >
            <Mic2 size={120} strokeWidth={1} />
          </motion.div>
          {/* Subtle Glow */}
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
        </div>

        {/* PRODUCTION Text */}
        <h2 className="text-[44px] font-black text-foreground leading-none tracking-tighter mt-4 uppercase">
          Production
        </h2>
        
        {/* Soft Shadow */}
        <div className="absolute bottom-6 w-32 h-2 bg-black/5 blur-md rounded-full" />
      </div>
    </motion.div>
  );
}
