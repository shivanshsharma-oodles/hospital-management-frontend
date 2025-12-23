import { publicApi } from "@/config/axios.config";
import type { BaseDoctorResponse, DepartmentResponse } from "@/types";


export const fetchDepartments = async (
) : Promise<DepartmentResponse[]> => {
    const response = await publicApi.get('/departments');
    return response.data;
}

export const DepartmentById = async (
    id: string
) :  Promise<DepartmentResponse> => {
    const response = await publicApi.post(`/departments/${id}`);
    return response.data;
}


/* Doctor Public APIs */

// Get All Doctors
export const getAllDoctors = async() : Promise<BaseDoctorResponse[]> =>  {
    const response = await publicApi.get("/doctors");
    return response.data;
}

// Doctor by Id
export const getDoctorById = async(id: string) : Promise<BaseDoctorResponse> =>  {
    const response = await publicApi.get(`/doctors/${id}`);
    return response.data;
}

// Doctors by Department Id
export const getAllDoctorsByDeptId = async(id: number) : Promise<BaseDoctorResponse[]> =>  {
    const response = await publicApi.get(`/doctors/department/${id}`);
    return response.data;
}