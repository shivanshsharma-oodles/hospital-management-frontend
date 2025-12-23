import { privateApi } from "@/config/axios.config";
import type { BaseDepartmentPayload, CompleteDoctorResponse, DepartmentResponse, DoctorRequestPayload } from "@/types";

/* Department APIs */

//  Add Department
export const addDepartment = async (
    payload: BaseDepartmentPayload
) : Promise<DepartmentResponse> => {
    const response = await privateApi.post("/departments", payload )
    return response.data;
}

// Delete Department
export const deleteDepartment = async (id: number) => {
    await privateApi.delete(`/departments/${id}`)
}

/* Doctor APIs */

// doctor by id
export const getCompleteDoctorById = async(id: number) : Promise<CompleteDoctorResponse> =>  {
    const response = await privateApi.get(`/doctors/admin/${id}`);
    return response.data;
}

// create doctor
export const createDoctor = async(payload : DoctorRequestPayload) : Promise<CompleteDoctorResponse> =>  {
    const response = await privateApi.post(`/doctors/admin/create`, payload);
    return response.data;
}

// delete doctor by id
export const deleteDoctor = async(id: number) =>  {
    const response = await privateApi.delete(`/doctors/admin/${id}`);
    return response.data;
}