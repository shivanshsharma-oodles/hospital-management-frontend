import React from "react";
import { motion } from "framer-motion";
import type { HeroLayoutProps } from "@/types";


const HeroLayout = ({ children, animate = true } : HeroLayoutProps) => {
  const Wrapper = animate ? motion.section : "section";

  return (
    <Wrapper
      initial={animate ? { opacity: 0, y: 40 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col md:flex-row justify-between items-center
                 gap-8 px-4 sm:px-8 md:px-16 py-8 sm:py-12
                 max-w-6xl mx-auto w-full"
    >
      {children}
    </Wrapper>
  );
};

export default HeroLayout;
