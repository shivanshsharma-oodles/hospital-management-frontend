/* API types for the application */

/* Authentication */
export interface LoginPayload {
  email: string;
  password: string;
}
export interface SignupPayload extends LoginPayload {
    phone: string;
    name: string;
}
export interface SignupResponse {
    userId: string;
    email: string;
}
export interface LoginResponse {
    userId: string;
    jwt: string;
}

/* Departments */

export interface BaseDepartmentPayload {
    name: string;
    description: string; 
}

export interface DepartmentResponse extends BaseDepartmentPayload {
    id: number;
    departmentStatus: "ACTIVE" | "INACTIVE" | "ARCHIEVED";
}

