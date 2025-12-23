import React from "react";
import { Button } from "@/components/ui/button";
import type { Column } from "@/components/common/baseComp/BaseTable";
import type { DepartmentResponse } from "@/types";

export const getDepartmentColumns = (
  onViewDoctors: (deptId: number) => void,
  onDelete: (deptId: number) => void
): Column<DepartmentResponse>[] => [
  {
    key: "name",
    header: "Department Name",
  },
  {
    key: "description",
    header: "Description",
  },
  {
    key: "doctors",
    header: "Doctors",
    render: (dept) => (
      <Button
        size="sm"
        variant="outline"
        onClick={() => onViewDoctors(dept.id)}
      >
        View
      </Button>
    ),
  },
  {
    key: "manage",
    header: "Manage",
    render: (dept) => (
      <Button
        size="sm"
        variant="destructive"
        onClick={() => onDelete(dept.id)}
      >
        Delete
      </Button>
    ),
  },
];
