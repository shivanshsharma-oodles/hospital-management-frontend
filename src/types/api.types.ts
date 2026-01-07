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
    userId: number;
    email: string;
}
export interface LoginResponse {
    userId: number;
    jwt: string;
}

export type Role = "ADMIN" | "DOCTOR" | "PATIENT"
export interface AuthUserResponse {
    id: number,
    email: string,
    roles: Role[]
}

/* Departments */

export interface BaseDepartmentPayload {
    name: string;
    description: string;
}

export type DepartmentStatus = "ACTIVE" | "INACTIVE" | "ARCHIEVED";
export interface DepartmentResponse extends BaseDepartmentPayload {
    id: number;
    departmentStatus: DepartmentStatus;
}

/* DOCTOR */
export type DoctorStatus = "ACTIVE" | "INACTIVE" | "ARCHIEVED";
export interface BaseDoctorResponse {
    id: number;
    name: string;
    status: DoctorStatus;
    department?: DepartmentResponse;
}

export type Gender = "MALE" | "FEMALE" | "OTHER"
export interface Address {
    street: string
    city: string
    state: string
    zip: string
}
export interface CompleteDoctorResponse extends BaseDoctorResponse {
    email: string
    phone: string
    dob: Date
    gender: Gender
    address: Address
    createdAt: Date
}

export interface DoctorRequestPayload {
    name: string
    email: string
    phone: string
    password: string
    dob: string
    gender: Gender
    address: Address
    departmentId: number
}

export interface AddSlotRequestPayload {
    date: string
    startTime: string
    endTime: string
}
export interface SlotResponseType {
    id: number
    date: string
    startTime: string
    endTime: string
    isBooked?: boolean
}

export interface AppointmentSummaryResponse {
    id: number
}

export type AppointmentStatus = "PENDING" | "SCHEDULED" | "COMPLETED" | "REJECTED" | "CANCELLED"
// Appointments
export interface AppointmentResponse {
    id: number,
    appointmentStatus: AppointmentStatus
    doctor: BaseDoctorResponse
    patient: PatientSummaryResponse
    slot: SlotResponseType
    medicalRecordId?: number
}


// Patients 
export interface PatientSummaryResponse {
    id: number
    name: string
}

export interface CompletePatientResponse extends PatientSummaryResponse {
    email: string
    address: Address
    phone: string
    dob: string
    gender: Gender
    createdAt: string
}

export interface CompletePatientResponse extends PatientSummaryResponse {
    email: string
    address: Address
    phone: string
    dob: string
    gender: Gender
    createdAt: string
}

export interface PatientRequestPayload {
    name: string
    address: Address
    phone: string
    dob: string
    gender: Gender
}

export interface ProfileContext {
    id: string
    name: string
    email: string
    phone: string
    dob: string
    gender: Gender
    address: Address
    createdAt: string
}

export interface MedicalRecordRequest {
    symptoms: string;
    diagnosis: string;
    prescription: string;
    pulse?: number;
    treatment?: string;
    bpSystolic?: number;
    bpDiastolic?: number;
    temperature?: number;
    followUpDate?: string;
}

export interface MedicalRecordResponse {
    id: number;
    doctor: BaseDoctorResponse;
    patient: PatientSummaryResponse;
    appointment: AppointmentSummaryResponse;
    symptoms: string;
    diagnosis: string;
    prescription: string;
    treatment?: string;
    followUpDate?: string;
    temperature?: number;
    pulse?: number;
    bpSystolic?: number;
    bpDiastolic?: number;
}

export interface BillResponse {
    id: number;
    patient: PatientSummaryResponse;
    doctor: BaseDoctorResponse;
    appointment: AppointmentSummaryResponse;
    amount: number;
    createdAt: string;
}