import React, { useState } from "react";
import CommonAppointmentTable from "@/components/common/CommonAppointmentTable";
import { useNavigate } from "react-router-dom";
import { useGetAppointments } from "@/hooks/useGetAppointments";
import type { AppointmentStatus } from "@/types";

const DoctorAppointmentsPage = () => {
    // 1. Data Fetching
    const { appointments, loadingAppointments, error } = useGetAppointments();
    const navigate = useNavigate();

    // 2. State: Default 'SCHEDULED' rakha hai
    // Note: Type 'PENDING' use kar rahe hain (API value), na ki 'REQUEST'
    const [currentView, setCurrentView] = useState<AppointmentStatus>("SCHEDULED");

    // 3. Mapping Configuration
    // Ye zaroori hai taaki UI pe "Requests" dikhe par logic "PENDING" dhunde
    const TABS = [
        { label: "Requests", value: "PENDING" as AppointmentStatus },
        { label: "Scheduled", value: "SCHEDULED" as AppointmentStatus },
        { label: "Completed", value: "COMPLETED" as AppointmentStatus },
    ];

    // 4. Safe Filter Logic (Null check zaroori hai taaki crash na ho)
    const filteredData = (appointments || []).filter(
        (app) => app.appointmentStatus === currentView
    );

    // Global Action Handler
    const handleTableAction = (id: number, actionType: string) => {
        console.log(`Action: ${actionType} on ID: ${id}`);

        if (actionType === "VIEW_DETAILS") {
            navigate(`/doctor/appointment-details/${id}`);
            return;
        }

        if (actionType === "COMPLETE") {
            // API call logic here
            alert("Marking Complete...");
        }
    };

    // 5. Loading/Error Handling (User Experience ke liye important)
    if (loadingAppointments) return <div className="p-6">Loading appointments...</div>;
    if (error) return <div className="p-6 text-red-500">Failed to load data.</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold">Manage Appointments</h1>

                {/* --- THE 3 FILTER BUTTONS (Fixed Logic) --- */}
                <div className="flex items-center bg-muted p-1 rounded-lg">
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setCurrentView(tab.value)}
                            className={`
                                px-4 py-2 text-sm font-medium rounded-md transition-all
                                ${currentView === tab.value
                                    ? "bg-white text-primary shadow-sm" // Active Style
                                    : "text-muted-foreground hover:text-foreground hover:bg-gray-200" // Inactive Style
                                }
                            `}
                        >
                            {/* UI par Label dikhega (Requests), par click pe Value set hogi (PENDING) */}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- REUSABLE TABLE --- */}
            <CommonAppointmentTable
                data={filteredData}
                statusView={currentView}
                role="DOCTOR"
                onAction={handleTableAction}
            />
        </div>
    );
};

export default DoctorAppointmentsPage;