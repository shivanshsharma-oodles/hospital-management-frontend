import { privateApi } from "@/config/axios.config";
import type { AppointmentResponse } from "@/types";


export const getAppointments = async (
) : Promise<AppointmentResponse[]> => {
    const response = await privateApi.get(`appointments/me`);
    return response.data;
}