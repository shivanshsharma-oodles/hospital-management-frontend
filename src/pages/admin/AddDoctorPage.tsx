import AddDoctorForm from '@/components/pagesComp/admin/AddDoctorForm'
import React from 'react'

const AddDoctorPage = () => {
    return (
        <div className="flex flex-col h-screen overflow-y-auto">
            <main className=''>
                <AddDoctorForm showGoBack = {true} goBackRoute='/admin/dashboard' onSubmitSuccess={() => {}} />
            </main>
        </div>
    )
}

export default AddDoctorPage
