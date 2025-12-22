import React, { useState } from "react";
import BaseDialogModal from "@/components/common/baseComp/BaseDialogModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Add_Doctor_Slot_Form } from "@/utils/constants";
import { showError, showSuccess } from "@/utils/toast";
import { addSlots } from "@/services/spring-apis/doctor.service";

interface AddDoctorSlotProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const AddDoctorSlots = ({
    open,
    onOpenChange,
}: AddDoctorSlotProps) => {
    const [formData, setFormData] = useState({
        date: "",
        startTime: "",
        endTime: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (formData.startTime >= formData.endTime) {
            showError("Start time must be before end time", "slot-time-error");
            setLoading(false);
            return;
        }

        try {
            await addSlots(formData);
            showSuccess("Slot Added", "slot-add-success");
            resetData();
            onOpenChange(false);
        } catch (error: any) {
            showError(error?.response?.data?.error || "Failed to add slot", "slot-add-failure");
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetData = () => {
        setFormData({
            date: "",
            startTime: "",
            endTime: ""
        });
    };

    const formFields = Add_Doctor_Slot_Form.FIELDS;

    return (
        <BaseDialogModal
            open={open}
            onOpenChange={onOpenChange}
            title={Add_Doctor_Slot_Form.TITLE}
            description={Add_Doctor_Slot_Form.DESCRIPTION}
            showCross={false}
        >

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Date */}
                <div className="space-y-2">
                    <Label htmlFor={formFields.DATE.id}>
                        {formFields.DATE.label} *
                    </Label>

                    <Input
                        id={formFields.DATE.id}
                        type={formFields.DATE.type}

                        name={formFields.DATE.id}
                        placeholder={formFields.DATE.placeholder}
                        value={formData.date}
                        onChange={handleChange}
                        required={formFields.DATE.required}
                    />
                </div>

                {/* Start Time */}
                <div className="space-y-2">
                    <Label htmlFor={formFields.START_TIME.id}>
                        {formFields.START_TIME.label} *
                    </Label>

                    <Input
                        id={formFields.START_TIME.id}
                        name={formFields.START_TIME.id}
                        type={formFields.START_TIME.type}
                        placeholder={formFields.START_TIME.placeholder}
                        value={formData.startTime}
                        onChange={handleChange}
                        required={formFields.START_TIME.required}

                    />
                </div>

                {/* End Time */}
                <div className="space-y-2">
                    <Label htmlFor={formFields.END_TIME.id}>
                        {formFields.END_TIME.label} *
                    </Label>

                    <Input
                        id={formFields.END_TIME.id}
                        name={formFields.END_TIME.id}
                        type={formFields.END_TIME.type}
                        placeholder={formFields.END_TIME.placeholder}
                        value={formData.endTime}
                        onChange={handleChange}
                        required={formFields.END_TIME.required}
                    />
                </div>


                <div className="flex gap-4 items-center justify-end">
                    <Button
                        type="reset"
                        variant="outline"
                        onClick={() => {
                            resetData();
                            onOpenChange(false);
                        }}
                    >
                        {Add_Doctor_Slot_Form.BUTTONS.CANCEL}
                    </Button>

                    <Button type="submit" disabled={loading}>
                        {loading ? "Adding..." : Add_Doctor_Slot_Form.BUTTONS.SUBMIT}
                    </Button>

                </div>
            </form>
        </BaseDialogModal>
    );
};

export default AddDoctorSlots;