import React from "react";
import HeroSvg from "@/assets/hero.svg";
import AdminHeroSvg from "@/assets/adminHero.svg";
import { HERO } from "@/utils/constants/contants";
import HeroImage from "@/components/pagesComp/landingComp/hero/HeroImage";
import HeroLayout from "@/components/pagesComp/landingComp/hero/HeroLayout";
import HeroContent from "@/components/pagesComp/landingComp/hero/HeroContent";
import type { HeroProps } from "@/types";

const Hero = ({ rightSlot, variant }: HeroProps) => {

  const imageSrc = variant === "admin" ? AdminHeroSvg : HeroSvg;

  return (
    <HeroLayout>
      <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
        <HeroImage src={imageSrc} alt={HERO.ALT_TEXT} />
        <HeroContent title={HERO.TITLE} subtitle={HERO.SUBTITLE} />
      </div>

      {/* Right Side*/}
      {rightSlot && (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md shrink-0">
          {rightSlot}
        </div>
      )}
    </HeroLayout>
  );
};

export default Hero;
