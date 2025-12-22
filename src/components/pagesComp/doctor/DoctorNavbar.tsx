import React from "react";
import type { CompleteDoctorResponse } from "@/types";
import CommonNavbar from "@/components/common/CommonNavbar";

const DoctorNavbar = ({ doctor }: { doctor: CompleteDoctorResponse }) => {
    return (
        <CommonNavbar
            user={{ name: doctor?.name, email: doctor?.email }}
            links={[
                { label: "Appointments", href: "/doctor/appointments" },
                { label: "Manage Slots", href: "/doctor/slots" }
            ]}
        />
    );
};

export default DoctorNavbar;