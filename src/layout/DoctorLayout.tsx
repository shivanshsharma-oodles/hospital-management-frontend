import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DoctorNavbar from "@/components/pagesComp/doctor/DoctorNavbar";
import Loader from "@/components/common/Loader";
import { fetchDoctor } from "@/services/spring-apis/doctor.service";
import type { CompleteDoctorResponse } from "@/types";
import { showError } from "@/utils/toast";

const DoctorLayout = () => {
  const [doctor, setDoctor] = useState<CompleteDoctorResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        setLoading(true);
        const res = await fetchDoctor();
        setDoctor(res);
      } catch (err: any) {
        showError(err?.response?.data?.error || "Failed to load doctor data");
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, []);

  if (loading) return <Loader variant="dots" />;

  return (
    <div className="h-screen overflow-auto">
      <DoctorNavbar doctor={doctor} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet context={{ doctor }} />
      </main>
    </div>
  );
};

export default DoctorLayout;
