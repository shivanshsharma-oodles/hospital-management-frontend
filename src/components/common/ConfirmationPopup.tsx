import React, { useEffect } from 'react'
import BaseDialogModal from './baseComp/BaseDialogModal';
import { Button } from '../ui/button';

interface ConfirmationPopupProps {
    isModalOpen: boolean,
    title: string,
    description: string,
    buttonText?: string,
    showButton?: boolean
    duration?: number
    setIsModalOpen: (open: boolean) => void,
    children?: React.ReactNode
}

const ConfirmationPopup = ({
    isModalOpen,
    setIsModalOpen,
    title,
    description,
    buttonText,
    duration,
    showButton = false,
    children
}: ConfirmationPopupProps) => {


    if (duration !== null) {
        useEffect(() => {
            setTimeout(() => {
                setIsModalOpen(false);
            }, duration)
        }, [])
    }

    return (
        <div>
            <BaseDialogModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                title={title}
                description={description}
                className='bg-white'
            >
                <div className='my-1 flex justify-center'>
                    {children}
                </div>
                {showButton &&
                    <div className="flex gap-2 flex-row justify-end">
                        <Button
                            variant="default"
                            className=''
                            onClick={() => { }}
                        >
                            {buttonText}
                        </Button>
                    </div>
                }
            </BaseDialogModal>
        </div>
    )
}

export default ConfirmationPopup
