"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  stagger = 0.05
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const text = typeof children === 'string' ? children : '';
  const words = text.split(/(\s+)/);

  // Rotate container as it scrolls in
  const rotate = useTransform(scrollYProgress, [0, 0.45], [baseRotation, 0]);

  return (
    <motion.h2
      ref={containerRef}
      style={{ rotate, transformOrigin: '0% 50%' }}
      className={`my-5 ${containerClassName}`}
    >
      <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}>
        {words.map((word, index) => {
          if (word.match(/^\s+$/)) return word;

          const start = index * stagger;
          const end = Math.min(start + 0.25, 1);

          const opacity = useTransform(scrollYProgress, [start, end], [baseOpacity, 1]);
          const blurValue = useTransform(scrollYProgress, [start, end], [blurStrength, 0]);
          const filter = enableBlur ? useTransform(blurValue, (v) => `blur(${v}px)`) : 'none';

          return (
            <motion.span
              className="inline-block"
              style={{ opacity, filter, display: 'inline-block' }}
              key={index}
            >
              {word}
            </motion.span>
          );
        })}
      </p>
    </motion.h2>
  );
};

export default ScrollReveal;
