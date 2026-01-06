import type { AppointmentResponse } from "@/types"

export const sortAppointmentsByDateTime = (
    appointments: AppointmentResponse[]
) : AppointmentResponse[] => {
    return [...appointments].sort((a, b) => {
        // Compare Dates:

        const dateDiff = 
            new Date(a.slot.date).getTime() - new Date(b.slot.date).getTime();
            
        if(dateDiff !== 0) return dateDiff;

        // Same Date Compare time
        const [ah, am] = a.slot.startTime.split(":").map(Number);
        const [bh, bm] = b.slot.startTime.split(":").map(Number);

        return ah * 60 + am - (bh * 60 + bm);
    })
}
