import React, { useState } from "react";
import { Plus } from "lucide-react";
import type { DepartmentResponse } from "@/types";
import { ADD_DEPARTMENT_CARD } from "@/utils/constants/cards.contants";
import BaseActionCard from "@/components/common/baseComp/BaseActionCard";
import AddDepartmentModal from "@/components/pagesComp/admin/AddDepartmentModal";

// const AddDepartment = ({ user_id, onDepartmentAdded }: AddDepartmentProps) => {
const Departments = ({ departments }: { departments: DepartmentResponse[] }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Add Card */}
            <BaseActionCard
                title={ADD_DEPARTMENT_CARD.TITLE}
                icon={
                    <Plus className="h-10 w-10 text-primary/80 group-hover:text-primary" />
                }
                onClick={() => setOpen(true)}
                size="small"
            />

            {/* All Departments */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {departments.map((dept) => (
                    <BaseActionCard
                        key={dept.id}
                        title={dept.name}
                        description={dept.description}
                        size="medium"
                    />
                ))}
            </div>


            <AddDepartmentModal
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
};

export default Departments;
