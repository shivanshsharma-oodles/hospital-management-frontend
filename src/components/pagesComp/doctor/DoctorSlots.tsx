import React from "react";
// import { format } from "date-fns"; // Optional: For better date formatting
import { Trash2, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SlotResponseType } from "@/types";

interface SlotsRenderProps {
    slots: SlotResponseType[];
    loading: boolean;
    onDelete: (id: number) => void; // Future proofing for delete action
}

const DoctorSlots = ({ slots, loading, onDelete }: SlotsRenderProps) => {
    
    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading slots...</div>;

    if (slots.length === 0) {
        return (
            <div className="p-12 text-center border-2 border-dashed rounded-lg bg-muted/50">
                <h3 className="font-semibold text-lg">No Slots Available</h3>
                <p className="text-muted-foreground text-sm">Create slots to start accepting appointments.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slots.map((slot) => (
                <div 
                    key={slot.id} 
                    className={`p-4 border rounded-lg shadow-sm bg-white flex flex-col justify-between gap-3 ${slot.isBooked ? 'opacity-75 bg-gray-50' : ''}`}
                >
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 text-primary font-medium">
                            <Calendar className="w-4 h-4" />
                            {slot.date}
                        </div>
                        {slot.isBooked ? (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Booked</Badge>
                        ) : (
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Open</Badge>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-xl font-bold">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span>{slot.startTime} - {slot.endTime}</span>
                    </div>

                    {!slot.isBooked && (
                        <div className="pt-2 border-t mt-1 flex justify-end">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8"
                                onClick={() => onDelete(slot.id)}
                            >
                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                            </Button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
export default DoctorSlots
