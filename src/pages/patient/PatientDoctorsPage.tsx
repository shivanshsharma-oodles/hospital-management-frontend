import ConfirmationPopup from "@/components/common/ConfirmationPopup";
import DoctorCard from "@/components/common/DoctorCard";
import { TickIcon } from "@/components/common/Icons";
import Loader from "@/components/common/Loader";
import PatientSlotModal from "@/components/pagesComp/patient/PatientSlotModal";
import { getAllDoctorsByDeptId } from "@/services/spring-apis/public.service";
import type { BaseDoctorResponse } from "@/types";
import { showError } from "@/utils/toast";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PatientDoctorsPage = () => {
    const [doctors, setDoctors] = useState<BaseDoctorResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const [showSlotModal, setShowSlotModal] = useState(false);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [selectedDoctor, setSelectedDoctor] =
        useState<BaseDoctorResponse | null>(null);

    const departmentId = searchParams.get("department");
    const departmentName = searchParams.get("departmentName");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const res = await getAllDoctorsByDeptId(Number(departmentId));
                setDoctors(res);
            } catch (error: any) {
                showError(
                    error?.response?.data?.error || "Could not fetch doctors"
                );
            } finally {
                setLoading(false);
            }
        };

        if (departmentId) fetchDoctors();
    }, [departmentId]);

    if (loading) return <Loader variant="dots" />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Page Header */}
            <div className="mb-8">
                <p className="text-sm text-gray-500 mb-1">Department</p>
                <h1 className="text-3xl font-bold text-gray-900">
                    {departmentName || "Doctors"}
                </h1>
                <p className="mt-2 text-gray-600 max-w-2xl">
                    Choose a doctor to view available slots and book your appointment.
                </p>
            </div>

            {/* Doctors Grid */}
            {doctors.length === 0
                ? <div className="text-gray-500 justify-center flex itmes-center">
                    <p> No Doctors Available Right Now</p>
                </div>
                : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doc) => (
                        <DoctorCard
                            key={doc.id}
                            doctor={doc}
                            button1Text="Book Slot"
                            onButton1={() => {
                                setShowConfirmationPopup(false);
                                setSelectedDoctor(doc);
                                setShowSlotModal(true);
                            }}
                        />
                    ))}
                </div>
            }

            {/* Slot Modal */}
            {selectedDoctor && (
                <PatientSlotModal
                    open={showSlotModal}
                    onOpenChange={() => {
                        setShowSlotModal(false);
                        setSelectedDoctor(null);
                    }}
                    setShowConfirmation={setShowConfirmationPopup}
                    doctorId={selectedDoctor.id}
                    doctorName={selectedDoctor.name}
                />
            )}

            {
                showConfirmationPopup &&
                <ConfirmationPopup
                    isModalOpen={showConfirmationPopup}
                    setIsModalOpen={setShowConfirmationPopup}
                    title="Appointment Requested"
                    description="Please wait, while the doctor accept the appointment."
                    icon={<TickIcon />}
                    actions={[
                        {
                            label: "Close",
                            variant: "outline",
                            onClick: () => setShowConfirmationPopup(false),
                        },
                        {
                            label: "Appointments ➤",
                            variant: "confirm",
                            onClick: () => {
                                setShowConfirmationPopup(false)
                                navigate("/patient/appointments")
                            },
                        },
                    ]}
                />
            }
        </div>
    );
};


export default PatientDoctorsPage
