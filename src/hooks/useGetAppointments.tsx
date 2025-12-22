import { useEffect, useState } from "react";
import { showError } from "@/utils/toast";
import type { AppointmentResponse } from "@/types";
import { getAppointments } from "@/services/spring-apis/common.service";

export const useGetAppointments = () => {
    const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                setLoadingAppointments(true);
                const data = await getAppointments();
                setAppointments(data);
            } catch (error) {
                console.error("Error loading appointments:", error);
                setError(error)
                showError("Failed to load departments", "load-appointments-error");
            } finally {
                setLoadingAppointments(false);
            }
        };
        loadDepartments();
    }, []);

    return { appointments, loadingAppointments, error };
};