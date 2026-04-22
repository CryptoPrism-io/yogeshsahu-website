import type { Variants } from "framer-motion";

export const MOTION_EASE_STANDARD: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const MOTION_EASE_QUICK: [number, number, number, number] = [0.25, 0.9, 0.3, 1];

export const MOTION_DURATION = {
  quick: 0.18,
  base: 0.28,
  slow: 0.44,
} as const;

export const fadeUp = (delay = 0, distance = 16): Variants => ({
  initial: { opacity: 0, y: distance },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.base,
      delay,
      ease: MOTION_EASE_STANDARD,
    },
  },
});
