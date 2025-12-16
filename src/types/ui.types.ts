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