
import type { ExerciseId } from "@/lib/types";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";

const illustrations: Record<string, JSX.Element> = {
  pilates_hundred: (
    <svg viewBox="0 0 200 100" className="w-full h-32">
      <style>{`
        .body { fill: #a78bfa; }
        .limb { fill: #c4b5fd; stroke: #8b5cf6; stroke-width: 1; }
        .movement { animation: pump 1s ease-in-out infinite; }
        @keyframes pump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
      <ellipse cx="100" cy="60" rx="40" ry="15" className="body" />
      <circle cx="100" cy="30" r="12" className="body" />
      <g className="movement">
        <rect x="60" y="45" width="25" height="4" rx="2" className="limb" />
        <rect x="115" y="45" width="25" height="4" rx="2" className="limb" />
      </g>
      <rect x="85" y="70" width="8" height="20" rx="4" className="limb" />
      <rect x="107" y="70" width="8" height="20" rx="4" className="limb" />
      <rect x="80" y="85" width="18" height="6" rx="3" className="limb" />
      <rect x="102" y="85" width="18" height="6" rx="3" className="limb" />
    </svg>
  ),
  pilates_teaser: (
    <svg viewBox="0 0 200 100" className="w-full h-32">
      <style>{`
        .body { fill: #fb923c; }
        .limb { fill: #fdba74; stroke: #f97316; stroke-width: 1; }
        .balance { animation: sway 4s ease-in-out infinite; }
        @keyframes sway {
            0%, 100% { transform: rotate(0deg) translateX(0); }
            25% { transform: rotate(1deg) translateX(1px); }
            75% { transform: rotate(-1deg) translateX(-1px); }
        }
      `}</style>
      <g className="balance" transform-origin="100px 65px">
        <path d="M75 60 Q100 40 125 60" fill="none" stroke="#fb923c" strokeWidth="12" strokeLinecap="round"/>
        <path d="M100 60 L120 90" fill="none" stroke="#fb923c" strokeWidth="12" strokeLinecap="round"/>
        <path d="M100 60 L80 90" fill="none" stroke="#fb923c" strokeWidth="12" strokeLinecap="round"/>
      </g>
    </svg>
  ),
  pilates_roll_up: (
    <svg viewBox="0 0 200 100" className="w-full h-32">
      <style>{`
        .body { fill: #ec4899; }
        .limb { fill: #f472b6; stroke: #ec4899; stroke-width: 1; }
        .roll { animation: roll-up-down 4s ease-in-out infinite; }
        @keyframes roll-up-down {
          0%, 100% { transform: scaleY(0.2) translateY(30px); opacity: 0.8; }
          50% { transform: scaleY(1) translateY(0); opacity: 1; }
        }
      `}</style>
      <g className="roll" transform-origin="100px 60px">
        <path d="M 80 60 Q 100 35 120 60" fill="none" stroke="#ec4899" strokeWidth="15" strokeLinecap="round" />
        <circle cx="100" cy="28" r="10" className="body" />
      </g>
    </svg>
  ),
};

const ExerciseIllustration = ({ exerciseId }: { exerciseId: ExerciseId | string }) => {
  const illustration = illustrations[exerciseId];

  if (!illustration) {
    return (
      <div className="w-full h-32 flex flex-col items-center justify-center bg-black/20 rounded-md text-white/50">
        <ImageOff className="size-8 mb-2" />
        <p className="text-xs">Illustration non disponible</p>
      </div>
    );
  }

  return (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
      {illustration}
    </motion.div>
  );
};

export default ExerciseIllustration;
