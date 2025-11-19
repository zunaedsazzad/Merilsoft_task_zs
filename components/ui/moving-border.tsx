"use client";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  borderRadius?: string;
  className?: string;
};

export const Button = ({ borderRadius = "1rem", className = "", children, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`relative inline-flex items-center justify-center p-0 rounded-[var(--br)] ${className}`}
      style={{ ['--br' as any]: borderRadius }}
    >
      {/* gradient border layer (visible without CSS masks) */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-[var(--br)] z-0"
        style={{
          background: 'linear-gradient(90deg,#06b6d4,#f97316,#d66200)',
          backgroundSize: '200% 100%',
          animation: 'ac-move 3s linear infinite',
          // leave inner area free by using an inner element with margin
        }}
      />

      {/* content area slightly inset so outer gradient shows as a border */}
      <span
        className="relative inline-flex items-center justify-center z-10 bg-white dark:bg-slate-900 text-black dark:text-white"
        style={{ margin: '4px', padding: '0.5rem 1.25rem', borderRadius: `calc(${borderRadius} - 4px)`, border: '1px solid rgba(0,0,0,0.06)' }}
      >
        {children}
      </span>

      <style>{`
        @keyframes ac-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </button>
  );
};

export default Button;
