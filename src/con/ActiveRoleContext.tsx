// context/ActiveRoleContext.tsx

import React, { createContext, useContext, useState } from "react";
import type { Role } from "@/types";

/**
 * Shape of the Active Role Context.
 * 
 * activeRole:
 *   - The role the user is currently acting as (ADMIN / DOCTOR / PATIENT)
 *   - This is NOT authentication, only UI context.
 *
 * setActiveRole:
 *   - Updates the active role for the current session.
 */
interface ActiveRoleContextType {
  activeRole: Role | null;
  setActiveRole: (role: Role | null) => void;
}

/**
 * Create the context.
 * Initial value is null because context MUST be provided by ActiveRoleProvider before usage.
 */
const ActiveRoleContext = createContext<ActiveRoleContextType | null>(null);

/**
 * Provider component.
 * 
 * This component:
 * - Holds the activeRole state
 * - Makes activeRole and setActiveRole available to all child components
 */
export const ActiveRoleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeRole, setActiveRole] = useState<Role | null>(null);

  return (
    <ActiveRoleContext.Provider value={{ activeRole, setActiveRole }}>
      {children}
    </ActiveRoleContext.Provider>
  );
};

/**
 * Custom hook to consume ActiveRoleContext safely.
 * 
 * Why a hook?
 *  - Prevents repetitive useContext calls
 *  - Provides better developer experience
 *  - Ensures the hook is used inside the provider
 */
export const useActiveRole = () => {
  const context = useContext(ActiveRoleContext);

  if (!context) {
    throw new Error(
      "useActiveRole must be used inside ActiveRoleProvider"
    );
  }

  return context;
};