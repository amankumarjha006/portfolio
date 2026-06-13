"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const cardData = [
  {
    color: '#120F17',
    title: 'Analytics',
    description: 'Track user behavior',
    label: 'Insights'
  },
  {
    color: '#120F17',
    title: 'Dashboard',
    description: 'Centralized data view',
    label: 'Overview'
  },
  {
    color: '#120F17',
    title: 'Collaboration',
    description: 'Work together seamlessly',
    label: 'Teamwork'
  },
  {
    color: '#120F17',
    title: 'Automation',
    description: 'Streamline workflows',
    label: 'Efficiency'
  },
  {
    color: '#120F17',
    title: 'Integration',
    description: 'Connect favorite tools',
    label: 'Connectivity'
  },
  {
    color: '#120F17',
    title: 'Security',
    description: 'Enterprise-grade protection',
    label: 'Protection'
  }
];

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// React-based particle component
const FloatingParticle = ({ glowColor }) => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = 2 + Math.random() * 2;
  const delay = Math.random() * 1.5;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.4, 1, 0],
        scale: [0, 1.2, 1, 0.6, 0],
        x: [`${x}%`, `${x + (Math.random() - 0.5) * 15}%`],
        y: [`${y}%`, `${y + (Math.random() - 0.5) * 15}%`],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute w-1 h-1 rounded-full pointer-events-none z-10"
      style={{
        backgroundColor: `rgba(${glowColor}, 1)`,
        boxShadow: `0 0 6px rgba(${glowColor}, 0.8)`
      }}
    />
  );
};

const ParticleCard = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Motion values for tilt and magnetism
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const translateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const translateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });

  const handleMouseMove = e => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;
    const rect = element.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    if (enableTilt) {
      const rx = ((yPos - centerY) / centerY) * -10;
      const ry = ((xPos - centerX) / centerX) * 10;
      rotateX.set(rx);
      rotateY.set(ry);
    }

    if (enableMagnetism) {
      const mx = (xPos - centerX) * 0.05;
      const my = (yPos - centerY) * 0.05;
      translateX.set(mx);
      translateY.set(my);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    translateX.set(0);
    translateY.set(0);
  };

  const handleClick = e => {
    if (!clickEffect || !cardRef.current) return;
    const element = cardRef.current;
    const rect = element.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    const maxDistance = Math.max(
      Math.hypot(xPos, yPos),
      Math.hypot(xPos - rect.width, yPos),
      Math.hypot(xPos, yPos - rect.height),
      Math.hypot(xPos - rect.width, yPos - rect.height)
    );

    const newRipple = {
      id: Date.now() + Math.random(),
      x: xPos,
      y: yPos,
      size: maxDistance * 2
    };

    setRipples(prev => [...prev, newRipple]);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{
        ...style,
        perspective: 1000,
        rotateX: disableAnimations ? 0 : rotateX,
        rotateY: disableAnimations ? 0 : rotateY,
        x: disableAnimations ? 0 : translateX,
        y: disableAnimations ? 0 : translateY,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Click Ripple Rendering */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => {
              setRipples(prev => prev.filter(r => r.id !== ripple.id));
            }}
            style={{
              position: 'absolute',
              width: ripple.size,
              height: ripple.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%)`,
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              pointerEvents: 'none',
              zIndex: 10
            }}
          />
        ))}
      </AnimatePresence>

      {/* Floating Particles on Hover */}
      {isHovered && !disableAnimations && (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10">
          {Array.from({ length: particleCount }).map((_, idx) => (
            <FloatingParticle key={idx} glowColor={glowColor} />
          ))}
        </div>
      )}

      {children}
    </motion.div>
  );
};

const MagicBento = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [spotlightOpacity, setSpotlightOpacity] = useState(0);

  // Spotlight and glow effect handler
  const handleGlobalMouseMove = useCallback(e => {
    if (shouldDisableAnimations || !gridRef.current || !enableSpotlight) return;

    const grid = gridRef.current;
    const bentoSection = grid.closest('.bento-section');
    const rect = bentoSection?.getBoundingClientRect();

    if (!rect) return;

    const mouseInside =
      e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

    if (!mouseInside) {
      setSpotlightOpacity(0);
      grid.querySelectorAll('.card').forEach(card => {
        card.style.setProperty('--glow-intensity', '0');
      });
      return;
    }

    setSpotlightPos({ x: e.clientX, y: e.clientY });
    setSpotlightOpacity(0.8);

    const cards = grid.querySelectorAll('.card');
    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
      const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;

      card.style.setProperty('--glow-x', `${relativeX}%`);
      card.style.setProperty('--glow-y', `${relativeY}%`);
      card.style.setProperty('--glow-intensity', '1');
      card.style.setProperty('--glow-radius', `${spotlightRadius}px`);
    });
  }, [shouldDisableAnimations, enableSpotlight, spotlightRadius]);

  const handleGlobalMouseLeave = useCallback(() => {
    setSpotlightOpacity(0);
    gridRef.current?.querySelectorAll('.card').forEach(card => {
      card.style.setProperty('--glow-intensity', '0');
    });
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseleave', handleGlobalMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseleave', handleGlobalMouseLeave);
    };
  }, [handleGlobalMouseMove, handleGlobalMouseLeave]);

  return (
    <>
      <style>
        {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: #2F293A;
            --background-dark: #120F17;
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(132, 0, 255, 1);
            --purple-glow: rgba(132, 0, 255, 0.2);
            --purple-border: rgba(132, 0, 255, 0.8);
          }
          
          .card-responsive {
            grid-template-columns: 1fr;
            width: 100%;
            margin: 0 auto;
            padding: 0.5rem;
          }
          
          @media (min-width: 600px) {
            .card-responsive {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .card-responsive {
              grid-template-columns: repeat(4, 1fr);
            }
            
            .card-responsive .card:nth-child(3) {
              grid-column: span 2;
              grid-row: span 2;
            }
            
            .card-responsive .card:nth-child(4) {
              grid-column: 1 / span 2;
              grid-row: 2 / span 2;
            }
            
            .card-responsive .card:nth-child(6) {
              grid-column: 4;
              grid-row: 3;
            }
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${glowColor}, 0.2);
          }
          
          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}
      </style>

      {enableSpotlight && !shouldDisableAnimations && (
        <div
          className="global-spotlight"
          style={{
            position: 'fixed',
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            pointerEvents: 'none',
            background: `radial-gradient(circle,
              rgba(${glowColor}, 0.12) 0%,
              rgba(${glowColor}, 0.06) 15%,
              rgba(${glowColor}, 0.03) 25%,
              rgba(${glowColor}, 0.01) 40%,
              transparent 70%
            )`,
            zIndex: 200,
            opacity: spotlightOpacity,
            left: spotlightPos.x,
            top: spotlightPos.y,
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'screen',
            transition: 'opacity 0.2s ease-out'
          }}
        />
      )}

      <div
        className="bento-section grid gap-2 p-3 w-full select-none relative"
        style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}
        ref={gridRef}
      >
        <div className="card-responsive grid gap-2">
          {cardData.map((card, index) => {
            const baseClassName = `card flex flex-col justify-between relative aspect-[4/3] min-h-[200px] w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] ${
              enableBorderGlow ? 'card--border-glow' : ''
            }`;

            const cardStyle = {
              backgroundColor: card.color || 'var(--background-dark)',
              borderColor: 'var(--border-color)',
              color: 'var(--white)',
              '--glow-x': '50%',
              '--glow-y': '50%',
              '--glow-intensity': '0',
              '--glow-radius': '200px'
            };

            return (
              <ParticleCard
                key={index}
                className={baseClassName}
                style={cardStyle}
                disableAnimations={shouldDisableAnimations}
                particleCount={enableStars ? particleCount : 0}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
              >
                <div className="card__header flex justify-between gap-3 relative text-white">
                  <span className="card__label text-base">{card.label}</span>
                </div>
                <div className="card__content flex flex-col relative text-white">
                  <h3 className={`card__title font-normal text-base m-0 mb-1 ${textAutoHide ? 'text-clamp-1' : ''}`}>
                    {card.title}
                  </h3>
                  <p className={`card__description text-xs leading-5 opacity-90 ${textAutoHide ? 'text-clamp-2' : ''}`}>
                    {card.description}
                  </p>
                </div>
              </ParticleCard>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MagicBento;
