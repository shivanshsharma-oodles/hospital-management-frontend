import React from 'react'
import { useOutletContext } from "react-router-dom";
import type { CompleteDoctorResponse } from "@/types";

const DoctorDashboard = () => {
  const { doctor } = useOutletContext<{ doctor: CompleteDoctorResponse }>();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome! Dr. {doctor?.name || "Doctor"}
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your practice efficiently
        </p>
      </div>

      {/* Stats Grid - Empty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-32"></div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-32"></div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-32"></div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-32"></div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Large Content Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Main Content Area</h2>
          </div>
          <div className="p-6 h-96">
            {/* Content will go here */}
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-64">
            {/* Sidebar content 1 */}
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-64">
            {/* Sidebar content 2 */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
