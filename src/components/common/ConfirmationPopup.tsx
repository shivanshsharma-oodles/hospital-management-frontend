import React, { useEffect } from 'react'
import BaseDialogModal from './baseComp/BaseDialogModal';
import { Button } from '../ui/button';

interface ConfirmationAction {
    label?: string;
    onClick?: () => void;
    variant?: "default" | "outline" | "destructive" | "confirm";
}

interface ConfirmationPopupProps {
    isModalOpen: boolean,
    setIsModalOpen: (open: boolean) => void,

    title: string,
    description: string,

    icon?: React.ReactNode
    actions?: ConfirmationAction[];
    duration?: number;

    children?: React.ReactNode
}


const ConfirmationPopup = ({
    isModalOpen,
    setIsModalOpen,
    title,
    description,
    icon,
    actions = [
        {
            label: "Close",
            onClick: () => setIsModalOpen(false),
        },
    ],
    duration,
    // children,
}: ConfirmationPopupProps) => {


    useEffect(() => {
        if (!duration) return;

        const timer = setTimeout(() => {
            setIsModalOpen(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, setIsModalOpen]);


    return (
        <BaseDialogModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
        >
            {/* ICON */}
            {icon && (
                <div className="flex justify-center mb-5">
                    {icon}
                </div>
            )}

            {/* TITLE */}
            <h2 className="text-xl font-semibold text-center">
                {title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-sm text-muted-foreground text-center mt-1">
                {description}
            </p>

            {/* ACTIONS */}
            <div className="flex justify-center gap-4 mt-6">
                {actions.map((action, idx) => (
                    <Button
                        key={idx}
                        variant={action.variant || "default"}
                        onClick={action.onClick}
                    >
                        {action.label}
                    </Button>
                ))}
            </div>
        </BaseDialogModal>
    );
};

export default ConfirmationPopup
