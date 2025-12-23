/* Patient Controller APIs */

import { privateApi } from "@/config/axios.config";
import type { CompletePatientResponse, PatientRequestPayload } from "@/types";

// Get Patient
export const fetchPatient = async() : Promise<CompletePatientResponse> =>  {
    const response = await privateApi.get(`/patients/me`);
    return response.data;
}

// update patient
export const updateDoctor = async(payload : PatientRequestPayload) : Promise<CompletePatientResponse> =>  {
    const response = await privateApi.put(`/patients`, payload);
    return response.data;
}