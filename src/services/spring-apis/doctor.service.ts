import { privateApi } from "@/config/axios.config";
import type { AddSlotRequestPayload, CompleteDoctorResponse, DoctorRequestPayload } from "@/types";

/* Doctor Controller APIs */

// Get Doctor
export const fetchDoctor = async() : Promise<CompleteDoctorResponse> =>  {
    const response = await privateApi.get(`/doctors/me`);
    return response.data;
}

// update doctor
export const updateDoctor = async(payload : DoctorRequestPayload) : Promise<CompleteDoctorResponse> =>  {
    const response = await privateApi.put(`/doctors`, payload);
    return response.data;
}

// Add Slots
export const addSlots = async(payload : AddSlotRequestPayload) => {
    await privateApi.post('/doctors/slots', payload)
}