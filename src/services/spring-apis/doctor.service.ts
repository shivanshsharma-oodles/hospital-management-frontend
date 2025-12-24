import { privateApi } from "@/config/axios.config";
import type { AddSlotRequestPayload, AppointmentResponse, CompleteDoctorResponse, DoctorRequestPayload, SlotResponseType } from "@/types";

/* Doctor Controller APIs */

// Get Doctor
export const fetchDoctor = async (): Promise<CompleteDoctorResponse> => {
    const response = await privateApi.get(`/doctors/me`);
    return response.data;
}

// update doctor
export const updateDoctor = async (payload: DoctorRequestPayload): Promise<CompleteDoctorResponse> => {
    const response = await privateApi.put(`/doctors`, payload);
    return response.data;
}

// Add Slots
export const addSlots = async (payload: AddSlotRequestPayload) => {
    await privateApi.post('/doctors/slots', payload)
}

// Delete Slot
export const deleteSlot = async (id: number) => {
    await privateApi.delete(`/doctors/slots/${id}`)
}

// Get Slots
export const fetchMySlots = async (): Promise<SlotResponseType[]> => {
    const response = await privateApi.get('/doctors/slots');
    return response.data;
}

export const managePendingAppointment = async (
    id: number, status: "SCHEDULED" | "REJECTED"
): Promise<AppointmentResponse> => {
    const response = await privateApi.put(`/appointments/${id}/status`, status);
    return response.data;
}



