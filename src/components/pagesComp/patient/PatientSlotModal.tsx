import React, { useEffect, useState } from "react";
import BaseDialogModal from "@/components/common/baseComp/BaseDialogModal";
import { Button } from "@/components/ui/button";
import Loader from "@/components/common/Loader";
import { showError, showSuccess } from "@/utils/toast";
import {  bookAppointment } from "@/services/spring-apis/patient.service";
import { getSlotsByDoctorId } from "@/services/spring-apis/common.service";

interface SlotModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    doctorId: number;
    doctorName: string;
}

const PatientSlotModal = ({
    open,
    onOpenChange,
    doctorId,
    doctorName,
}: SlotModalProps) => {
    const [slots, setSlots] = useState([]);
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    // fetch slots when modal opens
    useEffect(() => {
        if (!open) return;

        const fetchSlots = async () => {
            try {
                setLoading(true);
                const res = await getSlotsByDoctorId(doctorId);
                setSlots(res);
            } catch (err) {
                showError("Failed to fetch slots");
            } finally {
                setLoading(false);
            }
        };

        fetchSlots();
    }, [open, doctorId]);

    const handleConfirm = async () => {
        if (!selectedSlotId) return;

        try {
            setLoading(true);
            const response = await bookAppointment({ doctorSlotId: selectedSlotId });
            showSuccess(`Appointment booked for date ${response.slot.date} ast time ${response.slot.startTime}`);
            onOpenChange(false);
        } catch (err) {
            showError("Failed to book appointment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseDialogModal
            open={open}
            onOpenChange={onOpenChange}
            title={`Available Slots`}
            description={`Select a slot for Dr. ${doctorName}`}
            footer={
                <>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={!selectedSlotId || loading}
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </>
            }
        >
            {loading ? (
                <Loader />
            ) : (
                slots.length === 0
                ? <p className="text-gray-500 text-sm">No Available Slots</p>
                : <div className="grid grid-cols-2 gap-3">
                    {slots.map((slot) => ( 
                        <Button
                            key={slot.id}
                            variant={selectedSlotId === slot.id ? "default" : "outline"}
                            onClick={() => setSelectedSlotId(slot.id)}
                        >
                            {slot.startTime} - {slot.endTime}
                        </Button>
                    ))}
                </div>
            )}
        </BaseDialogModal>
    );
};


export default PatientSlotModal
