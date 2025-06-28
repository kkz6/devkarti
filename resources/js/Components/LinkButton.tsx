import React, { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

interface LinkButtonProps {
    href: string;
    className?: string;
    ariaLabel?: string;
    title?: string;
    disabled?: boolean;
    children: ReactNode;
}

export default function LinkButton({
    href,
    className,
    ariaLabel,
    title,
    disabled = false,
    children,
}: LinkButtonProps) {
    const baseClasses = `group inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`;

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    const combinedClasses = `${baseClasses} ${disabledClasses} ${className || ''}`.trim();

    if (disabled) {
        return (
            <span className={combinedClasses} title={title} aria-label={ariaLabel}>
                {children}
            </span>
        );
    }

    return (
        <Link
            href={href}
            className={combinedClasses}
            title={title}
            aria-label={ariaLabel}
        >
            {children}
        </Link>
    );
}
