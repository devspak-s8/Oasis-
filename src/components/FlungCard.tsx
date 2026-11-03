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
    { x: -140, y: -60, rotate: -16, opacity: 0, scale: 0.82 },
    { x: 140, y: -80, rotate: 18, opacity: 0, scale: 0.82 },
    { x: -130, y: 80, rotate: -18, opacity: 0, scale: 0.82 },
    { x: 140, y: 70, rotate: 16, opacity: 0, scale: 0.82 }
  ];

  const settledRotations = [-2, 2.5, -2.5, 2];
  const idx = index % 4;
  const currentInitial = initialVariants[idx];
  const currentRotation = settledRotations[idx];

  return (
    <motion.div
      initial={currentInitial}
      whileInView={{
        x: 0,
        y: 0,
        rotate: currentRotation,
        opacity: 1,
        scale: 1
      }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        type: 'spring',
        stiffness: 130,
        damping: 14,
        mass: 0.85,
        delay: (index % 4) * 0.11
      }}
      whileHover={{
        scale: 1.03,
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
