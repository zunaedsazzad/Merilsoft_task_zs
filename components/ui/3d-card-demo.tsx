"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

type ThreeDCardProps = {
  title?: string;
  description?: string;
  img?: string;
  bgClass?: string;
  alt?: string;
};

export default function ThreeDCardDemo({
  title = "Make things float in air",
  description = "Hover over this card to unleash the power of CSS perspective",
  img = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  bgClass = "bg-white",
  alt = "thumbnail",
}: ThreeDCardProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody
          className={`${bgClass} relative group/card hover:shadow-2xl hover:shadow-orange-500/[0.2] dark:hover:shadow-orange-500/[0.3] w-[18rem] sm:w-[20rem] h-21 rounded-xl p-4 pb-8 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
      >
        <CardItem translateZ="50" className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </CardItem>

        <CardItem as="p" translateZ="60" className="text-gray-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {description}
        </CardItem>

        <CardItem translateZ="100" className="w-full mt-3">
          <img src={img} height={1000} width={1000} className="h-56 sm:h-74 w-full object-cover rounded-xl group-hover/card:shadow-xl" alt={alt} />
        </CardItem>

        <div className="flex justify-between items-center mt-4">
          <CardItem
            translateZ={30}
            as="a"
            href="#experts"
            className="relative group px-4 py-2 rounded-xl text-xs font-semibold text-white bg-orange-500/90 hover:bg-orange-600/80   hover:shadow-lg transition-all duration-300 hover:scale-[1.05] focus:outline-none focus:ring-2 focus:ring-sky-600/50"
          >
            <span className="flex items-center gap-1">
              Connect with our experts
              <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
            {/* subtle animated sheen */}
            <span className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
              <span className="absolute -inset-[30%] bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-60 translate-x-[-60%] group-hover:translate-x-[40%] transition-all duration-700 ease-out rotate-12" />
            </span>
          </CardItem>
          <CardItem translateZ={20} as="a" href="#experts" className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-xs font-bold transition-colors">
            Get Yours
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
 
