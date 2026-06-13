"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const SplitText = ({
  text = '',
  className = '',
  delay = 50,
  duration = 0.5,
  ease = [0.25, 0.1, 0.25, 1],
  splitType = 'chars', // 'chars' or 'words'
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: rootMargin
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
  }, [isInView]);

  // Split text into words or characters
  const items = splitType === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      }
    }
  };

  const itemVariants = {
    hidden: from,
    visible: {
      ...to,
      transition: {
        duration: duration,
        ease: ease,
      }
    }
  };

  const Tag = tag || 'p';

  return (
    <Tag
      ref={ref}
      style={{ textAlign, display: 'inline-block', wordWrap: 'break-word' }}
      className={`split-parent overflow-hidden whitespace-normal ${className}`}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        className="inline-block"
      >
        {items.map((item, idx) => {
          return (
            <motion.span
              key={idx}
              variants={itemVariants}
              className="inline-block"
              style={{ whiteSpace: 'pre' }}
              onAnimationComplete={
                idx === items.length - 1 ? onLetterAnimationComplete : undefined
              }
            >
              {item === '' && splitType === 'chars' ? '\u00A0' : item}
              {splitType === 'words' && idx < items.length - 1 ? ' ' : ''}
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
};

export default SplitText;
