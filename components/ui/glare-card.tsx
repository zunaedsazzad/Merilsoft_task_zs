"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const GlareCard = ({
  className,
  children,
  rotateDepth = 12,
  translateDepth = 12,
}: {
  className?: string;
  children: React.ReactNode;
  rotateDepth?: number;
  translateDepth?: number;
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Use pointer events on the outer wrapper so child elements (buttons etc.) don't block
  // hover/tilt calculations when they call stopPropagation or have their own listeners.
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    setPos({ x: xPct, y: yPct });
  };

  const handlePointerLeave = () => setPos({ x: 0, y: 0 });

  const rotateX = `${-pos.y * rotateDepth}deg`;
  const rotateY = `${pos.x * rotateDepth}deg`;
  const translateX = `${-pos.x * translateDepth}px`;
  const translateY = `${pos.y * translateDepth}px`;

  const glareX = `${(pos.x + 0.5) * 100}%`;
  const glareY = `${(pos.y + 0.5) * 100}%`;
  const glareBackground = `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.9) 10%, rgba(255,255,255,0.75) 20%, rgba(255,255,255,0) 80%)`;

  return (
    <div
      ref={wrapperRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("perspective-distant transform-3d", className)}
    >
      <div
        style={{
          transform: `perspective(900px) rotateX(${rotateX}) rotateY(${rotateY}) translate3d(${translateX}, ${translateY}, 0)`,
          transition: "transform 180ms ease",
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-[16px]"
      >
        {children}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-[16px] mix-blend-overlay"
          style={{ background: glareBackground, opacity: 0.6 }}
        />
      </div>
    </div>
  );
};

export default GlareCard;
