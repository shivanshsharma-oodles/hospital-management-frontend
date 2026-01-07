import type { SlotResponseType } from "@/types";

/**
 * Sort slots by:
 * 1. date ASC
 * 2. startTime ASC
 */

export const sortSlotByDateTime = (
    slots: SlotResponseType[]
) : SlotResponseType[] => {
    return [...slots].sort((a, b) => {
        // Compare dates

        const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();

        if(dateDiff !== 0) return dateDiff;

        // same date, compare time
        const [ah, am] = a.startTime.split(":").map(Number);
        const [bh, bm] = b.startTime.split(":").map(Number);

        return ah * 60 + am - (bh * 60 + bm);  // converting to minutes then subtracting
    })
}