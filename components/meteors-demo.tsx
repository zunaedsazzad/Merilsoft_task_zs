import React from "react";
import { Meteors } from "./ui/meteors";

export default function MeteorsDemo() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* blurred gradient background — full-bleed and not clipped */}
      <div className="absolute inset-0 bg-gradient-to-tl from-slate-200 from- via-sky-900 via- to-orange-900 to- dark:from-slate-950 dark:via-sky-950 dark:to-slate-950  opacity-10" />

      {/* meteors container — fill the parent so the animation aligns with the section size */}
      <div className="absolute inset-0 w-full h-full">
      <Meteors number={20} />
      </div>
    </div>
  );
}
