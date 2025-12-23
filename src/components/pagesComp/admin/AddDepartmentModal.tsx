import React, { useState } from "react";
import BaseDialogModal from "@/components/common/baseComp/BaseDialogModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ADD_DEPARTMENT_FORM } from "@/utils/constants";
import { addDepartment } from "@/services/spring-apis/admin.service";
import { showError, showSuccess } from "@/utils/toast";
import type { DepartmentResponse } from "@/types";

interface AddDepartmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleAddDepartment: (newDepartment: DepartmentResponse) => void
}

const AddDepartmentModal = ({
  open,
  onOpenChange,
  handleAddDepartment
}: AddDepartmentModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: API call
      console.log("Form data:", formData);
      const createdDepartment = await addDepartment(formData);

      // After successful submission
      onOpenChange(false);

      // Reset form
      resetData()
      handleAddDepartment(createdDepartment)
      showSuccess("Department Added", "department-add-success")
    } catch (error) {
      console.error("Error adding department:", error);
      showError(error.response.data.error, "department-add-failure");

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
      name: "",
      description: "",
    });
  };


  return (
    <BaseDialogModal
      open={open}
      onOpenChange={onOpenChange}
      title={ADD_DEPARTMENT_FORM.TITLE}
      description={ADD_DEPARTMENT_FORM.DESCRIPTION}
      showCross={false}
    >

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={ADD_DEPARTMENT_FORM.FIELDS.NAME.id}>
            {ADD_DEPARTMENT_FORM.FIELDS.NAME.label} *
          </Label>

          <Input
            id={ADD_DEPARTMENT_FORM.FIELDS.NAME.id}
            name={ADD_DEPARTMENT_FORM.FIELDS.NAME.id}
            placeholder={ADD_DEPARTMENT_FORM.FIELDS.NAME.placeholder}
            value={formData.name}
            onChange={handleChange}
            required={ADD_DEPARTMENT_FORM.FIELDS.NAME.required}
            minLength={1}
            maxLength={40}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={ADD_DEPARTMENT_FORM.FIELDS.DESCRIPTION.id}>
            {ADD_DEPARTMENT_FORM.FIELDS.DESCRIPTION.label} *
          </Label>

          <Textarea
            id={ADD_DEPARTMENT_FORM.FIELDS.DESCRIPTION.id}
            name={ADD_DEPARTMENT_FORM.FIELDS.DESCRIPTION.id}
            placeholder={ADD_DEPARTMENT_FORM.FIELDS.DESCRIPTION.placeholder}
            value={formData.description}
            onChange={handleChange}
            required={ADD_DEPARTMENT_FORM.FIELDS.DESCRIPTION.required}
            className="overflow-y-auto max-h-88 custom-scrollbar"
            minLength={10}
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
            {ADD_DEPARTMENT_FORM.BUTTONS.CANCEL}
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : ADD_DEPARTMENT_FORM.BUTTONS.SUBMIT}
          </Button>

        </div>
      </form>
    </BaseDialogModal>
  );
};

export default AddDepartmentModal;