import React, { useEffect, useState } from "react";
import BaseDialogModal from "@/components/common/baseComp/BaseDialogModal";
import { Button } from "@/components/ui/button";
import Loader from "@/components/common/Loader";
import { showError, showSuccess } from "@/utils/toast";
import { bookAppointment } from "@/services/spring-apis/patient.service";
import { getSlotsByDoctorId } from "@/services/spring-apis/common.service";
import { formatTime } from "@/utils/formatTime";
import { format } from "date-fns";
import type { SlotResponseType } from "@/types";
import { sortSlotByDateTime } from "@/utils/sort/sortSlotsByDateTime";

interface SlotModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    doctorId: number;
    doctorName: string;
    setShowConfirmation: (open: boolean) => void;
}

const PatientSlotModal = ({
    open,
    onOpenChange,
    doctorId,
    doctorName,
    setShowConfirmation
}: SlotModalProps) => {
    const [slots, setSlots] = useState<SlotResponseType[]>([]);
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    // fetch slots when modal opens
    useEffect(() => {
        if (!open) return;

        const fetchSlots = async () => {
            try {
                setLoading(true);
                const res = await getSlotsByDoctorId(doctorId);
                setSlots(sortSlotByDateTime(res));
            } catch (err) {
                showError(err?.response?.data?.err || "Failed to fetch slots");
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
            showSuccess(`Appointment Requested for date ${response.slot.date} ast time ${response.slot.startTime}`);
            onOpenChange(false);
            setShowConfirmation(true);
        } catch (err) {
            showError(err?.response?.data?.error || "Failed to book appointment");
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
                    : <div className="grid grid-cols-1 gap-3 max-h-88 overflow-auto p-1">
                        {slots.map((slot) => {
                            const isSelected = selectedSlotId === slot.id;

                            return (
                                <button
                                    key={slot.id}
                                    onClick={() => setSelectedSlotId(slot.id)}
                                    className={`w-full rounded-lg border p-3 text-left transition flex items-center justify-between
                                            ${isSelected
                                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                                            : "hover:border-primary/40 hover:bg-muted"}
                                            `}
                                >
                                    {/* Left: Date */}
                                    <div className="text-sm text-primary">
                                        {format(new Date(slot.date), "dd MMM yyyy")}
                                    </div>

                                    {/* Right: Time */}
                                    <div className="text-sm font-medium text-gray-900">
                                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

            )}
        </BaseDialogModal>
    );
};


export default PatientSlotModal
