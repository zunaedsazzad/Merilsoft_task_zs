import React from "react";
import { BackgroundLines } from "./ui/background-lines";
import CardHoverEffectDemo from "@/components/card-hover-effect-demo";

export default function BackgroundLinesDemo() {
  const logos = [
    '/bkash.png',
    '/bnglink.jpg',
    '/bracu.png',
    '/ripple.png',
    '/uniliver.png',
    '/foodpanda.png',
    '/std_chart.png'
  ];
  return (
    <>
      <BackgroundLines className="flex items-center justify-start w-full flex-col px-4  md:pt-0">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-xl md:text-4xl lg:text-7xl font-sans py-1 md:py-10 relative z-20 font-bold tracking-tight">
        Our Products
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Get the best advices from our experts, including expert developer,
        security expert, blockchain specialist, in one place
      </p>

      {/* Marquee image row: duplicate the list for seamless loop */}
      <div className="w-full mt-10 relative z-10">
        <div
          className="overflow-hidden w-full px-6 md:px-30"
        >
          <div className="marquee-track flex gap-8 items-center will-change-transform" style={{ animation: 'marquee 30s linear infinite' }}>
            {logos.concat(logos).map((src, idx) => (
              <div key={`img-${idx}`} className="flex-shrink-0">
                <img src={src} alt={`product-${idx}`} className="w-40 h-24 object-cover rounded-lg shadow-md" />
              </div>
            ))}
          </div>

            <style>{`
            .marquee-track { width: max-content; }
            /* decrease image width/height */
            .marquee-track img { width: 120px; height: 64px; object-fit: cover; }
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            `}</style>
        </div>
      </div>
      </BackgroundLines>

      {/* Company highlights placed directly after the marquee for tighter layout */}
      <div className="w-full -mt-8 md:-mt-80 relative z-20">
        <div className="container  mx-auto px-6 lg:px-12">
          <CardHoverEffectDemo />
        </div>
      </div>
    </>
  );
}
