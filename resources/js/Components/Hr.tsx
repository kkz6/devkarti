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
        <div className={`max-w-3xl mx-auto ${noPadding ? "px-0" : "px-4"}`}>
            <hr className="border-skin-line" aria-hidden={ariaHidden} />
        </div>
    );
}
