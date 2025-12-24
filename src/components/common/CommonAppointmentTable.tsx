import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, Edit, Eye, CheckCircle } from "lucide-react";
import type { AppointmentResponse, AppointmentStatus } from "@/types";

// Role type define kar diya clarity ke liye
type UserRole = "DOCTOR" | "PATIENT";

interface CommonAppointmentTableProps {
  data: AppointmentResponse[];
  statusView: AppointmentStatus; // Should be PENDING, SCHEDULED etc.
  role: UserRole;
  onAction: (id: number, actionType: string) => void;
}

const CommonAppointmentTable = ({
  data,
  statusView,
  role,
  onAction
}: CommonAppointmentTableProps) => {

  if (!data || data.length === 0) {
    return <div className="p-8 text-center text-muted-foreground border rounded-md">No appointments found in this category.</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-75">Profile</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((app) => (
            <TableRow key={app.id}>

              {/* Column 1: Profile (Logic: Agar Doctor dekh rha hai to Patient ka naam dikhao, wies versa) */}
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    {/* FIXED: Data structure access */}
                    <span>{role === "DOCTOR" ? app.patient.name : app.doctor.name}</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      {role === "DOCTOR" ? "Patient" : "Doctor"}
                    </span>
                  </div>
                </div>
              </TableCell>

              {/* Column 2: Date & Time */}
              <TableCell>
                <div className="flex flex-col">
                  {/* FIXED: Accessed inside 'slot' object */}
                  <span>{app.slot.date}</span>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground">{`${app.slot.startTime} - `}</span>
                    <span className="text-xs text-muted-foreground">{`${app.slot.endTime}`}</span>
                  </div>
                </div>
              </TableCell>

              {/* Column 3: Actions */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">

                  {/* CASE 1: PENDING REQUESTS */}
                  {statusView === "PENDING" && role === "DOCTOR" && (
                    <>
                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600" onClick={() => onAction(app.id, "REJECT")}>
                        <X className="w-4 h-4 mr-1" /> Reject
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => onAction(app.id, "ACCEPT")}>
                        <Check className="w-4 h-4 mr-1" /> Accept
                      </Button>
                    </>
                  )}

                  {/* CASE 1.1: PATIENT CANCEL REQUEST */}
                  {statusView === "PENDING" && role === "PATIENT" && (
                    <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => onAction(app.id, "CANCEL")}>
                      Cancel Request
                    </Button>
                  )}

                  {/* CASE 2: SCHEDULED */}
                  {statusView === "SCHEDULED" && role === "DOCTOR" && (
                    <>
                      <Button size="sm" variant="outline" className="border-red-700 hover:bg-red-500 hover:text-white" onClick={() => onAction(app.id, "CANCEL")}>
                        Cancel
                      </Button>
                      <Button size="sm" variant="outline" className="border-green-600 hover:bg-green-600 hover:text-white" onClick={() => onAction(app.id, "COMPLETE")}>
                        <CheckCircle className="w-4 h-4 mr-1" /> Complete
                      </Button>
                    </>
                  )}

                  {/* CASE 3: COMPLETED */}
                  {statusView === "COMPLETED" && (
                    <Button size="sm" variant="secondary" onClick={() => onAction(app.id, "VIEW_DETAILS")}>
                      <Eye className="w-4 h-4 mr-1" /> View Details
                    </Button>
                  )}

                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommonAppointmentTable;