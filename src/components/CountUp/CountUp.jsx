"use client";

import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });

  const getDecimalPlaces = num => {
    const str = num.toString();

    if (str.includes('.')) {
      const decimals = str.split('.')[1];

      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }

    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    latest => {
      const hasDecimals = maxDecimals > 0;

      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      };

      const formatter = new Intl.NumberFormat('en-US', options);

      let formatted = formatter.format(parseFloat(latest.toFixed(maxDecimals)));

      if (separator) {
        formatted = formatted.replace(/,/g, separator);
      }

      return formatted;
    },
    [separator, maxDecimals]
  );

  useEffect(() => {
    if (isInView && startWhen) {
      if (onStart) onStart();

      const timeout = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);

      const unsub = springValue.on('change', latest => {
        if (ref.current) {
          ref.current.textContent = formatValue(latest);
        }
      });

      return () => {
        clearTimeout(timeout);
        unsub();
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, springValue, formatValue, onStart]);

  useEffect(() => {
    const unsub = springValue.on('change', latest => {
      const target = direction === 'down' ? from : to;

      if (direction === 'down' && latest <= target + 0.01) {
        if (onEnd) onEnd();
        unsub();
      } else if (direction !== 'down' && latest >= target - 0.01) {
        if (onEnd) onEnd();
        unsub();
      }
    });

    return () => unsub();
  }, [springValue, direction, from, to, onEnd]);

  return (
    <span className={className} ref={ref}>
      {formatValue(direction === 'down' ? to : from)}
    </span>
  );
}
