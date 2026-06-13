"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const text = typeof children === 'string' ? children : '';
  const chars = text.split('');

  return (
    <h2 ref={containerRef} className={`my-5 overflow-hidden ${containerClassName}`}>
      <span className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}>
        {chars.map((char, index) => {
          // Calculate stagger offset
          const start = index * stagger;
          const end = Math.min(start + 0.35, 1);
          
          const y = useTransform(scrollYProgress, [start, end], [80, 0]);
          const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
          const scaleY = useTransform(scrollYProgress, [start, end], [2.1, 1]);
          const scaleX = useTransform(scrollYProgress, [start, end], [0.85, 1]);

          return (
            <motion.span
              className="inline-block"
              style={{
                y,
                opacity,
                scaleY,
                scaleX,
                transformOrigin: '50% 0%',
                whiteSpace: 'pre',
                display: 'inline-block'
              }}
              key={index}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          );
        })}
      </span>
    </h2>
  );
};

export default ScrollFloat;
