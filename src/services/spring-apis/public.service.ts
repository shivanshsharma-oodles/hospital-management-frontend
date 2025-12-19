import { privateApi, publicApi } from "@/config/axios.config";
import type { BaseDepartmentPayload, DepartmentResponse } from "@/types";
import { storage } from "@/utils/storageFetch";


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

