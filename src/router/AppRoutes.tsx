import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';
// Public Route
import LandingPage from '@/pages/public/LandingPage';
// import AuthCallback from '@/components/auth/AuthCallback'

// Layouts
// import ProtectedLayout from '@/layout/ProtectedLayout';

// Protected Routes

// Invalid Route
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                {/* ::: Private Routes ::: */}
                {/* <Route element={<ProtectedLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route> */}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>

    )
}

export default AppRoutes;