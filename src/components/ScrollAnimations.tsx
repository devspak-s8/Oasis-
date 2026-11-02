import React from 'react';
import { motion } from 'motion/react';

interface AnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const FadeIn: React.FC<AnimationProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SlideInLeft: React.FC<AnimationProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.75
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SlideInRight: React.FC<AnimationProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.75
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.12 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up';
}> = ({ children, className = '', direction = 'up' }) => {
  const xOffset = direction === 'left' ? -40 : direction === 'right' ? 40 : 0;
  const yOffset = direction === 'up' ? 30 : 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: xOffset, y: yOffset },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
