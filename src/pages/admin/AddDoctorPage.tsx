import { Logo } from '@/components/design/LogoImage'
import AddDoctorForm from '@/components/pagesComp/admin/AddDoctorForm'
import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01'
import { APP } from '@/utils/constants'
import React from 'react'

const AddDoctorPage = () => {
    return (
        <div className="flex flex-col h-screen overflow-y-auto">
            <Navbar01
                showNavLinks={false}
                showButtons={false}
                logo={<Logo className="w-26 h-16" />}
                appName={APP.ADMIN_NAME}
            />

            <main className='min-h-dvh'>
                <AddDoctorForm showGoBack = {true} goBackRoute='/admin/dashboard' onSubmitSuccess={() => {}} />
            </main>
        </div>
    )
}

export default AddDoctorPage
