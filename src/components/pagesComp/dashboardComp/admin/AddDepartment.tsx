import { CirclePlus } from "lucide-react";
import React, { useState } from "react";
import BaseActionCard from "@/components/common/baseComp/BaseActionCard";
import AddDepartmentModal from "@/components/modals/AddDepartmentModal";
import { ADD_DEPARTMENT_CARD } from "@/utils/constants/cards.contants";

interface AddDepartmentProps {
    user_id: string;
    onDepartmentAdded: () => void;
}

// const AddDepartment = ({ user_id, onDepartmentAdded }: AddDepartmentProps) => {
const AddDepartment = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <BaseActionCard
                title={ADD_DEPARTMENT_CARD.TITLE}
                description={ADD_DEPARTMENT_CARD.DESCRIPTION}
                icon={
                    <CirclePlus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                }
                onClick={() => setOpen(true)}
            />

            {/* <AddDepartmentModal
                open={open}
                onOpenChange={setOpen}
                user_id={user_id}
                onDatabaseAdded={onDepartmentAdded}
            /> */}
        </>
    );
};

export default AddDepartment;
