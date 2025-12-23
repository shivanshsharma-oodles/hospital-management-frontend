import React, { useState } from "react";
import { type AppointmentStatus } from "@/types";
import { useGetAppointments } from "@/hooks/useGetAppointments";
import { useAppointmentActions } from "@/hooks/useAppointmentActions";
import CommonAppointmentTable from "@/components/common/CommonAppointmentTable";
import { Appointmet_Tabs } from "@/utils/constants";
import DoctorNavbar from "@/components/pagesComp/doctor/DoctorNavbar";

const DoctorAppointmentsPage = () => {
    // 1. Data Fetching
    const { appointments, setAppointments, loadingAppointments, error } = useGetAppointments();
    const { handleAction } = useAppointmentActions(setAppointments, "DOCTOR")

    // 2. State: Default is 'SCHEDULED'
    const [currentView, setCurrentView] = useState<AppointmentStatus>("SCHEDULED");

    // 3. Safe Filter Logic (Null check zaroori hai taaki crash na ho)
    const filteredData = (appointments || []).filter(
        (app) => app.appointmentStatus === currentView
    );

    // Global Action Handler
    // const handleTableAction = async (id: number, actionType: string) => {
    //     console.log(`Action: ${actionType} on ID: ${id}`);

    //     if (actionType === "REJECT") {
    //         try {
    //             await managePendingAppointment(id, "REJECTED");
    //             showSuccess("Appointment Scheduled", 'appointment-update')
    //             setAppointments((prev) => prev.filter((app) => app.id !== id)); // removing from table
    //         } catch (error) {
    //             console.error('Error Scheduling Slot:', error);
    //             showError(error.response.data.error || "Could Not Schedule Slot")
    //         }
    //     }

    //     if (actionType === "ACCEPT") {
    //         try {
    //             await managePendingAppointment(id, "SCHEDULED");
    //             showSuccess("Appointment Scheduled", 'appointment-update')
    //             setAppointments((prev) =>
    //                 prev.map((app) =>
    //                     app.id === id ? { ...app, appointmentStatus: "SCHEDULED" } : app
    //                 )
    //             )
    //         } catch (error) {
    //             console.error('Error Scheduling Slot:', error);
    //             showError(error.response.data.error || "Could Not Schedule Slot")
    //         }
    //     }

    //     if (actionType === "UPDATE") {
    //         // API call logic here
    //         alert("Marking Complete...");
    //     }

    //     if (actionType === "COMPLETE") {
    //         // API call logic here
    //         alert("Marking Complete...");
    //     }

    //     if (actionType === "VIEW_DETAILS") {
    //         // API call logic here
    //         alert("Marking Complete...");
    //     }
    // };

    // 4. Loading/Error Handling (User Experience ke liye important)
    if (loadingAppointments) return <div className="p-6">Loading appointments...</div>;
    if (error) return <div className="p-6 text-red-500">Failed to load data.</div>;

    return (
        <div>
            <DoctorNavbar />
            <div className="p-6 max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl font-bold">Manage Appointments</h1>

                    {/* --- THE 3 FILTER BUTTONS (Fixed Logic) --- */}
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
                    role="DOCTOR"
                    onAction={handleAction}
                />
            </div>
        </div>
    );
};

export default DoctorAppointmentsPage;