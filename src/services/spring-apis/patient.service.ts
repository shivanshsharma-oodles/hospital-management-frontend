/* Patient Controller APIs */

import { privateApi } from "@/config/axios.config";
import type { AppointmentResponse, CompletePatientResponse, MedicalRecordResponse, MedicalRecordSummaryResponse, PatientRequestPayload } from "@/types";

// Get Patient
export const fetchPatient = async() : Promise<CompletePatientResponse> =>  {
    const response = await privateApi.get(`/patients/me`);
    return response.data;
}

// update patient
export const updatePatient = async(payload : PatientRequestPayload) : Promise<CompletePatientResponse> =>  {
    const response = await privateApi.put(`/patients`, payload);
    return response.data;
}

export const bookAppointment = async(payload : {doctorSlotId: number}) : Promise<AppointmentResponse> => {
    const response = await privateApi.post(`/appointments`, payload);
    return response.data;
}

export const getMedicalRecordsByUserId = async() : Promise<MedicalRecordSummaryResponse[]> => {
    const response = await privateApi.get(`/medical-records/me`);
    return response.data;
}