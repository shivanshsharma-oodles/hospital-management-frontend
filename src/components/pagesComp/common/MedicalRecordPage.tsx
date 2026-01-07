import React, { useEffect, useState, useRef } from "react"; // Added useRef
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print"; // Added library

import Logo from "@/assets/Logo.svg";
import { APP } from "@/utils/constants";
import { getMedicalRecordById } from "@/services/spring-apis/common.service";
import type { MedicalRecordResponse } from "@/types";
import Loader from "@/components/common/Loader";

const MedicalRecordPage = () => {
    const [record, setRecord] = useState<MedicalRecordResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    
    // 1. Create a reference to the portion to print
    const contentRef = useRef<HTMLDivElement>(null);

    // 2. Setingup the print function
    const handlePrint = useReactToPrint({
        contentRef,
        documentTitle: `Prescription_${record?.patient.name || 'Record'}`,
    });

    useEffect(() => {
        if (!id) return;
        const fetchRecord = async () => {
            try {
                setLoading(true);
                const res = await getMedicalRecordById(Number(id));
                setRecord(res);
            } finally {
                setLoading(false);
            }
        };
        fetchRecord();
    }, [id]);

    if (loading) return <Loader variant="dots" />;
    if (!record) return <div className="p-10 text-center">Record not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            
            {/* 3. This is the portion that will be printed */}
            <div 
                ref={contentRef} 
                className="max-w-3xl mx-auto bg-white p-10 shadow-sm print:shadow-none print:p-8"
            >
                {/* Header Section */}
                <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-start">
                    <div className="flex gap-4">
                        <img src={Logo} className="w-12 h-12" alt="Logo" />
                        <div>
                            <h1 className="font-bold text-2xl tracking-tight text-gray-900">{APP.NAME}</h1>
                            <p className="text-sm font-medium text-brand uppercase tracking-wide">
                                {record.doctor.department?.name || "General Medicine"}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold">Dr. {record.doctor.name}</p>
                        <p className="text-xs text-gray-500">{format(new Date(), "dd MMM yyyy")}</p>
                    </div>
                </div>

                {/* Patient Info Bar */}
                <div className="p-3 mb-8 flex justify-between text-sm border-b">
                    <div>
                        <span className="text-gray-500">Patient: </span>
                        <span className="font-bold uppercase">{record.patient.name}</span>
                    </div>
                    <div className="flex gap-6">
                        {record.temperature && <span><strong>Temp:</strong> {record.temperature}°C</span>}
                        {record.pulse && <span><strong>Pulse:</strong> {record.pulse}</span>}
                        {record.bpSystolic && <span><strong>BP:</strong> {record.bpSystolic}/{record.bpDiastolic}</span>}
                    </div>
                </div>

                {/* Body Content */}
                <div className="min-h-100">
                    <div className="grid grid-cols-1 gap-6">
                        <Field label="Chief Complaints / Symptoms" value={record.symptoms} />
                        <Field label="Clinical Diagnosis" value={record.diagnosis} />

                        {record.treatment && (
                            <Field label="Treatment/Advice" value={record.treatment} />
                        )}

                        <div className="mt-8">
                            <div className="flex items-baseline gap-2 mb-3 border-b border-gray-100 pb-1">
                                <span className="text-3xl font-serif italic text-gray-800">℞</span>
                                <h2 className="font-bold text-sm uppercase tracking-widest text-gray-600">Prescription</h2>
                            </div>
                            <p className="whitespace-pre-line ml-8 text-sm leading-relaxed text-gray-800 font-medium italic">
                                {record.prescription}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer / Follow up */}
                <div className="mt-10 pt-6 border-t border-dashed border-gray-300 flex justify-between items-end">
                    <div>
                        {record.followUpDate && (
                            <p className="text-sm italic">
                                <span className="text-gray-600 font-normal">Follow-up on: </span>
                                <span className="font-semibold">{format(new Date(record.followUpDate), "EEEE, dd MMM yyyy")}</span>
                            </p>
                        )}
                        <p className="text-[10px] text-gray-400 mt-2 italic">Digitally generated on {format(new Date(), "PPP")}</p>
                    </div>

                    <div className="text-center">
                        <p className="text-sm border-b border-gray-600 mb-1 font-bold italic font-serif text-gray-800 px-4">
                            Dr. {record.doctor.name}
                        </p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Authorized Signature</p>
                    </div>
                </div>
            </div>

            {/* Print Button - Stays outside the contentRef so it is never printed */}
            <div className="max-w-3xl mx-auto mt-6 flex justify-center">
                <button
                    onClick={() => handlePrint()}
                    className="flex items-center gap-2 bg-primaryColor/80 text-white px-3 py-1 rounded-md hover:bg-primaryColor/70 transition-all shadow-lg font-medium"
                >
                    <Printer size={18} />
                    Print
                </button>
            </div>
        </div>
    );
};

const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="border-l-2 border-gray-100 pl-4 mb-1">
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">{label}</p>
        <p className="whitespace-pre-line text-sm text-gray-800 leading-tight">{value}</p>
    </div>
);

export default MedicalRecordPage;