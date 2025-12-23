import React, { useEffect } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { useActiveRole } from "@/context/ActiveRoleContext";

/**
 * ProtectedLayout Component
 * * Acts as a wrapper for all private routes. It handles:
 * 1. Authentication verification.
 * 2. Role validation (ensures an active role is selected).
 * 3. Automatic role assignment for single-role users.
 * 4. Namespace protection (restricts users to routes matching their active role).
 */
const ProtectedLayout = () => {
  const { user, loading, roles } = useAuthUser();
  const { activeRole, setActiveRole } = useActiveRole();
  const location = useLocation();

  useEffect(() => {
    // If activeRole is set, but the User is not in actual roles
    if (activeRole && roles.length > 0 && !roles.includes(activeRole)) {
      console.warn("Security Alert: Role Mismatch/Manipulation detected.");
      setActiveRole(null); // Reset active role
    }
  }, [activeRole, roles, setActiveRole]);

  /**
   * Effect: Automatic Role Assignment
   * * If the authenticated user possesses exactly one role and no active role is currently set,
   * automatically set that role as the active role. This bypasses the selection screen
   * for a seamless user experience.
   */

  useEffect(() => {
    if (!activeRole && roles.length === 1) {
      setActiveRole(roles[0]);
    }
  }, [activeRole, roles, setActiveRole]);

  // 1. Loading State: Wait for authentication to resolve
  if (loading) return <Loader />;

  // 2. Authentication Guard: Redirect unauthenticated users to the landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 3. Active Role Check
  if (!activeRole) {
    // Scenario A: User has multiple roles (e.g., Doctor & Admin)
    // Redirect them to the role selection interface.
    if (roles.length > 1) {
      // Allow rendering if the user is already on the selection page to prevent redirect loops.
      if (location.pathname === "/choose-role") {
        return <Outlet />;
      }
      return <Navigate to="/choose-role" replace />;
    }

    // Scenario B: User has a single role
    // The `useEffect` above triggers the state update.
    // Display a loader while the state synchronizes to prevent race conditions or premature redirects.
    return <Loader />;
  }

  // 4. Namespace Guard
  // Ensure the user is accessing routes strictly within their active role's namespace.
  // Example: A user with activeRole 'DOCTOR' cannot access '/admin/*' routes.
  const roleNamespace = `/${activeRole.toLowerCase()}`;
  if (!location.pathname.startsWith(roleNamespace)) {
    // Redirect to the dashboard of the current active role
    return <Navigate to={`${roleNamespace}-dashboard`} replace />;
  }

  // 5. Render Authorized Content
  return <Outlet />;
};

export default ProtectedLayout;