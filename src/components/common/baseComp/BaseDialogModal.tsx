import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React from "react";

interface BaseDialogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description?: string;

  children: React.ReactNode;
  footer?: React.ReactNode; 
  className?: string;
  showCross?: boolean;
}

const BaseDialogModal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  showCross = true,
  className = ""
}: BaseDialogModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={showCross} className={`sm:max-w-md bg-light ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        {/* Body */}
        <div>{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-4 mt-6">
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BaseDialogModal;
