import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useActiveRole } from "@/con/ActiveRoleContext";

const RootRedirect = () => {
  const { user, roles, loading } = useAuthUser();
  const { activeRole } = useActiveRole();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (activeRole) {
    return <Navigate to={`/${activeRole.toLowerCase()}-dashboard`} replace />;
  }

  if (roles.length > 1) {
    return <Navigate to="/choose-role" replace />;
  }

  return <Navigate to={`/${roles[0].toLowerCase()}-dashboard`} replace />;
};

export default RootRedirect;
