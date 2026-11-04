import React from 'react';
import { motion } from 'motion/react';

interface FlungCardProps {
  index: number;
  children: React.ReactNode;
  className?: string;
  gridSpan?: string;
}

export const FlungCard: React.FC<FlungCardProps> = ({
  index,
  children,
  className = '',
  gridSpan = ''
}) => {
  // Alternating initial flung direction variants
  const initialVariants = [
    { x: -100, y: -40, rotate: -8, opacity: 0, scale: 0.9 },
    { x: 100, y: -50, rotate: 10, opacity: 0, scale: 0.9 },
    { x: -90, y: 50, rotate: -10, opacity: 0, scale: 0.9 },
    { x: 100, y: 40, rotate: 8, opacity: 0, scale: 0.9 }
  ];

  const idx = index % 4;
  const currentInitial = initialVariants[idx];

  return (
    <motion.div
      initial={currentInitial}
      whileInView={{
        x: 0,
        y: 0,
        rotate: 0, // settles completely straight
        opacity: 1,
        scale: 1
      }}
      viewport={{ once: true, amount: 0.1 }} // triggers once cleanly without re-triggering blinking on scroll up/down
      transition={{
        type: 'spring',
        stiffness: 110,
        damping: 18,
        mass: 0.9,
        delay: (index % 4) * 0.08
      }}
      whileHover={{
        scale: 1.02,
        rotate: 0,
        zIndex: 25,
        transition: { duration: 0.2 }
      }}
      className={`transform transition-all duration-300 ${gridSpan} ${className}`}
    >
      {children}
    </motion.div>
  );
};
