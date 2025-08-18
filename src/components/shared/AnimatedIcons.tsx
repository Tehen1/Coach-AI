
"use client";
import { motion } from 'framer-motion';

export const AnimatedFire = ({ size = 24, color = "#f59e0b" }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    animate={{ 
      scale: [1, 1.1, 1], 
      rotateZ: [-2, 2, -2] 
    }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.3-.11.59-.23.87-.36a9.97 9.97 0 0 0 5.1-6.64c.4-1.07.62-2.22.62-3.4 0-5.52-4.48-10-10-10z"
      fill={color}
      animate={{ 
        opacity: [0.7, 1, 0.7],
        scale: [0.95, 1.05, 0.95]
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M12 6c-1.1 0-2 .9-2 2 0 1.1.9 2 2 2s2-.9 2-2c0-1.1-.9-2-2-2z"
      fill="#ffffff"
      animate={{ scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />
  </motion.svg>
);

export const AnimatedHeart = ({ size = 24, color = "#ef4444" }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={color}
    />
  </motion.svg>
);

export const AnimatedDumbbell = ({ size = 24, color = "#3b82f6" }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    animate={{ rotateZ: [0, 10, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.rect
      x="2" y="9" width="4" height="6" rx="2"
      fill={color}
    />
    <motion.rect
      x="18" y="9" width="4" height="6" rx="2"
      fill={color}
    />
    <motion.rect
      x="6" y="11" width="12" height="2"
      fill={color}
    />
  </motion.svg>
);

export const AnimatedApple = ({ size = 24, color = "#22c55e" }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    animate={{ 
      rotateZ: [-5, 5, -5],
      scale: [1, 1.02, 1]
    }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.path
      d="M12 3c0-1.1.9-2 2-2s2 .9 2 2c0 .4-.1.7-.3 1 .8.2 1.5.7 1.9 1.4.4.7.4 1.6 0 2.3-.4.7-1.1 1.2-1.9 1.4.2.3.3.6.3 1v8c0 2.2-1.8 4-4 4s-4-1.8-4-4V9c0-.4.1-.7.3-1-.8-.2-1.5-.7-1.9-1.4-.4-.7-.4-1.6 0-2.3.4-.7 1.1-1.2 1.9-1.4-.2-.3-.3-.6-.3-1z"
      fill={color}
    />
  </motion.svg>
);

export const AnimatedBrain = ({ size = 24, color = "#8b5cf6" }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.path
      d="M12 2C8.69 2 6 4.69 6 8c0 .55.08 1.08.23 1.57C5.48 10.24 5 11.08 5 12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2 0-.92-.48-1.76-1.23-2.43C17.92 9.08 18 8.55 18 8c0-3.31-2.69-6-6-6z"
      fill={color}
    />
  </motion.svg>
);

export const AnimatedClock = ({ size = 24, color = "#3b82f6" }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
  >
    <motion.circle
      cx="12" cy="12" r="10"
      stroke={color}
      strokeWidth="2"
      fill="none"
      animate={{ rotateZ: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
    <motion.path
      d="M12 6l0 6l4 0"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotateZ: [0, 360] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "12px 12px" }}
    />
  </motion.svg>
);

export const AnimatedTrophy = ({ size = 24, color = "#fbbf24" }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    animate={{ 
      rotateY: [0, 360],
    }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.path
      d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H19C20.1 4 21 4.9 21 6V8C21 10.55 19.92 12.63 18.39 13.78C17.73 14.22 16.87 14.5 16 14.5H15.5V16H17C18.1 16 19 16.9 19 18V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V18C5 16.9 5.9 16 7 16H8.5V14.5H8C7.13 14.5 6.27 14.22 5.61 13.78C4.08 12.63 3 10.55 3 8V6C3 4.9 3.9 4 5 4H7Z"
      fill={color}
    />
  </motion.svg>
);
