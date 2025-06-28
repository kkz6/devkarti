import React from 'react';

interface DatetimeProps {
    datetime: string;
    size?: 'sm' | 'lg';
    className?: string;
}

export default function Datetime({ datetime, size = 'sm', className }: DatetimeProps) {
    const date = new Date(datetime);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className={`flex items-center space-x-2 opacity-80 ${className || ''}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                    size === 'sm' ? 'scale-90' : 'scale-100'
                } inline-block h-6 w-6 fill-skin-base`}
                aria-hidden="true"
            >
                <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2zM5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z" />
            </svg>
            <span className={`${size === 'sm' ? 'text-sm' : 'text-base'}`}>
                <time dateTime={datetime}>
                    {formattedDate}
                </time>
            </span>
        </div>
    );
}
