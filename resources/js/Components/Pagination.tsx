import React from "react";
import LinkButton from "./LinkButton";

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    prevUrl?: string | null;
    nextUrl?: string | null;
}

export default function Pagination({
    currentPage,
    lastPage,
    prevUrl,
    nextUrl,
}: PaginationProps) {
    if (lastPage <= 1) {
        return null;
    }

    return (
        <nav
            className="flex justify-center items-center py-4"
            aria-label="Pagination"
        >
            <LinkButton
                disabled={!prevUrl}
                href={prevUrl || "#"}
                className={`me-4 select-none ${!prevUrl ? "opacity-50" : ""}`}
                ariaLabel="Previous"
            >
                <svg
                    className="inline-block rtl:rotate-180 w-4 h-4 me-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                Prev
            </LinkButton>

            <span className="mx-4">
                {currentPage} / {lastPage}
            </span>

            <LinkButton
                disabled={!nextUrl}
                href={nextUrl || "#"}
                className={`ms-4 select-none ${!nextUrl ? "opacity-50" : ""}`}
                ariaLabel="Next"
            >
                Next
                <svg
                    className="inline-block rtl:rotate-180 w-4 h-4 ms-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </LinkButton>
        </nav>
    );
}
