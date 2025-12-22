import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';

// Public Route
import LandingPage from '@/pages/public/LandingPage';
import AdminLandingPage from '@/pages/admin/AdminLandingPage';

// Layouts
// import ProtectedLayout from '@/layout/ProtectedLayout';
import AppLayout from '@/layout/AppLayout';

// Protected Routes

// Invalid Route
import NotFound from "@/pages/NotFound";
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AddDoctorPage from '@/pages/admin/AddDoctorPage';
import DoctorDashboard from '@/pages/doctor/DoctorDashboard';
import ProtectedLayout from '@/layout/ProtectedLayout';
import PublicAuthLayout from '@/layout/PublicAuthLayout';
import ChooseRolePage from '@/pages/ChooseRolePage';
import RootRedirect from '@/layout/RootRedirect';
import DoctorAppointmentsPage from '@/pages/doctor/DoctorAppointmentsPage';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>

                    <Route path="/" element={<RootRedirect />} />

                    <Route element={<PublicAuthLayout />}>
                        <Route path="/login" element={<LandingPage />} />
                        <Route path="/signup" element={<LandingPage />} />
                        <Route path="/admin-secure-login" element={<AdminLandingPage />} />
                    </Route>

                    {/* ::: Private Routes ::: */}
                    <Route element={<ProtectedLayout />}>
                        <Route path="/choose-role" element={<ChooseRolePage />} />

                        {/* DOCTOR */}
                        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                        <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />


                        {/* ADMIN */}
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/doctor" element={<AddDoctorPage />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>

    )
}

export default AppRoutes;