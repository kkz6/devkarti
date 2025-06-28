import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Breadcrumb() {
    const { url } = usePage();

    // Remove current url path and remove trailing slash if exists
    const currentUrlPath = url.replace(/\/+$/, "");

    // Get url array from path
    // eg: /tags/tailwindcss => ['tags', 'tailwindcss']
    const breadcrumbList = currentUrlPath.split("/").slice(1);

    // if breadcrumb is Home > Posts > 1 <etc>
    // replace Posts with Posts (page number)
    if (breadcrumbList[0] === "posts" && breadcrumbList[1]) {
        const pageNum = breadcrumbList[1];
        breadcrumbList.splice(0, 2, `Posts (page ${pageNum})`);
    }

    // if breadcrumb is Home > Tags > [tag] > [page] <etc>
    // replace [tag] > [page] with [tag] (page number)
    if (
        breadcrumbList[0] === "tags" &&
        breadcrumbList[2] &&
        !isNaN(Number(breadcrumbList[2]))
    ) {
        const tag = breadcrumbList[1];
        const pageNum = breadcrumbList[2];
        breadcrumbList.splice(
            1,
            3,
            `${tag} ${Number(pageNum) === 1 ? "" : "(page " + pageNum + ")"}`
        );
    }

    if (
        breadcrumbList.length === 0 ||
        (breadcrumbList.length === 1 && breadcrumbList[0] === "")
    ) {
        return null;
    }

    return (
        <nav
            className="mx-auto mt-8 mb-1 w-full max-w-app px-4"
            aria-label="breadcrumb"
        >
            <ul className="font-light [&>li]:inline [&>li:not(:last-child)>a]:hover:opacity-100">
                <li>
                    <Link href="/" className="opacity-80">
                        Home
                    </Link>
                    <span aria-hidden="true" className="opacity-80">
                        {" "}
                        »{" "}
                    </span>
                </li>
                {breadcrumbList.map((breadcrumb, index) => {
                    const isLast = index + 1 === breadcrumbList.length;

                    if (isLast) {
                        return (
                            <li key={index}>
                                <span
                                    className={`capitalize opacity-75 ${
                                        index > 0 ? "lowercase" : ""
                                    }`}
                                    aria-current="page"
                                >
                                    {decodeURIComponent(breadcrumb)}
                                </span>
                            </li>
                        );
                    }

                    return (
                        <li key={index}>
                            <Link
                                href={`/${breadcrumb}/`}
                                className="capitalize opacity-70"
                            >
                                {breadcrumb}
                            </Link>
                            <span aria-hidden="true" className="opacity-80">
                                {" "}
                                »{" "}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
