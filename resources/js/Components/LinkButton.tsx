import React, { ReactNode } from "react";
import { Link } from "@inertiajs/react";

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
    const baseClasses = `group inline-block hover:text-accent`;

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    const combinedClasses = `${baseClasses} ${disabledClasses} ${
        className || ""
    }`.trim();

    if (disabled) {
        return (
            <span
                className={combinedClasses}
                title={title}
                aria-label={ariaLabel}
            >
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
