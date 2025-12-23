import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddDoctorSlots from "@/components/pagesComp/doctor/AddDoctorSlots";
import DoctorSlots from "@/components/pagesComp/doctor/DoctorSlots";
import { showError } from "@/utils/toast";
import type { SlotResponseType } from "@/types";
import { fetchMySlots } from "@/services/spring-apis/doctor.service";
import DoctorNavbar from "@/components/pagesComp/doctor/DoctorNavbar";

const DoctorSlotsPage = () => {
    // 1. Local State for Data
    const [slots, setSlots] = useState<SlotResponseType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 2. Simple Fetch Function
    const fetchSlots = async () => {
        try {
            setLoading(true);
            const response = await fetchMySlots();
            setSlots(response);
        } catch (error) {
            console.error(error);
            showError("Failed to load slots", "load-slots-error");
        } finally {
            setLoading(false);
        }
    };

    // 3. Load on Mount
    useEffect(() => {
        fetchSlots();
    }, []);

    return (
        <div>
            <DoctorNavbar />
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
                    // if need delete feature just pass the function
                    onDelete={(id) => console.log("Delete logic here", id)}
                />

                {/* Add Modal */}
                <AddDoctorSlots
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    onSuccess={fetchSlots}
                />

            </div>
        </div>
    );
};

export default DoctorSlotsPage;