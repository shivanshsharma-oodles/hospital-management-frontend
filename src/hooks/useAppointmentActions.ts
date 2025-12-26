import { useNavigate } from "react-router-dom";
import type { AppointmentResponse } from "@/types";
import { showError, showSuccess } from "@/utils/toast";
import { managePendingAppointment } from "@/services/spring-apis/doctor.service";
import { cancelAppointment } from "@/services/spring-apis/common.service";

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
                        try {
                            await managePendingAppointment(id, "REJECTED");
                            showSuccess("Request Rejected");
                            setAppointments(prev => prev.filter(app => app.id !== id));
                        } catch (error) {
                            console.error(error);
                            showError(error?.response?.data?.error || "Could not reject appointment")
                        }
                        break;

                    case "ACCEPT":
                        try {
                            await managePendingAppointment(id, "SCHEDULED");
                            showSuccess("Appointment Scheduled", "appointment-scheduled success");
                            setAppointments(prev => prev.map(app =>
                                app.id === id ? { ...app, appointmentStatus: "SCHEDULED" } : app
                            ));
                        } catch (error) {
                            console.error(error);
                            showError(error?.response?.data?.error || "Could not Accept appointment")
                        }
                        break;

                    case "CANCEL":
                        try {
                            await cancelAppointment(id);
                            showSuccess("Appointment Cancelled", "appointment-cancellation success");
                            setAppointments(prev => prev.map(app =>
                                app.id === id ? { ...app, appointmentStatus: "CANCELLED" } : app
                            ));
                        } catch (error) {
                            console.error(error);
                            showError(error?.response?.data?.error || "Could not Cancel appointment")
                        }
                        break;

                    case "COMPLETE":
                        navigate(`/doctor/appointments/${id}/complete`)
                        // UI update logic...
                        break;
                }
            }

            // --- PATIENT SPECIFIC ACTIONS ---
            if (role === "PATIENT") {
                switch (actionType) {
                    case "CANCEL":
                        try {
                            await cancelAppointment(id);
                            showSuccess("Appointment Cancelled", "appointment-cancellation success");
                            setAppointments(prev => prev.map(app =>
                                app.id === id ? { ...app, appointmentStatus: "CANCELLED" } : app
                            ));
                        } catch (error) {
                            console.error(error);
                            showError(error?.response?.data?.error || "Could not Cancel appointment")
                        }
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