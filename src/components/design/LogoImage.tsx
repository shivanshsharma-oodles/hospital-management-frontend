import React from "react";
import LogoPng from "@/assets/Logo.svg";

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <>
            {/* Light Mode */}
            <img
                src={LogoPng}
                alt="Cortex Logo (Light)"
                className={`block ${className}`}
            />
        </>
    );
};