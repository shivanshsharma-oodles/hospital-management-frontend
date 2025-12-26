import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasePageForm from "@/components/common/baseComp/BasePageForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showError, showSuccess } from "@/utils/toast";
import { MEDICAL_RECORD_FORM } from "@/utils/constants";
import type { MedicalRecordRequest } from "@/types";
import { completeAppointment } from "@/services/spring-apis/doctor.service";

interface MedicalRecordFormProps {
  appointmentId: number;
  showGoBack?: boolean;
  goBackRoute?: string;
  onSubmitSuccess?: () => void;
}

const MedicalRecordForm = ({
  appointmentId,
  showGoBack = true,
  goBackRoute = "/doctor/appointments",
  onSubmitSuccess
}: MedicalRecordFormProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const payload: MedicalRecordRequest = {
      symptoms: fd.get("symptoms") as string,
      diagnosis: fd.get("diagnosis") as string,
      prescription: fd.get("prescription") as string,
      treatment: fd.get("treatment") as string,
      followUpDate: fd.get("followUpDate") as string,
      temperature: fd.get("temperature") ? Number(fd.get("temperature")) : undefined,
      pulse: fd.get("pulse") ? Number(fd.get("pulse")) : undefined,
      bpSystolic: fd.get("bpSystolic") ? Number(fd.get("bpSystolic")) : undefined,
      bpDiastolic: fd.get("bpDiastolic") ? Number(fd.get("bpDiastolic")) : undefined,
    };

    try {
      setLoading(true);
      await completeAppointment(appointmentId, payload);
      showSuccess("Appointment completed & medical record saved.");
      onSubmitSuccess?.();
      navigate(goBackRoute, {
        state: { appointmentCompleted: true }
      });

    } catch (err: any) {
      console.error(err);
      showError(err?.response?.data?.error || "Failed to complete appointment");
    } finally {
      setLoading(false);
    }
  };

  const medForm = MEDICAL_RECORD_FORM;

  return (
    <BasePageForm
      className="py-5 my-3"
      title={medForm.TITLE}
      description={medForm.DESCRIPTION}
      showGoBack={showGoBack}
      goBackLabel={medForm.BUTTONS.GO_BACK}
      onGoBack={() => navigate(goBackRoute)}
      onSubmit={handleSubmit}
      maxWidth="2xl"
    >
      <div className="space-y-8">

        {/* Symptoms */}
        <div className="space-y-2">
          <Label htmlFor={medForm.FIELDS.SYMPTOMS.id}>
            {medForm.FIELDS.SYMPTOMS.label} *
          </Label>
          <Textarea
            id={medForm.FIELDS.SYMPTOMS.id}
            name={medForm.FIELDS.SYMPTOMS.id}
            placeholder={medForm.FIELDS.SYMPTOMS.placeholder}
            required
          />
        </div>

        {/* Diagnosis */}
        <div className="space-y-2">
          <Label htmlFor={medForm.FIELDS.DIAGNOSIS.id}>
            {medForm.FIELDS.DIAGNOSIS.label} *
          </Label>
          <Textarea
            id={medForm.FIELDS.DIAGNOSIS.id}
            name={medForm.FIELDS.DIAGNOSIS.id}
            placeholder={medForm.FIELDS.DIAGNOSIS.placeholder}
            required
          />
        </div>

        {/* Treatment */}
        <div className="space-y-2">
          <Label htmlFor={medForm.FIELDS.TREATMENT.id}>
            {medForm.FIELDS.TREATMENT.label}
          </Label>
          <Textarea
            id={medForm.FIELDS.TREATMENT.id}
            name={medForm.FIELDS.TREATMENT.id}
            placeholder={medForm.FIELDS.TREATMENT.placeholder}
          />
        </div>

        {/* Prescription */}
        <div className="space-y-2">
          <Label htmlFor={medForm.FIELDS.PRESCRIPTION.id}>
            {medForm.FIELDS.PRESCRIPTION.label} *
          </Label>
          <Textarea
            id={medForm.FIELDS.PRESCRIPTION.id}
            name={medForm.FIELDS.PRESCRIPTION.id}
            placeholder={medForm.FIELDS.PRESCRIPTION.placeholder}
            required
          />
        </div>

        {/* Follow-up date */}
        <div className="space-y-2">
          <Label htmlFor={medForm.FIELDS.FOLLOW_UP_DATE.id}>
            {medForm.FIELDS.FOLLOW_UP_DATE.label}
          </Label>
          <Input
            id={medForm.FIELDS.FOLLOW_UP_DATE.id}
            name={medForm.FIELDS.FOLLOW_UP_DATE.id}
            type="date"
          />
        </div>

        {/* Vitals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="temperature" placeholder="Temperature (°C)" type="text" />
          <Input name="pulse" placeholder="Pulse (bpm)" type="text" />
          <Input name="bpSystolic" placeholder="BP Systolic" type="text" />
          <Input name="bpDiastolic" placeholder="BP Diastolic" type="text" />
        </div>

      </div>

      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button type="submit" className="bg-green-700 hover:bg-green-800" disabled={loading}>
          {loading ? medForm.BUTTONS.SUBMITTING : medForm.BUTTONS.SUBMIT}
        </Button>
      </div>
    </BasePageForm>
  );
};

export default MedicalRecordForm;