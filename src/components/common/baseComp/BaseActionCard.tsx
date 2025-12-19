import React from "react";
import { cn } from "@/lib/utils";
import type { ActionCardProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const BaseActionCard = ({
  title,
  description,
  icon,
  onClick,
  className = "max-w-md",
}: ActionCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "border-dashed border-2 cursor-pointer transition-colors group",
        "hover:border-primary/50 hover:bg-accent/5",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center gap-3 py-8">
        <div className="rounded-full bg-accent p-3 group-hover:bg-primary/10">
          {icon}
        </div>
        <p className="text-sm text-muted-foreground group-hover:text-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default BaseActionCard;
