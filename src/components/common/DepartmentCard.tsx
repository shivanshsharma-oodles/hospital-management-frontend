import React from "react";
import BaseImageCard from "@/components/common/baseComp/BaseImageCard";
import type { DepartmentResponse } from "@/types";

interface DepartmentCardProps {
    department: DepartmentResponse;
    // All optional so you can choose what to pass
    onButton1?: (num?: any) => void;
    button1Text?: string;
    onButton2?: () => void;
    button2Text?: string;
    showImage?: boolean;
}

const DepartmentCard = ({ 
    department, 
    onButton1, 
    button1Text, 
    onButton2, 
    button2Text,
    showImage
}: DepartmentCardProps) => {

    return (
        <BaseImageCard
            title={department.name}
            description={department.description}
            // imageUrl={department.imageUrl} // Uncomment when you have images
            
            // Pass props down directly
            onButton1={onButton1}
            button1Text={button1Text}
            
            onButton2={onButton2}
            button2Text={button2Text}
            showImage={showImage}
        />
    );
};

export default DepartmentCard;