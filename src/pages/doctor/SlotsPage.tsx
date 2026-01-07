import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddDoctorSlots from "@/components/pagesComp/doctor/AddDoctorSlots";
import DoctorSlots from "@/components/pagesComp/doctor/DoctorSlots";
import { showError } from "@/utils/toast";
import type { SlotResponseType } from "@/types";
import { deleteSlot, fetchMySlots } from "@/services/spring-apis/doctor.service";
import BaseDialogModal from "@/components/common/baseComp/BaseDialogModal";
import { sortSlotByDateTime } from "@/utils/sort/sortSlotsByDateTime";

const DoctorSlotsPage = () => {
    // 1. Local State for Data
    const [slots, setSlots] = useState<SlotResponseType[]>([]);
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Simple Fetch Function
    const fetchSlots = async () => {
        try {
            setLoading(true);
            const response = await fetchMySlots();
            setSlots(sortSlotByDateTime(response));
        } catch (error) {
            console.error(error);
            showError(error?.response?.data?.error || "Failed to load slots", "load-slots-error");
        } finally {
            setLoading(false);
        }
    };

    // Delete SLot
    const handleSlotDelete = async (id: number) => {
        try {
            setDeleteLoading(true);
            await deleteSlot(id);
            setSlots(prev => prev.filter(slot => slot.id !== id))
        } catch (error) {
            console.error(error);
            showError(error?.response?.data?.error || "Failed to delete slot", "delete-slot-error");
        } finally {
            setDeleteLoading(false);
        }
    }

    // 3. Load on Mount
    useEffect(() => {
        fetchSlots();
    }, []);

    return (
        <div>
            <div className="p-6 max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Manage Slots</h1>
                    <Button className="flex justify-center bg-brand hover:bg-brandHover cursor-pointer" onClick={() => setIsModalOpen(true)}>
                        <Plus className="w-4 h-4" /> Add Slot
                    </Button>
                </div>

                <DoctorSlots
                    slots={slots}
                    loading={loading}
                    onDelete={(id) => {
                        setSelectedSlotId(id);
                        setIsDeleteModalOpen(true);
                    }}
                />

                {/* Add Modal */}
                <AddDoctorSlots
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    onSuccess={fetchSlots}
                />

                <BaseDialogModal
                    open={isDeleteModalOpen}
                    onOpenChange={setIsDeleteModalOpen}
                    title="Confirm Delete Slot"
                    description="Are you sure you want to delete slot."
                >
                    <div className="flex gap-2 flex-row justify-end">
                        <Button
                            variant="outline"
                            className="border-primary"
                            onClick={() => {
                                setIsDeleteModalOpen(false);
                                setSelectedSlotId(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={async () => {
                                if (!selectedSlotId) return;
                                await handleSlotDelete(selectedSlotId);
                                setIsDeleteModalOpen(false);
                                setSelectedSlotId(null);
                            }}
                            disabled = {deleteLoading}
                        >
                            {deleteLoading ? "Deleting..." : "Confirm"}
                        </Button>
                    </div>

                </BaseDialogModal>

            </div>
        </div>
    );
};

export default DoctorSlotsPage;