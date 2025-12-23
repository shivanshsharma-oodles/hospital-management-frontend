import React from "react";
import type {CompletePatientResponse } from "@/types";
import CommonNavbar from "@/components/common/CommonNavbar";

const PatientNavbar = ({ patient }: { patient?: CompletePatientResponse }) => {
    return (
        <CommonNavbar
            user={{ name: patient?.name, email: patient?.email }}
            links={[
                { label: "Find Doctor", href: "/patient/find-doctor" },
                { label: "My Appointments", href: "/patient/appointments" },
                { label: "Medical Records", href: "/patient/medical-records" }
            ]}
        />
    );
};

export default PatientNavbar;
