import { showError } from '@/utils/toast'
import Loader from '@/components/common/Loader'
import { APP } from '@/utils/constants/contants'
import React, { useEffect, useState } from 'react'
import { Logo } from '@/components/design/LogoImage'
import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01'
import BaseTwoColumnLayout from '@/layout/BaseTwoColumnLayout'
import AddDoctor from '@/components/pagesComp/admin/AddDoctor'
import Departments from '@/components/pagesComp/admin/Departments'
import AdminSidebar from '@/components/pagesComp/admin/AdminSidebar'
import { fetchDepartments, getAllDoctors } from '@/services/spring-apis/public.service'
import { type AdminSection, type BaseDoctorResponse, type DepartmentResponse } from '@/types'

const AdminDashboard = () => {

  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<DepartmentResponse[]>([])
  const [doctors, setDoctors] = useState<BaseDoctorResponse[]>([])

  const [activeSection, setActiveSection] = useState<AdminSection>("departments")


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
      <Navbar01
        showNavLinks={false}
        showButtons={false}
        logo={<Logo className="w-26 h-16" />}
        appName={APP.ADMIN_NAME}
      />

      <div className="flex-1 min-h-0">
        <BaseTwoColumnLayout
          LeftComponent={<AdminSidebar activeSection={activeSection} onSelect={setActiveSection} />}
          RightComponent={
            <div className="w-full flex flex-col gap-5">
              {activeSection === "departments" && <Departments departments={departments} />}
              {activeSection === "doctors" && <AddDoctor doctors={doctors} />}
            </div>
          }
        />
      </div>
    </div>
  );
}

export default AdminDashboard
