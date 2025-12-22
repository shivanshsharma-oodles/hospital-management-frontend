import React from "react";
import { ADMIN_DASH_SIDEBAR_BUTTONS } from "@/utils/constants/contants";
import type { AdminSection } from "@/types";

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSelect: (section: AdminSection) => void;
}

const AdminSidebar = ({ activeSection, onSelect }: AdminSidebarProps) => {
  return (
    <div className="h-full flex flex-col px-3 py-6">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="font-semibold text-lg text-gray-800">Admin Control</h2>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex flex-col gap-1.5">
        {ADMIN_DASH_SIDEBAR_BUTTONS.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(btn.key)}
            className={`
              px-4 py-2.5 rounded-lg text-left text-sm font-medium
              transition-all duration-200
              ${
                activeSection === btn.key
                  ? "bg-pink-200 text-gray-900 shadow-sm"
                  : "text-gray-700 hover:bg-pink-100"
              }
            `}
          >
            {btn.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;