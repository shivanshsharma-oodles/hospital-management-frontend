import { useNavigate } from "react-router-dom";
import { managePendingAppointment } from "@/services/spring-apis/common.service";
import { showError, showSuccess } from "@/utils/toast";
import type { AppointmentResponse } from "@/types";

type UserRole = "DOCTOR" | "PATIENT";

export const useAppointmentActions = (
    setAppointments: React.Dispatch<React.SetStateAction<AppointmentResponse[]>>,
    role: UserRole
) => {
    const navigate = useNavigate();

    const handleAction = async (id: number, actionType: string) => {
        console.log(`[${role}] Action: ${actionType} on ID: ${id}`);

        try {
            // --- COMMON ACTIONS (Both Roles) ---
            if (actionType === "VIEW_DETAILS") {
                // Role ke hisaab se URL change kar sakte hain agar zaroorat ho
                navigate(`${role.toLowerCase}/appointment-details/${id}`);
                return;
            }

            // --- DOCTOR SPECIFIC ACTIONS ---
            if (role === "DOCTOR") {
                switch (actionType) {
                    case "REJECT":
                        await managePendingAppointment(id, "REJECTED");
                        showSuccess("Request Rejected");
                        setAppointments(prev => prev.filter(app => app.id !== id));
                        break;

                    case "ACCEPT":
                        await managePendingAppointment(id, "SCHEDULED");
                        showSuccess("Appointment Scheduled");
                        setAppointments(prev => prev.map(app =>
                            app.id === id ? { ...app, appointmentStatus: "SCHEDULED" } : app
                        ));
                        break;

                    case "COMPLETE":
                        // await completeAppointment(id);
                        showSuccess("Marked Completed");
                        // UI update logic...
                        break;
                }
            }

            // --- PATIENT SPECIFIC ACTIONS ---
            if (role === "PATIENT") {
                switch (actionType) {
                    case "CANCEL":
                        // Patient "Cancel" later
                        // await cancelAppointment(id); // API call

                        // Mock for test:
                        await new Promise(r => setTimeout(r, 500));

                        showSuccess("Appointment Cancelled");
                        // List se hata do (either Pending or Scheduled)
                        setAppointments(prev => prev.filter(app => app.id !== id));
                        break;
                }
            }

        } catch (error: any) {
            console.error(`Error processing ${actionType}:`, error);
            showError(error.response?.data?.error || "Action failed");
        }
    };

    return { handleAction };
};