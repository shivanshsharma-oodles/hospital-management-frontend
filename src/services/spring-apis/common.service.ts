import { privateApi } from "@/config/axios.config";
import type { AppointmentResponse, SlotResponseType } from "@/types";


export const getAppointments = async (
): Promise<AppointmentResponse[]> => {
    const response = await privateApi.get(`appointments/me`);
    return response.data;
}

export const cancelAppointment = async (
    id: number, 
) => {
    const response = await privateApi.put(`/appointments/${id}/cancel`);
    return response.data;
}

export const getSlotsByDoctorId = async (
    doctorId: number
): Promise<SlotResponseType[]> => {
    const response = await privateApi.get(`/doctors/${doctorId}/slots`);
    return response.data;
}