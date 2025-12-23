import { privateApi } from "@/config/axios.config";
import type { AppointmentResponse } from "@/types";


export const getAppointments = async (
) : Promise<AppointmentResponse[]> => {
    const response = await privateApi.get(`appointments/me`);
    return response.data;
}

export const managePendingAppointment = async (
    id: number, status: "SCHEDULED" | "REJECTED"
) : Promise<AppointmentResponse> => {
    const response = await privateApi.put(`/appointments/${id}/status`, status);
    return response.data;
}