import type { MedicalRecordSummaryResponse } from "@/types"

// Descending Order

export const sortRecordsByDate = (
    records: MedicalRecordSummaryResponse[]
) : MedicalRecordSummaryResponse[] => {
    return [...records].sort((a, b) => {

        const dateDiff = 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            
        return dateDiff;
    })
}
