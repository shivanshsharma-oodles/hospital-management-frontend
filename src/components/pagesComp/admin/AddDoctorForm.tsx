// src/components/pagesComp/dashboardComp/admin/AddDoctorForm.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasePageForm from "@/components/common/baseComp/BasePageForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createDoctor } from "@/services/spring-apis/admin.service";
import { showError, showSuccess } from "@/utils/toast";
import { ADD_DOCTOR_FORM, GENDER_OPTIONS } from "@/utils/constants";
import type { DoctorRequestPayload, Gender } from "@/types";
import { useGetDepartments } from "@/hooks/useGetDepartment";

/**
 * AddDoctorForm
 *
 * Admin form to create a doctor wrapped in BasePageForm.
 *
 * Architecture decisions:
 * - Departments are fetched via useGetDepartments (single source of truth)
 * - Form fields are UNCONTROLLED
 * - Payload is built using FormData
 * - Only local state is `loading` for submit UX
 */

interface AddDoctorFormProps {
  showGoBack?: boolean;
  goBackRoute?: string;
  onSubmitSuccess?: () => void;
}

const AddDoctorForm = ({
  showGoBack = true,
  goBackRoute = "/admin/dashboard",
  onSubmitSuccess
}: AddDoctorFormProps) => {
  const navigate = useNavigate();
  const { departments, loadingDepartments } = useGetDepartments();

  const [loading, setLoading] = useState(false);

  /**
   * Form submit handler
   * Reads values strictly from FormData
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const payload: DoctorRequestPayload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      password: fd.get("password") as string,
      dob: fd.get("dob") as string,
      gender: fd.get("gender") as Gender,
      departmentId: Number(fd.get("departmentId")),
      address: {
        street: fd.get("address.street") as string,
        city: fd.get("address.city") as string,
        state: fd.get("address.state") as string,
        zip: fd.get("address.zip") as string,
      },
    };

    try {
      setLoading(true);
      await createDoctor(payload);
      showSuccess("Doctor added successfully");
      onSubmitSuccess?.();
      navigate(goBackRoute);
    } catch (err: any) {
      showError(err?.response?.data?.error || "Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(goBackRoute);
  };

  return (
    <BasePageForm
      className="py-5 my-3"
      title={ADD_DOCTOR_FORM.TITLE}
      description={ADD_DOCTOR_FORM.DESCRIPTION}
      showGoBack={showGoBack}
      onGoBack={handleGoBack}
      goBackLabel={ADD_DOCTOR_FORM.BUTTONS.GO_BACK}
      onSubmit={handleSubmit}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {ADD_DOCTOR_FORM.SECTIONS.PERSONAL}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor={ADD_DOCTOR_FORM.FIELDS.NAME.id}>
                {ADD_DOCTOR_FORM.FIELDS.NAME.label}
                {ADD_DOCTOR_FORM.FIELDS.NAME.required && <span className="text-red-500"> *</span>}
              </Label>
              <Input
                id={ADD_DOCTOR_FORM.FIELDS.NAME.id}
                name={ADD_DOCTOR_FORM.FIELDS.NAME.id}
                placeholder={ADD_DOCTOR_FORM.FIELDS.NAME.placeholder}
                required={ADD_DOCTOR_FORM.FIELDS.NAME.required}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor={ADD_DOCTOR_FORM.FIELDS.EMAIL.id}>
                {ADD_DOCTOR_FORM.FIELDS.EMAIL.label}
                {ADD_DOCTOR_FORM.FIELDS.EMAIL.required && <span className="text-red-500"> *</span>}
              </Label>
              <Input
                id={ADD_DOCTOR_FORM.FIELDS.EMAIL.id}
                name={ADD_DOCTOR_FORM.FIELDS.EMAIL.id}
                type="email"
                placeholder={ADD_DOCTOR_FORM.FIELDS.EMAIL.placeholder}
                required={ADD_DOCTOR_FORM.FIELDS.EMAIL.required}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor={ADD_DOCTOR_FORM.FIELDS.PHONE.id}>
                {ADD_DOCTOR_FORM.FIELDS.PHONE.label}
                {ADD_DOCTOR_FORM.FIELDS.PHONE.required && <span className="text-red-500"> *</span>}
              </Label>
              <Input
                id={ADD_DOCTOR_FORM.FIELDS.PHONE.id}
                name={ADD_DOCTOR_FORM.FIELDS.PHONE.id}
                type="tel"
                placeholder={ADD_DOCTOR_FORM.FIELDS.PHONE.placeholder}
                required={ADD_DOCTOR_FORM.FIELDS.PHONE.required}
                minLength={10}
                maxLength={10}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor={ADD_DOCTOR_FORM.FIELDS.PASSWORD.id}>
                {ADD_DOCTOR_FORM.FIELDS.PASSWORD.label}
                {ADD_DOCTOR_FORM.FIELDS.PASSWORD.required && <span className="text-red-500"> *</span>}
              </Label>
              <Input

                id={ADD_DOCTOR_FORM.FIELDS.PASSWORD.id}
                name={ADD_DOCTOR_FORM.FIELDS.PASSWORD.id}
                type="password"
                placeholder={ADD_DOCTOR_FORM.FIELDS.PASSWORD.placeholder}
                required={ADD_DOCTOR_FORM.FIELDS.PASSWORD.required}
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor={ADD_DOCTOR_FORM.FIELDS.DOB.id}>
                {ADD_DOCTOR_FORM.FIELDS.DOB.label}
                {ADD_DOCTOR_FORM.FIELDS.DOB.required && <span className="text-red-500"> *</span>}
              </Label>
              <Input
                id={ADD_DOCTOR_FORM.FIELDS.DOB.id}
                name={ADD_DOCTOR_FORM.FIELDS.DOB.id}
                type="date"
                required={ADD_DOCTOR_FORM.FIELDS.DOB.required}
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender-select">
                {ADD_DOCTOR_FORM.FIELDS.GENDER.label}
                {ADD_DOCTOR_FORM.FIELDS.GENDER.required && <span className="text-red-500"> *</span>}
              </Label>
              <select
                id="gender-select"
                required={ADD_DOCTOR_FORM.FIELDS.GENDER.required}
                onChange={(e) => {
                  (document.getElementById("gender") as HTMLInputElement).value = e.target.value;
                }}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option value="">{ADD_DOCTOR_FORM.FIELDS.GENDER.placeholder}</option>
                {GENDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input type="hidden" name={ADD_DOCTOR_FORM.FIELDS.GENDER.id} id="gender" />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department-select">
                {ADD_DOCTOR_FORM.FIELDS.DEPARTMENT.label}
                {ADD_DOCTOR_FORM.FIELDS.DEPARTMENT.required && <span className="text-red-500"> *</span>}
              </Label>
              <select
                id="department-select"
                name={ADD_DOCTOR_FORM.FIELDS.DEPARTMENT.id}
                required={ADD_DOCTOR_FORM.FIELDS.DEPARTMENT.required}
                disabled={loadingDepartments}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option value="">{ADD_DOCTOR_FORM.FIELDS.DEPARTMENT.placeholder}</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {ADD_DOCTOR_FORM.SECTIONS.ADDRESS}
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {/* Street */}
            <div className="space-y-2">
              <Label htmlFor={ADD_DOCTOR_FORM.ADDRESS_FIELDS.STREET.id}>
                {ADD_DOCTOR_FORM.ADDRESS_FIELDS.STREET.label}
              </Label>
              <Input
                id={ADD_DOCTOR_FORM.ADDRESS_FIELDS.STREET.id}
                name={ADD_DOCTOR_FORM.ADDRESS_FIELDS.STREET.id}
                placeholder={ADD_DOCTOR_FORM.ADDRESS_FIELDS.STREET.placeholder}
                required={ADD_DOCTOR_FORM.ADDRESS_FIELDS.STREET.required}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* City */}
              <div className="space-y-2">
                <Label htmlFor={ADD_DOCTOR_FORM.ADDRESS_FIELDS.CITY.id}>
                  {ADD_DOCTOR_FORM.ADDRESS_FIELDS.CITY.label}
                </Label>
                <Input
                  id={ADD_DOCTOR_FORM.ADDRESS_FIELDS.CITY.id}
                  name={ADD_DOCTOR_FORM.ADDRESS_FIELDS.CITY.id}
                  placeholder={ADD_DOCTOR_FORM.ADDRESS_FIELDS.CITY.placeholder}
                  required={ADD_DOCTOR_FORM.ADDRESS_FIELDS.CITY.required}
                />
              </div>

              {/* State */}
              <div className="space-y-2">
                <Label htmlFor={ADD_DOCTOR_FORM.ADDRESS_FIELDS.STATE.id}>
                  {ADD_DOCTOR_FORM.ADDRESS_FIELDS.STATE.label}
                </Label>
                <Input
                  id={ADD_DOCTOR_FORM.ADDRESS_FIELDS.STATE.id}
                  name={ADD_DOCTOR_FORM.ADDRESS_FIELDS.STATE.id}
                  placeholder={ADD_DOCTOR_FORM.ADDRESS_FIELDS.STATE.placeholder}
                  required={ADD_DOCTOR_FORM.ADDRESS_FIELDS.STATE.required}
                />
              </div>

              {/* Zip Code */}
              <div className="space-y-2">
                <Label htmlFor={ADD_DOCTOR_FORM.ADDRESS_FIELDS.ZIP.id}>
                  {ADD_DOCTOR_FORM.ADDRESS_FIELDS.ZIP.label}
                </Label>
                <Input
                  id={ADD_DOCTOR_FORM.ADDRESS_FIELDS.ZIP.id}
                  name={ADD_DOCTOR_FORM.ADDRESS_FIELDS.ZIP.id}
                  placeholder={ADD_DOCTOR_FORM.ADDRESS_FIELDS.ZIP.placeholder}
                  required={ADD_DOCTOR_FORM.ADDRESS_FIELDS.ZIP.required}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-3 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handleGoBack}
          disabled={loading}
        >
          {ADD_DOCTOR_FORM.BUTTONS.CANCEL}
        </Button>
        <Button type="submit" disabled={loading || loadingDepartments}>
          {loading ? ADD_DOCTOR_FORM.BUTTONS.SUBMITTING : ADD_DOCTOR_FORM.BUTTONS.SUBMIT}
        </Button>
      </div>
    </BasePageForm>
  );
};

export default AddDoctorForm;