import DepartmentCard from '@/components/common/DepartmentCard';
import Loader from '@/components/common/Loader';
import PatientNavbar from '@/components/pagesComp/patient/PatientNavbar';
import { fetchDepartments, getAllDoctorsByDeptId } from '@/services/spring-apis/public.service';
import type { BaseDoctorResponse, DepartmentResponse } from '@/types'
import { showError } from '@/utils/toast';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PatientDepartmentsPage = () => {
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartmentsForPatient = async () => {
      try {

        setLoading(true);
        const deptResponse = await fetchDepartments();
        setDepartments(deptResponse);

      } catch (error) {

        console.error("Error Fetching Departments: ", error);
        showError(error.response.data.error || "Could Not Fetch Departments")

      } finally {
        setLoading(false);
      }
    }
    fetchDepartmentsForPatient();
  }, []);


  if (loading) return <Loader variant='dots' />
  return (
    <div>
      <PatientNavbar />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {
          departments.map((dept) => (
            <DepartmentCard
              department={dept}
              button1Text='Find Doctor'
              onButton1={ () => navigate(`/patient/doctors?department=${dept.id}`) }
            />
          ))
        }
      </div>
    </div>
  )
}

export default PatientDepartmentsPage;