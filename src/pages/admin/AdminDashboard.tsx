import { Logo } from '@/components/design/LogoImage'
import AddDepartment from '@/components/pagesComp/dashboardComp/admin/AddDepartment'
import AddDoctor from '@/components/pagesComp/dashboardComp/admin/AddDoctor'
import AdminSidebar from '@/components/pagesComp/dashboardComp/admin/AdminSidebar'
import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01'
import BaseTwoColumnLayout from '@/layout/BaseTwoColumnLayout'
import { fetchDepartments } from '@/services/spring-apis/public.service'
import type { DepartmentResponse } from '@/types'
import { APP } from '@/utils/constants/contants'
import { showError } from '@/utils/toast'
import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {

  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<DepartmentResponse[]>([])
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    const fetchDepartmentsAndDoctors = async () => {
      try {
        setLoading(true);
        const deptResponse = await fetchDepartments();
        const doctResponse = await fetchDepartments();
        setDepartments(deptResponse);
      } catch (error) {
        console.error('Error fetching departments:', error);
        showError( error.response.data.error || "Could Not Fetch Departments")
      }finally{
        setLoading(false);
      }
    };
    fetchDepartmentsAndDoctors();
  }, [])


  return (
    <>
      <Navbar01
        showNavLinks={false}
        showButtons={false}
        logo={<Logo className="w-26 h-16" />}
        appName={APP.ADMIN_NAME}
      />

      <BaseTwoColumnLayout
        LeftComponent={<AdminSidebar />}
        RightComponent={
          <div className="w-full flex flex-col gap-5">
            <AddDepartment />
            <AddDoctor />
          </div>
        }
      />
    </>
  );
}

export default AdminDashboard
