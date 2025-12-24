import React, { useEffect, useState } from "react";
import { type AppointmentStatus } from "@/types";
import { Appointmet_Tabs } from "@/utils/constants";
import { useGetAppointments } from "@/hooks/useGetAppointments";
import { useAppointmentActions } from "@/hooks/useAppointmentActions";
import CommonAppointmentTable from "@/components/common/CommonAppointmentTable";
import Loader from "@/components/common/Loader";

const PatientAppointmentsPage = () => {
    // 1. Data Fetching
    const { appointments, setAppointments, loadingAppointments, error } = useGetAppointments();
    const { handleAction } = useAppointmentActions(setAppointments, "PATIENT")

    // 2. State: Default is 'SCHEDULED'
    const [currentView, setCurrentView] = useState<AppointmentStatus>("SCHEDULED");

    // 3. Safe Filter Logic (Null check zaroori hai taaki crash na ho)
    const filteredData = (appointments || []).filter(
        (app) => app.appointmentStatus === currentView
    );

    // 4. Loading/Error Handling (User Experience ke liye important)
    if (loadingAppointments) return <Loader variant="encircle" size="lg" text="Loading Departments..." fullScreen={true} />;
    if (error) return <div className="p-6 text-red-500">Failed to load data.</div>;

    return (
        <div>
            <div className="p-6 max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl font-bold">Manage Appointments</h1>

                    {/* --- THE FILTER BUTTONS  --- */}
                    <div className="flex items-center bg-muted p-1 rounded-lg">
                        {Appointmet_Tabs.map((tab) => (
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
                                {/* UI Label is Requests, but click the Value will be PENDING */}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- REUSABLE TABLE --- */}
                <CommonAppointmentTable
                    data={filteredData}
                    statusView={currentView}
                    role="PATIENT"
                    onAction={handleAction}
                />
            </div>
        </div>
    );
};

export default PatientAppointmentsPage