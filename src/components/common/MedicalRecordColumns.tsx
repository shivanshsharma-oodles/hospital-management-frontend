import React from "react";
import { Button } from "@/components/ui/button";
import type { Column } from "@/components/common/baseComp/BaseTable";
import type { MedicalRecordSummaryResponse } from "@/types";
import { format } from "date-fns";

export const getMedicalRecordsColumns = (
    onViewRecord: (recordId: number) => void,
): Column<MedicalRecordSummaryResponse>[] => [
        {
            key: "doctor",
            header: "Doctor",
            render: (record) => `Dr. ${record.doctor.name}`
        },
        {
            key: "patient",
            header: "Patient",
            render: (record) => `${record.patient.name}`
        },
        {
            key: "diagnosis",
            header: "Diagnosis",
            render: (record) => record.diagnosis
        },
        {
            key: "createdAt",
            header: "Date",
            render: (record) => {
                // Check if record.createdAt exists
                return record.createdAt
                    ? format(new Date(record.createdAt), 'PPP')
                    : 'N/A'
            }
        },
        {
            key: "actions",
            header: "Action",
            render: (record) => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-primaryColor border hover:underline h-8 text-xs"
                        onClick={() => onViewRecord(record.id)}
                    >
                        View & Print
                    </Button>
                </div>
            ),
        },
    ];