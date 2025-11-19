"use client";

import React, { MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const displayedRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    targetRef.current.x = clientX - left;
    targetRef.current.y = clientY - top;
  }

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      displayedRef.current.x = lerp(displayedRef.current.x, targetRef.current.x, 0.18);
      displayedRef.current.y = lerp(displayedRef.current.y, targetRef.current.y, 0.18);

      const x = Math.round(displayedRef.current.x);
      const y = Math.round(displayedRef.current.y);

      const mask = `radial-gradient(${radius}px circle at ${x}px ${y}px, white, transparent 80%)`;
      overlay.style.maskImage = mask;
      // webkit prefix for Safari
      (overlay.style as any).webkitMaskImage = mask;
      overlay.style.backgroundColor = color;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [radius, color]);

  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{ backgroundColor: color, maskImage: `radial-gradient(${radius}px circle at 0px 0px, white, transparent 80%)` }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[[59, 130, 246], [139, 92, 246]]}
            dotSize={3}
          />
        )}
      </div>
      {children}
    </div>
  );
};
