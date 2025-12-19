import { privateApi } from "@/config/axios.config";
import type { BaseDepartmentPayload, DepartmentResponse } from "@/types";

/* Add Department */

//  Add Department
export const addDepartment = async (
    payload: BaseDepartmentPayload
) : Promise<DepartmentResponse> => {
    const response = await privateApi.post("", payload )

    return response.data;
}