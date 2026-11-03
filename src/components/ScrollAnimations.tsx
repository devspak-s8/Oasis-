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

export const DropLanding: React.FC<AnimationProps> = ({
  children,
  className = '',
  delay = 0.1,
  duration = 0.85
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -45, scale: 1.04 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const WakeUpCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93, y: 28 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 22,
        delay
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.99 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const TypewriterText: React.FC<{
  phrases: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  prefix?: string;
}> = ({
  phrases,
  typingSpeed = 65,
  pauseDuration = 2200,
  className = '',
  prefix = ''
}) => {
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const fullText = phrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && currentText.length < fullText.length) {
      timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && currentText.length === fullText.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && currentText.length > 0) {
      timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length - 1));
      }, typingSpeed / 2);
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, phrases, typingSpeed, pauseDuration]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      {prefix && <span>{prefix}&nbsp;</span>}
      <span>{currentText}</span>
      <span className="inline-block w-[2px] h-[1em] ml-1 bg-[#C8A45D] animate-pulse align-middle" />
    </span>
  );
};
