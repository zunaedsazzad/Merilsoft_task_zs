"use client";
import React, { useEffect, useRef, useState } from "react";

const IMAGES = [
  '/background.png',
  '/background-2.png',
  '/background-3.png',
];

export default function CarouselHero() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, 5000); // change every 5s
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative' }} className="h-[560px] lg:h-[720px]">
      {/* sliding track */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={trackRef}
          className="h-full flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)`, width: `${IMAGES.length * 100}%` }}
        >
          {IMAGES.map((src, i) => (
            <div
              key={i}
              className="h-full flex-shrink-0"
              style={{
                width: `${100 / IMAGES.length}%`,
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          ))}
        </div>
      </div>

      {/* dark overlay so white text remains readable */}
      <div style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} className="absolute inset-0" />

      {/* content */}
      <div className="container mx-auto px-6 lg:px-20 py-24 relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 h-full">
          <div className="text-left text-white">
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
              Driving Innovation with
              <br />
              Technology
            </h1>

            <div className="relative mt-4 w-full h-12">
              <div className="absolute inset-x-0 top-0 h-3">
                {/* keep sparkles area: leave empty, the SparklesCore is rendered by parent page if desired */}
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
            </div>

            <p className="mt-6 text-base sm:text-lg text-white/90 max-w-2xl">
              Harness the power of cutting-edge solutions to transform businesses, streamline operations, and unlock new opportunities.
            </p>

            <div className="mt-8 ml-5">
              {/* keep an empty slot for GlareCard or CTA if needed */}
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-3xl lg:max-w-none">
              <div aria-hidden="true" className="w-full h-64 lg:h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
