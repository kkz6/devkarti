import React from 'react';

interface HrProps {
    noPadding?: boolean;
    ariaHidden?: boolean;
}

export default function Hr({ noPadding = false, ariaHidden = true }: HrProps) {
    return (
        <div className={noPadding ? '' : 'my-8'} aria-hidden={ariaHidden}>
            <hr className="border-skin-line" />
        </div>
    );
}
