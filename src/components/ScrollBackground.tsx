import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

const BACKGROUND_SCENES = [
  {
    id: 'hero',
    image: '/assets/aistudio/IMG-20261104-WA0020_35405fe2.jpg'
  },
  {
    id: 'christos',
    image: '/assets/aistudio/IMG-20261104-WA0018_f94f4d70.jpg'
  },
  {
    id: 'havilah',
    image: '/assets/aistudio/IMG-20261104-WA0019_8697be16.jpg'
  },
  {
    id: 'landbanking',
    image: '/assets/aistudio/IMG-20261104-WA0026_8615404d.jpg'
  }
];

export const ScrollBackground: React.FC = () => {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  const [rawProgress, setRawProgress] = useState(0);

  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      setRawProgress(latest);
    });
  }, [smoothProgress]);

  const numScenes = BACKGROUND_SCENES.length;
  const segmentLength = 1 / numScenes;

  const targetMaxOpacity = theme === 'dark' ? 0.32 : 0.22;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {BACKGROUND_SCENES.map((scene, index) => {
        const start = index * segmentLength;
        const end = (index + 1) * segmentLength;

        let opacity = 0;
        let scale = 1.05;
        let yOffset = 0;

        if (index === 0) {
          if (rawProgress <= segmentLength) {
            opacity = 1;
            const segProg = rawProgress / segmentLength;
            scale = 1 + segProg * 0.08;
            yOffset = segProg * -20;
          } else if (rawProgress <= segmentLength * 1.3) {
            opacity = 1 - (rawProgress - segmentLength) / (segmentLength * 0.3);
            scale = 1.08;
            yOffset = -20;
          }
        } else {
          const fadeInStart = start - segmentLength * 0.3;
          const fadeOutEnd = end + segmentLength * 0.3;

          if (rawProgress >= fadeInStart && rawProgress <= fadeOutEnd) {
            if (rawProgress < start) {
              opacity = (rawProgress - fadeInStart) / (segmentLength * 0.3);
            } else if (rawProgress <= end) {
              opacity = 1;
            } else {
              opacity = 1 - (rawProgress - end) / (segmentLength * 0.3);
            }

            const localProgress = Math.min(Math.max((rawProgress - start) / segmentLength, 0), 1);
            scale = 1 + localProgress * 0.08;
            yOffset = localProgress * -25;
          }
        }

        return (
          <motion.div
            key={scene.id}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-out"
            style={{
              backgroundImage: `url('${scene.image}')`,
              opacity: Math.max(0, Math.min(1, opacity * targetMaxOpacity)),
              scale,
              y: yOffset,
              willChange: 'transform, opacity'
            }}
          />
        );
      })}

      {/* Adaptive Luxury Overlay Gradient */}
      {theme === 'dark' ? (
        <div className="absolute inset-0 bg-gradient-to-b from-[#000538]/85 via-[#00097C]/65 to-[#000538]/95 pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-white/85 to-slate-100/95 pointer-events-none" />
      )}

      {/* Adaptive Vignette */}
      {theme === 'dark' ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,9,124,0.3)_0%,rgba(0,5,56,0.85)_100%)] pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2)_0%,rgba(241,245,249,0.9)_100%)] pointer-events-none" />
      )}
    </div>
  );
};
