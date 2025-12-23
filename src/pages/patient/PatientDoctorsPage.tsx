import DoctorCard from "@/components/common/DoctorCard";
import Loader from "@/components/common/Loader";
import { getAllDoctorsByDeptId } from "@/services/spring-apis/public.service";
import type { BaseDoctorResponse } from "@/types";
import { showError } from "@/utils/toast";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PatientDoctorsPage = () => {
    const [doctors, setDoctors] = useState<BaseDoctorResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const departmentId = searchParams.get("department")
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const res = await getAllDoctorsByDeptId(Number(departmentId));
                setDoctors(res);
            } catch (error) {
                console.error("Error Fetching Doctors: ", error);
                showError(error.response.data.error || "Could Not Fetch Doctors")
            } finally {
                setLoading(false);
            }
        };

        if (departmentId) fetchDoctors();
    }, [departmentId]);

    if (loading) return <Loader variant="dots" />;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map(doc => (
                <DoctorCard
                    key={doc.id}
                    doctor={doc}
                    button1Text="Book Slot"
                    onButton1={() => navigate(`/patient/doctor-slots`)}
                />
            ))}
        </div>
    );
};

export default PatientDoctorsPage
