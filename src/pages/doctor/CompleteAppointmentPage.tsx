import MedicalRecordForm from '@/components/pagesComp/doctor/MedicalRecordForm'
import React from 'react'
import { useParams } from 'react-router-dom'

const CompleteAppointmentPage = () => {
    const { id } = useParams();
    return (
        <div>
            {id ? (
                <MedicalRecordForm appointmentId={Number(id)} />
            ) : (
                <p className="text-red-500">Invalid appointment id</p>
            )}
        </div>
    )
}

export default CompleteAppointmentPage;    