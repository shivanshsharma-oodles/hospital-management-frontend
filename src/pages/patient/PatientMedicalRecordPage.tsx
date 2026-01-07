import { showError } from '@/utils/toast'
import Loader from '@/components/common/Loader'
import React, { useEffect, useState } from 'react'
import { type MedicalRecordSummaryResponse } from '@/types'
import { getMedicalRecordsByUserId } from '@/services/spring-apis/patient.service'
import BaseTable from '@/components/common/baseComp/BaseTable'
import { getMedicalRecordsColumns } from '@/components/common/MedicalRecordColumns'
import { useNavigate } from 'react-router-dom'
import { sortRecordsByDate } from '@/utils/sort/sortRecordsByDate'

const PatientMedicalRecordsPage = () => {

    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState<MedicalRecordSummaryResponse[]>([])
    const navigate = useNavigate();

    const columns = getMedicalRecordsColumns(
        (id) => navigate(`/patient/appointment-details/${id}`)
    )

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                setLoading(true);
                const recordsRes = await getMedicalRecordsByUserId();
                setRecords(sortRecordsByDate(recordsRes));
            } catch (error) {
                console.error('Error fetching Records:', error);
                showError(error.response.data.error || "Could Not Fetch Records")
            } finally {
                setLoading(false);
            }
        };
        fetchMedicalRecords();
    }, [])

    if (loading) return <Loader variant='dots' />

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="p-6 h-full bg-white overflow-auto">
                <h1 className="text-2xl font-bold mb-6">Medical History</h1>
                <BaseTable
                    data={records}
                    columns={columns}
                    rowKey={(record) => record.id}
                    emptyMessage="You don't have any medical records yet."
                />
            </div>
        </div>
    );
}

export default PatientMedicalRecordsPage;
