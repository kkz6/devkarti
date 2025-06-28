import React from "react";
import Hr from "./Hr";
import Socials from "./Socials";

interface FooterProps {
    noMarginTop?: boolean;
}

export default function Footer({ noMarginTop = false }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full overflow-hidden">
            <div className="mx-auto max-w-3xl px-4">
                <Hr noPadding />
                <div className="flex flex-col items-center justify-between py-4 sm:flex-row-reverse overflow-hidden">
                    <Socials centered />
                    <div className="my-2 flex flex-col items-center whitespace-nowrap sm:flex-row">
                        <span>Copyright © {currentYear}</span>
                        <span className="hidden sm:inline">&nbsp;|&nbsp;</span>
                        <span>All rights reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
