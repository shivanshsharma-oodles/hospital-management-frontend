import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PatientNavbar from "@/components/pagesComp/patient/PatientNavbar";
import Loader from "@/components/common/Loader";
import { fetchPatient } from "@/services/spring-apis/patient.service";
import type { CompletePatientResponse } from "@/types";
import { showError } from "@/utils/toast";

const PatientLayout = () => {
  const [patient, setPatient] = useState<CompletePatientResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        setLoading(true);
        const res = await fetchPatient();
        setPatient(res);
      } catch (err: any) {
        showError(err?.response?.data?.error || "Failed to load patient data");
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, []);

  if (loading) return <Loader variant="dots" />;

  return (
    <div className="h-screen overflow-auto">
      <PatientNavbar patient={patient} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet context={{ patient }} />
      </main>
    </div>
  );
};

export default PatientLayout;
