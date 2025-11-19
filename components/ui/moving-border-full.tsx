// @ts-nocheck
"use client";
import React from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string | number;
  ry?: string | number;
  [key: string]: any;
}) => {
  // Lightweight fallback implementation that animates a small element across the top edge
  // to approximate a moving border. This avoids depending on Motion One hooks which may
  // not be exported in the current environment.
  const svgRef = useRef<SVGRectElement | null>(null);

  const animName = `mb_move_${String(duration).replace(/\D/g,'')}`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full pointer-events-none"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={svgRef}
        />
      </svg>

      <div style={{ position: "absolute", inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '8px', left: 0, right: 0, height: 0 }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: 'translateX(-10%)',
              animation: `${animName} ${duration}ms linear infinite`,
            }}
          >
            {children}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ${animName} {
          0% { transform: translateX(-10%); }
          100% { transform: translateX(110%); }
        }
      `}</style>
    </>
  );
};
