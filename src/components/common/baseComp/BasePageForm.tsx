import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BasePageFormProps {
  // Header props
  title: string;
  description?: string;
  
  // Go back button
  showGoBack?: boolean;
  onGoBack?: () => void;
  goBackLabel?: string;
  
  // Form content
  children: React.ReactNode;
  
  // Footer actions
  footer?: React.ReactNode;
  
  // Styling
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  
  // Form props
  onSubmit?: (e: React.FormEvent) => void;
}

const BasePageForm = ({
  title,
  description,
  showGoBack = false,
  onGoBack,
  goBackLabel = "Go Back",
  children,
  footer,
  className,
  maxWidth = "2xl",
  onSubmit,
}: BasePageFormProps) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50/50 py-8 px-4">
      <div className={cn("mx-auto", maxWidthClasses[maxWidth])}>
        {/* Go Back Button */}
        {showGoBack && (
          <Button
            variant="ghost"
            onClick={onGoBack}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {goBackLabel}
          </Button>
        )}

        {/* Main Form Card */}
        <Card className={cn("shadow-sm border-gray-200", className)}>
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-sm text-gray-600">
                {description}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {children}

              {/* Footer Actions */}
              {footer && (
                <div className="flex items-center justify-end gap-3 pt-6 border-t">
                  {footer}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BasePageForm;