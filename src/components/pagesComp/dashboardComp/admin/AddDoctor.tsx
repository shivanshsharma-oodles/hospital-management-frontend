import { CirclePlus } from "lucide-react";
import React, { useState } from "react";
import BaseActionCard from "@/components/common/baseComp/BaseActionCard";
import AddDoctorModal from "@/components/modals/AddDoctorModal";
import { ADD_DOCTOR_CARD } from "@/utils/constants/cards.contants";

interface AddDoctorProps {
    user_id: string;
    onDoctorAdd: () => void;
}

// const AddDoctor = ({ user_id, onDoctorAdd }: AddDoctorProps) => {
const AddDoctor = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <BaseActionCard
                title={ADD_DOCTOR_CARD.TITLE}
                description={ADD_DOCTOR_CARD.DESCRIPTION}
                icon={
                    <CirclePlus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                }
                onClick={() => setOpen(true)}
            />

            {/* <AddDoctorModal
                open={open}
                onOpenChange={setOpen}
                user_id={user_id}
                onDatabaseAdded={onDoctorAdd}
            /> */}
        </>
    );
};

export default AddDoctor;
