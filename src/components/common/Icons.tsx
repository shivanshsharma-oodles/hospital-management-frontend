import { Check, Cross } from 'lucide-react'
import React from 'react'

export const TickIcon = () => {
    return (
        <div className="p-3 border-3 border-green-700 rounded-full">
            <Check className="text-green-700" size={28} />
        </div>
    )
}

export const CrossIcon = () => {
    return (
        <div className="p-3 border-3 border-red-700 rounded-full">
            <Cross className="text-red-700" size={28} />
        </div>
    )
}
