import Loader from '@/components/common/Loader';
import CommonAppointmentTable from '@/components/common/CommonAppointmentTable';
import DoctorNavbar from '@/components/pagesComp/doctor/DoctorNavbar'
import { fetchDoctor } from '@/services/spring-apis/doctor.service';
import type { CompleteDoctorResponse } from '@/types';
import { showError } from '@/utils/toast';
import React, { useEffect, useState } from 'react'
import DoctorAppointmentsPage from './DoctorAppointmentsPage';

const DoctorDashboard = () => {
  
  const [doctor, setDoctor] = useState<CompleteDoctorResponse>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartmentsAndDoctors = async () => {
      try {
        setLoading(true);
        const docResponse = await fetchDoctor();
        setDoctor(docResponse);
      } catch (error) {
        console.error('Error fetching docot:', error);
        showError(error.response.data.error || "Could Not Fetch Your Data")
      } finally {
        setLoading(false);
      }
    };
    fetchDepartmentsAndDoctors();
  }, [])

  if (loading) return <Loader variant='dots' />

  return (
    <div>
      <DoctorNavbar doctor={doctor} />
      {/* <DoctorAppointmentsPage /> */}
    </div>
  )
}

export default DoctorDashboard
