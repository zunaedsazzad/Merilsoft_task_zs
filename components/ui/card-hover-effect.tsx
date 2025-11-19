import { cn } from "@/lib/utils";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon?: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 py-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={`${item?.link}-${idx}`}
          className="relative group block p-1 w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-orange-400 dark:bg-gradient-to-tl from-orange-500 from- via-slate-700 via- to-sky-900 to- block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.icon && (
              <div className="mb-3 flex items-center justify-center w-14 h-14 rounded-lg bg-white/90 p-2">
                <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
              </div>
            )}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl w-full overflow-hidden bg-gray-800 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 h-48 md:h-52 flex flex-col justify-center",
        className
      )}
    >
      <div className="relative z-50 w-full px-4 py-3">
        {children}
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-semibold tracking-wide mt-0 text-lg truncate", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-zinc-400 tracking-wide leading-tight text-sm max-h-14 overflow-hidden",
        className
      )}
    >
      {children}
    </p>
  );
};
