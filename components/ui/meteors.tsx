"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const [meteorStyles, setMeteorStyles] = useState<Array<{
    delay: number;
    duration: number;
    leftPct: number;
    topPct: number;
  }>>([]);

  useEffect(() => {
    // Generate random values only on client side
    const styles = Array.from({ length: number || 24 }, () => ({
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 6,
      leftPct: Math.random() * 120 - 10,
      topPct: Math.random() * 80,
    }));
    setMeteorStyles(styles);
    setMounted(true);
  }, [number]);

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="relative w-full h-full"
    >
      {meteorStyles.map((style, idx) => {
        const { delay, duration, leftPct, topPct } = style;

        return (
          <div
            key={`meteor-${idx}`}
            className={cn("absolute overflow-visible pointer-events-none animate-meteor-effect", className)}
            style={{
              top: `${topPct}%`,
              left: `${leftPct}%`,
              transform: 'rotate(45deg)',
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            {/* leading dot */}
            <div
              style={{ width: 3, height: 3 }}
              className="rounded-full bg-cyan-300 dark:bg-orange-400 shadow-lg"
            />

            {/* trail */}
            <div
              style={{
                width: 30,
                height: 2,
                marginTop: -2,
                opacity: 0.95,
                transformOrigin: 'left center',
              }}
              className="bg-gradient-to-r from-cyan-300 dark:from-orange-500 to-transparent"
            />
          </div>
        );
      })}
    </motion.div>
  );
};
