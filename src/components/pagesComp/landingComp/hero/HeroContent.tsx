import React from "react";
import type { HeroContentProps } from "@/types";

const HeroContent = ({ title, subtitle }: HeroContentProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1
        className="
          text-xl sm:text-2xl md:text-3xl font-bold
          bg-linear-to-r from-pink-300  to-pink-500
          bg-clip-text text-transparent
          text-center md:text-left
        "
      >
        {title}
      </h1>

      <p
        className="
          text-text-muted mt-2
          text-sm sm:text-base md:text-lg
          text-center md:text-left
        "
      >
        {subtitle}
      </p>
    </div>
  );
};

export default HeroContent;
