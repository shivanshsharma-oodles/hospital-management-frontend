import { CirclePlus } from "lucide-react";
import React from "react";
import BaseActionCard from "@/components/common/baseComp/BaseActionCard";
import { ADD_DOCTOR_CARD } from "@/utils/constants/cards.contants";
import { useNavigate } from "react-router-dom";
import type { BaseDoctorResponse } from "@/types";

const AddDoctor = ({ doctors }: { doctors: BaseDoctorResponse[] }) => {
    const navigate = useNavigate();

    return (
        <>
            <BaseActionCard
                title={ADD_DOCTOR_CARD.TITLE}
                description={ADD_DOCTOR_CARD.DESCRIPTION}
                icon={
                    <CirclePlus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                }
                onClick={() => navigate("/admin/doctor")}
            />

            {/* All Departments */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {doctors?.map((doc) => (
                    <BaseActionCard
                        key={doc.id}
                        title={doc.name}
                        description={doc.department.name}
                        size="small"
                    />
                ))}
            </div>
        </>
    );
};

export default AddDoctor;
