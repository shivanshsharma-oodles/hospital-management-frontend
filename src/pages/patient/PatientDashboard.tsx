import React, { useEffect, useState } from 'react'
import Loader from '@/components/common/Loader';
import PatientNavbar from '@/components/pagesComp/patient/PatientNavbar'
import type { CompletePatientResponse } from '@/types';
import { showError } from '@/utils/toast';
import { fetchPatient } from '@/services/spring-apis/patient.service';

const PatientDashboard = () => {
  

  const [patient, setPatient] = useState<CompletePatientResponse>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartmentsAndPatients = async () => {
      try {
        setLoading(true);
        const docResponse = await fetchPatient();
        setPatient(docResponse);
      } catch (error) {
        console.error('Error fetching patient:', error);
        showError(error.response?.data?.error || "Could Not Fetch Your Data")
      } finally {
        setLoading(false);
      }
    };
    fetchDepartmentsAndPatients();
  }, [])

  if (loading) return <Loader variant='dots' />

  return (
    <div className="h-screen overflow-auto ">
      <PatientNavbar patient={patient} />
        
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome! {patient?.name || 'Patient'}
          </h1>
          <p className="text-gray-600 mt-1">Manage your practice efficiently</p>
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
              {/* Your content will go here */}
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

      </main>
    </div>
  )
}

export default PatientDashboard