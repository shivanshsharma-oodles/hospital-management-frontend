import React from "react";
import BaseImageCard from "@/components/common/baseComp/BaseImageCard";
import type { BaseDoctorResponse } from "@/types";

interface DoctorCardProps {
    doctor: BaseDoctorResponse;
    onButton1?: (num?: any) => void;
    button1Text?: string;
    onButton2?: () => void;
    button2Text?: string;
    showImage?: boolean;
}

const DoctorCard = ({ 
    doctor, 
    onButton1, 
    button1Text, 
    onButton2, 
    button2Text,
    showImage
}: DoctorCardProps) => {

    return (
        <BaseImageCard
            title={doctor.name}
            description={doctor.department.name}
            // imageUrl={doctor.imageUrl} // Uncomment when you have images
            
            // Pass props down directly
            onButton1={onButton1}
            button1Text={button1Text}
            
            onButton2={onButton2}
            button2Text={button2Text}
            showImage={showImage}
        />
    );
};

export default DoctorCard;