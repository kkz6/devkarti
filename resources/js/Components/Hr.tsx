import React from "react";

interface HrProps {
    noPadding?: boolean;
    ariaHidden?: boolean;
    className?: string;
}

export default function Hr({
    noPadding = false,
    ariaHidden = true,
    className = "",
}: HrProps) {
    return (
        <hr
            className={`border-border w-full my-0 ${className}`}
            aria-hidden={ariaHidden}
        />
    );
}
