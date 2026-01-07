import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';

// Public Route
import LandingPage from '@/pages/public/LandingPage';
import AdminLandingPage from '@/pages/admin/AdminLandingPage';

import AppLayout from '@/layout/AppLayout';

import NotFound from "@/pages/NotFound";
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AddDoctorPage from '@/pages/admin/AddDoctorPage';
import DoctorDashboard from '@/pages/doctor/DoctorDashboard';
import ProtectedLayout from '@/layout/ProtectedLayout';
import PublicAuthLayout from '@/layout/PublicAuthLayout';
import ChooseRolePage from '@/pages/ChooseRolePage';
import RootRedirect from '@/layout/RootRedirect';
import DoctorAppointmentsPage from '@/pages/doctor/DoctorAppointmentsPage';
import DoctorSlotsPage from '@/pages/doctor/SlotsPage';
import PatientDashboard from '@/pages/patient/PatientDashboard';
import PatientDepartmentsPage from '@/pages/patient/PatientDepartmentsPage';
import DoctorLayout from '@/layout/DoctorLayout';
import PatientLayout from '@/layout/PatientLayout';
import PatientDoctorsPage from '@/pages/patient/PatientDoctorsPage';
import PatientAppointmentsPage from '@/pages/patient/PatientAppointmentsPage';
import PatientMedicalRecordPage from '@/pages/patient/PatientMedicalRecordPage';
import AdminLayout from '@/layout/AdminLayout';
import CompleteAppointmentPage from '@/pages/doctor/CompleteAppointmentPage';
import PrescriptionPage from '@/pages/common/PrescriptionPage';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>

                    <Route path="/" element={<RootRedirect />} />

                    <Route element={<PublicAuthLayout />}>
                        <Route path="/login" element={<LandingPage />} />
                        <Route path="/signup" element={<LandingPage />} />
                        <Route path="/admin-login" element={<AdminLandingPage />} />
                    </Route>

                    {/* ::: Private Routes ::: */}
                    <Route element={<ProtectedLayout />}>
                        <Route path="/choose-role" element={<ChooseRolePage />} />

                        {/* DOCTOR */}
                        <Route path="/doctor" element={<DoctorLayout />}>
                            <Route path="dashboard" element={<DoctorDashboard />} />
                            <Route path="appointments" element={<DoctorAppointmentsPage />} />
                            <Route path="appointments/:id/complete" element={<CompleteAppointmentPage />} />
                            <Route path="appointment-details/:id" element={<PrescriptionPage />} />
                            <Route path="slots" element={<DoctorSlotsPage />} />
                        </Route>


                        {/* ADMIN */}
                        <Route path='/admin' element={<AdminLayout />}>
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="doctor" element={<AddDoctorPage />} />
                        </Route>


                        {/* PATIENT */}
                        <Route path='/patient' element={<PatientLayout />}>
                            <Route path='dashboard' element={<PatientDashboard />} />
                            <Route path='departments' element={<PatientDepartmentsPage />} />
                            <Route path='doctors' element={<PatientDoctorsPage />} />
                            <Route path='appointments' element={<PatientAppointmentsPage />} />
                            <Route path='appointment-details/:id' element={<PrescriptionPage />} />
                            <Route path='records' element={<PatientMedicalRecordPage />} />
                        </Route>

                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>

    )
}

export default AppRoutes;