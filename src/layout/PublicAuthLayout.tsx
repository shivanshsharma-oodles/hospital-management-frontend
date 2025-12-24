import { useActiveRole } from '@/context/ActiveRoleContext';
import { useAuthUser } from '@/hooks/useAuthUser'
import { Loader } from 'lucide-react';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PublicAuthLayout = () => {

    const {user, loading} = useAuthUser();
    const {activeRole} = useActiveRole();

    if(loading) return <Loader />

    // Already logged in? -> redirect
    if(user && activeRole){
        return (
            <Navigate
            to={`${activeRole.toLowerCase()}/dashboard`}
            replace/>
        )
    }

    if(user && !activeRole){
        return (
            <Navigate
            to={`choose-role`}
            replace/>
        )
    }

    return (
       <Outlet />
    )
}

export default PublicAuthLayout
