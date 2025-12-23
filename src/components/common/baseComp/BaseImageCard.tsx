import React from "react";
import FallbackImage from '@/assets/fallback/FallbackCardImage.svg'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BaseImageCardProps = {
    title: string;
    description?: string;
    imageUrl?: string;

    // Make these optional (?)
    onButton1?: () => void;
    button1Text?: string;

    onButton2?: () => void;
    button2Text?: string;
    showImage?: boolean;
    className?: string;
};

const BaseImageCard = ({
    title,
    description,
    imageUrl,
    onButton1,
    button1Text,
    onButton2,
    button2Text,
    showImage = true,
    className,
}: BaseImageCardProps) => {

    // Logic: Only show footer if at least one button has text & action
    const showButton1 = onButton1 && button1Text;
    const showButton2 = onButton2 && button2Text;
    const showFooter = showButton1 || showButton2;

    return (
        <Card
            className={cn(
                "overflow-hidden transition-shadow duration-300 hover:shadow-md m-1 flex flex-col h-full",
                className
            )}
        >
            {/* Image Wrapper */}
            {
                showImage &&
                <div className="h-40 w-full bg-muted overflow-hidden shrink-0">
                    <img
                        src={imageUrl || FallbackImage}
                        alt={title}
                        className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                </div>
            }

            <CardHeader className="mt-1">
                <CardTitle className="text-lg line-clamp-1" title={title}>
                    {title}
                </CardTitle>
            </CardHeader>

            {description && (
                <CardContent className="text-sm text-muted-foreground grow">
                    <p className="line-clamp-2" title={description}>
                        {description}
                    </p>
                </CardContent>
            )}

            {/* Conditional Footer */}
            {showFooter && (
                <CardFooter className="flex gap-2 pt-0 my-2 mt-auto">
                    {/* Primary Button */}
                    {showButton1 && (
                        <Button
                            className="flex-1 bg-primaryColor/80 hover:bg-primaryColor"
                            onClick={onButton1}
                        >
                            {button1Text}
                        </Button>
                    )}

                    {/* Secondary Button - Typically Outline variant looks best for 2nd action */}
                    {showButton2 && (
                        <Button
                            variant="outline"
                            className="flex-1 border-brand text-brand hover:bg-brand/10"
                            onClick={onButton2}
                        >
                            {button2Text}
                        </Button>
                    )}
                </CardFooter>
            )}
        </Card>
    );
};

export default BaseImageCard;