import React from "react";
import { cn } from "@/lib/utils";
import type { ActionCardProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SIZE_STYLES } from "@/utils/constants/styles.constants";
const BaseActionCard = ({
  title,
  description,
  icon,
  onClick,
  className,
  size = "medium",
}: ActionCardProps) => {
  const styles = SIZE_STYLES[size];

  return (
    <Card
      onClick={onClick}
      className={cn(
        "border-dashed border-2 border-gray-300 cursor-pointer transition-all duration-300 group",
        "hover:border-dark/50 hover:shadow-md",
        styles.card,
        className
      )}
    >
      <CardHeader className="px-4 py-2">
        <CardTitle
          className={cn(
            "text-center font-semibold text-gray-700 group-hover:text-gray-900 transition-colors",
            styles.title
          )}
        >
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent
        className={cn(
          "flex flex-col items-center justify-between py-2 px-4",
          styles.gap
        )}
      >

        {icon && (
          <div
            className={cn(
              "rounded-full bg-gray-100 group-hover:bg-primary/10 transition-colors",
              styles.iconWrapper
            )}
          >
            {icon}
          </div>
        )}
        <p
          className={cn(
            "text-center text-gray-600 group-hover:text-gray-800 transition-colors",
            styles.description
          )}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default BaseActionCard;