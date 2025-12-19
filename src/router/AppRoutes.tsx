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

const AppRoutes = () => {
    return (
        <BrowserRouter>
        <AppLayout>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<LandingPage />} />

                <Route path="/admin-secure-login" element={<AdminLandingPage />} />

                {/* ::: Private Routes ::: */}
                {/* <Route element={<ProtectedLayout />}> */}
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                {/* </Route> */}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </AppLayout> 
        </BrowserRouter>

    )
}

export default AppRoutes;