import DepartmentCard from '@/components/common/DepartmentCard';
import Loader from '@/components/common/Loader';
import { fetchDepartments } from '@/services/spring-apis/public.service';
import type { DepartmentResponse } from '@/types'
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
      } catch (error: any) {
        showError(
          error?.response?.data?.error || "Could not fetch departments"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDepartmentsForPatient();
  }, []);

  if (loading) return <Loader variant="dots" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Choose a Department
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Select a medical department to view available doctors and book appointments.
        </p>
      </div>

      {/* Departments Grid */}

      {departments.length === 0
        ? (
          <p className="text-gray-500 text-center mt-10">
            No departments available at the moment.
          </p>
        )
        : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              button1Text="Find Doctor"
              onButton1={() =>
                navigate(
                  `/patient/doctors?department=${dept.id}&departmentName=${encodeURIComponent(dept.name)}`
                )
              }
            />
          ))}
        </div>
      }


    </div>
  );
};

export default PatientDepartmentsPage;