import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  // Position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smoothness
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  // Slightly delayed orbit spring
  const orbitX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const orbitY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      mouseX.set(mousePos.current.x);
      mouseY.set(mousePos.current.y);
      ticking = false;
    };

    const moveCursor = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
      
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleHover = (e) => {
      const target = e.target;
      const isClickable = target.closest('a, button, [role="button"], .interactive');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleHover, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, mouseX, mouseY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
      />
      <motion.div
        className="cursor-orbit"
        style={{
          x: orbitX,
          y: orbitY,
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 0.6 : 0
        }}
      />
    </>
  );
};

export default CustomCursor;
