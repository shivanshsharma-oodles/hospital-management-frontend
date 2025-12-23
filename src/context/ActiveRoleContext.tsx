// context/ActiveRoleContext.tsx

import React, { createContext, useContext, useState } from "react";
import type { Role } from "@/types";


interface ActiveRoleContextType {
  /**
   * The role currently selected by the user for the UI session.
   * This drives the UI logic (like, which Dashboard to show).
   * Note: This is NOT the security source of truth; the Auth Token is.
   */
  activeRole: Role | null;

  /**
   * Updates the active role in both React State (for UI reactivity)
   * and Session Storage (for persistence across refreshes).
   * @param role - The new role to switch to, or null to clear selection.
   */
  setActiveRole: (role: Role | null) => void;
}

// Initialize Context with null. It will be populated by the Provider.
const ActiveRoleContext = createContext<ActiveRoleContextType | null>(null);

export const ActiveRoleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /**
   * State: activeRole
   *
   * We use "Lazy Initialization" (passing a function to useState) here.
   * Reason: We only want to read from sessionStorage ONCE when the app mounts (refresh).
   * Reading from storage on every render would be expensive and unnecessary.
   */
  const [activeRole, setActiveRoleState] = useState<Role | null>(() => {
    try {
      // Attempt to recover the last session's role to prevent redirection loops on refresh.
      if (typeof window !== "undefined") {
        return (sessionStorage.getItem("active_role_pref") as Role) || null;
      }
      return null;
    } catch (error) {
      console.warn("Failed to read active role from storage:", error);
      return null;
    }
  });

  /**
   * Handler: setActiveRole
   *
   * This wrapper function ensures synchronization between:
   * 1. React State (Instant UI updates across the app).
   * 2. Session Storage (Persisting the choice if the user hits Refresh).
   */
  const setActiveRole = (role: Role | null) => {
    // 1. Update React State (Triggers re-render of Navbar, Sidebar, etc.)
    setActiveRoleState(role);

    // 2. Sync with Browser Storage (For persistence)
    if (role) {
      sessionStorage.setItem("active_role_pref", role);
    } else {
      sessionStorage.removeItem("active_role_pref");
    }
  };

  return (
    <ActiveRoleContext.Provider value={{ activeRole, setActiveRole }}>
      {children}
    </ActiveRoleContext.Provider>
  );
};

/**
 * Hook: useActiveRole
 *
 * A safe consumer for the ActiveRoleContext.
 * Throws a helpful error if used outside the provider boundary, preventing silent failures.
 *
 * @returns {ActiveRoleContextType} The context value containing activeRole and setter.
 */
export const useActiveRole = () => {
  const context = useContext(ActiveRoleContext);

  if (!context) {
    throw new Error(
      "useActiveRole must be used within an ActiveRoleProvider. Wrap your app or route in <ActiveRoleProvider>."
    );
  }

  return context;
};