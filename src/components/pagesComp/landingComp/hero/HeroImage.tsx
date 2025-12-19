import React from "react";
import type { HeroImageProps } from "@/types";

const HeroImage = ({ src, alt }: HeroImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-40 sm:w-60 md:w-full max-w-sm mx-auto mb-1"
    />
  );
};

export default HeroImage;
