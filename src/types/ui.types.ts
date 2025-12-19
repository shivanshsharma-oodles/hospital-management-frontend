// Loader component types
export type VariantType = "modern" | "dots" | "encircle";
export type LoaderSize = "sm" | "md" | "lg";

export type LoaderProps = {
  text?: string;
  variant?: VariantType;
  fullScreen?: boolean;
  size?: LoaderSize;
  object?: React.ReactNode;
};

// Toast
type ToastId = string | undefined;
export type ToastFunction = (msg: string, id?: ToastId) => void;


/* ---------- Hero Section ---------- */

export interface HeroLayoutProps {
     children: React.ReactNode,  
     animate?: boolean 
}
export interface HeroContentProps {
  title: string;
  subtitle: string;
}
export interface HeroImageProps {
  src: string;
  alt: string;
}
export interface HeroProps {
  rightSlot?: React.ReactNode;
  variant?: "default" | "admin";
}

/* ---------- Base Component Props ---------- */
export interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}