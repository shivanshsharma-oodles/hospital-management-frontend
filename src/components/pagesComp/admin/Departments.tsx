import React, { useState } from "react";
import { Plus } from "lucide-react";
import type { DepartmentResponse } from "@/types";
import { ADD_DEPARTMENT_CARD } from "@/utils/constants/cards.contants";
import BaseActionCard from "@/components/common/baseComp/BaseActionCard";
import AddDepartmentModal from "@/components/pagesComp/admin/AddDepartmentModal";
import BaseTable from "@/components/common/baseComp/BaseTable";
import { Button } from "@/components/ui/button";
import { getDepartmentColumns } from "@/components/common/DepartmentColumns";
import { useNavigate } from "react-router-dom";
import { deleteDepartment } from "@/services/spring-apis/admin.service";
import { showError } from "@/utils/toast";


const Departments = ({ departments, handleDeleteDepartment, handleAddDepartment }: { departments: DepartmentResponse[], handleDeleteDepartment: (id: number) => void , handleAddDepartment: (newDepartment: DepartmentResponse) => void}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const columns = getDepartmentColumns(
        (id) => navigate(`/admin/departments/${id}/doctors`),
        (id) => handleDeleteDepartment(id)
    )
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
            {/* <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {departments.map((dept) => (
                    <DepartmentCard department={dept}/>
                ))}
            </div> */}

            <BaseTable
                data={departments}
                columns={columns}
                rowKey={(dept) => dept.id}
                emptyMessage="No Department Found"
            />


            <AddDepartmentModal
                open={open}
                onOpenChange={setOpen}
                handleAddDepartment = {handleAddDepartment}
            />
        </>
    );
};

export default Departments;
