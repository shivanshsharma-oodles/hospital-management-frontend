import { showError, showSuccess } from '@/utils/toast'
import Loader from '@/components/common/Loader'
import React, { useEffect, useState } from 'react'
import BaseTwoColumnLayout from '@/layout/BaseTwoColumnLayout'
import AddDoctor from '@/components/pagesComp/admin/AddDoctor'
import Departments from '@/components/pagesComp/admin/Departments'
import AdminSidebar from '@/components/pagesComp/admin/AdminSidebar'
import { fetchDepartments, getAllDoctors } from '@/services/spring-apis/public.service'
import { type AdminSection, type BaseDoctorResponse, type DepartmentResponse } from '@/types'
import { deleteDepartment } from '@/services/spring-apis/admin.service'
import CommonNavbar from '@/components/common/CommonNavbar'

const AdminDashboard = () => {

  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<DepartmentResponse[]>([])
  const [doctors, setDoctors] = useState<BaseDoctorResponse[]>([])

  const [activeSection, setActiveSection] = useState<AdminSection>("departments")

  const handleDeleteDepartment = async (id: number) => {
    try {
      setLoading(true);
      await deleteDepartment(id);
      setDepartments(prev => prev.filter(dept => dept.id !== id));
      showSuccess("Deleted Successfully", "delete success department");
    } catch (error) {
      showError(error.response.data.error || "Failed to delete", "delete-department-error")
    } finally {
      setLoading(false);
    }
  }

  const handleAddDepartment = (newDepartment: DepartmentResponse) => {
    setDepartments(prev => [newDepartment, ...prev]);
  };

  useEffect(() => {
    const fetchDepartmentsAndDoctors = async () => {
      try {
        setLoading(true);
        const deptResponse = await fetchDepartments();
        const doctResponse = await getAllDoctors();
        setDepartments(deptResponse);
        setDoctors(doctResponse);
      } catch (error) {
        console.error('Error fetching departments:', error);
        showError(error.response.data.error || "Could Not Fetch Departments")
      } finally {
        setLoading(false);
      }
    };
    fetchDepartmentsAndDoctors();
  }, [])

  if (loading) return <Loader variant='dots' />

  return (
    <div className="flex flex-col h-screen overflow-hidden">

      <div className="flex-1 min-h-0">
        <BaseTwoColumnLayout
          LeftComponent={<AdminSidebar activeSection={activeSection} onSelect={setActiveSection} />}
          RightComponent={
            <div className="w-full flex flex-col gap-5">
              {
                activeSection === "departments" &&
                <Departments
                  handleDeleteDepartment={handleDeleteDepartment}
                  departments={departments}
                  handleAddDepartment = {handleAddDepartment}
                />}
              {activeSection === "doctors" && <AddDoctor doctors={doctors} />
              }
            </div>
          }
        />
      </div>
    </div>
  );
}

export default AdminDashboard
