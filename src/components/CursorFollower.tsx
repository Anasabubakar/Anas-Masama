'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    }
    
    window.addEventListener('mousemove', updatePosition);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-cursor') {
          setCursorType(document.body.dataset.cursor || 'default');
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-300',
        'h-[10px] w-[10px]',
        'bg-green-400/50 shadow-[0_0_10px_#4ade80]',
        {
          'bg-white shadow-[0_0_15px_#ffffff]': cursorType === 'text',
          'animate-pulse-cursor': cursorType === 'image',
          'opacity-0': !isVisible,
          'opacity-100': isVisible,
        }
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        transition: 'transform 0.1s ease-out, background-color 0.3s ease, box-shadow 0.3s ease',
      }}
    />
  );
}
