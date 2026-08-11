import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  /** Kept for call-site compatibility; distance is now minimal by design. */
  direction?: "up" | "down" | "left" | "right";
}

/**
 * Console output does not slide in from below. This used to translate
 * elements 75px, which read as design-portfolio motion; it now fades
 * with only a hairline of movement so sections resolve like a screen
 * painting rather than a carousel.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  width = "fit-content",
  delay = 0.1,
  direction = "up"
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const getVariants = (): { hidden: Variant; visible: Variant } => {
    const d = 8;
    switch (direction) {
      case "down": return { hidden: { opacity: 0, y: -d }, visible: { opacity: 1, y: 0 } };
      case "left": return { hidden: { opacity: 0, x: -d }, visible: { opacity: 1, x: 0 } };
      case "right": return { hidden: { opacity: 0, x: d }, visible: { opacity: 1, x: 0 } };
      case "up":
      default:
        return { hidden: { opacity: 0, y: d }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <div ref={ref} style={{ position: "relative", width }}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.35, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
