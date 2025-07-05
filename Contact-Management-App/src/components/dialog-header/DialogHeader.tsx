import React from 'react'

interface IDialogHeaderProps {
    header: string;
    color?: string;
}

export const DialogHeader: React.FC<IDialogHeaderProps> = ({ header, color = "green" }) => {
    return (
        <div className='font-bold' style={{ color: color }}>
            <span>{header}</span>
        </div>
    )
}
