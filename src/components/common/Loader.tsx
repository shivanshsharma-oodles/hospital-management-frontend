import type { LoaderProps, VariantType } from "@/types/ui.types";
import React, { type JSX } from "react";





const Loader = ({
  text,
  variant = "dots",
  fullScreen = true,
  size = "md",
  object,
}: LoaderProps) => {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  const variants: Record<VariantType, JSX.Element> = {
    modern: (
      <div className={`relative ${sizeMap[size]}`}>
        <div className="h-full w-full rounded-full border-4 dark:border-pink-900 border-pink-200"></div>
        <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-transparent border-t-pink-600 border-r-pink-700 dark:border-t-pink-400 dark:border-r-pink-200 animate-spin"></div>
      </div>
    ),

    encircle: (
      <div className="relative flex items-center justify-center p-2"> {/* Spinning ring around object */}
        <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-pink-400 border-r-pink-600 dark:border-r-pink-300 animate-spin duration-1000"></div> {/* Static object in center */} 
        <div className="relative z-10 flex items-center justify-center w-7 h-7"> {object} </div>
      </div>),

    dots: (
      <div className="flex gap-2">
        <div className="h-3 w-3 rounded-full bg-pink-200 animate-bounce animation-delay-100"></div>
        <div className="h-3 w-3 rounded-full bg-pink-300 animate-bounce animation-delay-150"></div>
        <div className="h-3 w-3 rounded-full bg-pink-400 animate-bounce animation-delay-200"></div>
      </div>
    ),
  };

  if (!fullScreen) {
    // Small inline loader with text
    return (
      <div className="inline-flex flex-col items-center justify-center gap-2">
        {variants[variant]}
        {text && (
          <span className="text-sm text-gray-500 dark:text-gray-400">{text}</span>
        )}
      </div>
    );
  }

  // FullScreen version
  const containerClass = "fixed inset-0 z-[9999] flex items-center justify-center";
  const backdropClass = "absolute inset-0 bg-black/10 backdrop-blur-xs";

  return (
    <div className={containerClass}>
      {/* Backdrop */}
      <div className={backdropClass}></div>

      {/* Loader content */}
      <div className="relative z-10 flex flex-col justify-center items-center gap-3 p-8">
        {/* Loader animation */}
        <div className="flex items-center justify-center">
          {variants[variant]}
        </div>

        {/* Text with typing animation */}
        {text && (
          <div className="text-center">
            <p className="font-fira text-lg text-gray-800 font-medium animate-pulse">
              {text}
            </p>
          </div>
        )}
      </div>

      {/* Custom CSS for animation delays */}
      <style>{`
  .animation-delay-100 {
    animation-delay: 0.1s;
  }
  .animation-delay-150 {
    animation-delay: 0.15s;
  }
  .animation-delay-200 {
    animation-delay: 0.2s;
  }
`}</style>

    </div>
  );
};

export default Loader;