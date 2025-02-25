import { useState, useCallback, useRef, useEffect } from 'react';

interface HoverEffectOptions {
  scale?: number;
  duration?: number;
  delay?: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export function useHoverEffect({
  scale = 1.05,
  duration = 200,
  delay = 0,
  onHoverStart,
  onHoverEnd,
}: HoverEffectOptions = {}) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (delay) {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(true);
        onHoverStart?.();
      }, delay);
    } else {
      setIsHovered(true);
      onHoverStart?.();
    }
  }, [delay, onHoverStart]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(false);
    onHoverEnd?.();
  }, [onHoverEnd]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const style = {
    transform: isHovered ? `scale(${scale})` : 'scale(1)',
    transition: `transform ${duration}ms ease-in-out`,
  };

  const hoverProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style,
  };

  return {
    isHovered,
    hoverProps,
    style,
  };
}

interface UseParallaxOptions {
  intensity?: number;
  perspective?: number;
}

export function useParallaxEffect({
  intensity = 15,
  perspective = 1000,
}: UseParallaxOptions = {}) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * intensity;
      const rotateX = ((centerY - y) / centerY) * intensity;

      setRotation({ x: rotateX, y: rotateY });
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const style = {
    transform: `perspective(${perspective}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    transition: 'transform 0.1s ease-out',
  };

  return {
    elementRef,
    style,
    rotation,
  };
}
