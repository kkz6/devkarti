import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import Hr from "./Hr";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const { url } = usePage();

    // Site configuration - you can move this to a config file
    const SITE = {
        title: "devkarti",
        showArchives: true,
        lightAndDarkMode: true,
    };

    // Remove trailing slash from current pathname if exists
    const currentPath =
        url.endsWith("/") && url !== "/" ? url.slice(0, -1) : url;

    const isActive = (path: string) => {
        const currentPathArray = currentPath.split("/").filter((p) => p.trim());
        const pathArray = path.split("/").filter((p) => p.trim());

        return currentPath === path || currentPathArray[0] === pathArray[0];
    };

    // Theme handling
    useEffect(() => {
        // Check for saved theme preference or default to 'light'
        const savedTheme = localStorage.getItem("theme") as
            | "light"
            | "dark"
            | null;
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <header>
            <a
                id="skip-to-content"
                href="#main-content"
                className="absolute start-16 -top-full z-50 bg-background px-3 py-2 text-accent backdrop-blur-lg transition-all focus:top-4"
            >
                Skip to content
            </a>
            <section className="mx-auto max-w-3xl px-4">
                <div
                    id="nav-container"
                    className="flex flex-col items-center justify-between sm:flex-row"
                >
                    <div
                        id="top-nav-wrap"
                        className="relative flex w-full items-baseline justify-between bg-background py-4 sm:items-center sm:py-6"
                    >
                        <Link
                            href="/"
                            className="absolute py-1 text-xl leading-8 font-semibold whitespace-nowrap sm:static sm:my-auto sm:text-2xl sm:leading-none"
                        >
                            {SITE.title}
                        </Link>
                        <nav
                            id="nav-menu"
                            className="flex w-full flex-col items-center sm:ms-2 sm:flex-row sm:justify-end sm:space-x-4 sm:py-0"
                        >
                            <button
                                id="menu-btn"
                                className="focus-outline self-end p-2 sm:hidden"
                                aria-label={
                                    mobileMenuOpen ? "Close Menu" : "Open Menu"
                                }
                                aria-expanded={mobileMenuOpen}
                                aria-controls="menu-items"
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                            >
                                {mobileMenuOpen ? (
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                            <ul
                                id="menu-items"
                                className={`
                                    mt-4 grid w-44 grid-cols-2 place-content-center gap-2
                                    [&>li>a]:block [&>li>a]:px-4 [&>li>a]:py-3 [&>li>a]:text-center [&>li>a]:font-medium [&>li>a]:hover:text-accent sm:[&>li>a]:px-2 sm:[&>li>a]:py-1
                                    ${mobileMenuOpen ? "" : "hidden"}
                                    sm:mt-0 sm:flex sm:w-auto sm:gap-x-5 sm:gap-y-0
                                `}
                            >
                                <li className="col-span-2">
                                    <Link
                                        href="/posts"
                                        className={
                                            isActive("/posts")
                                                ? "active-nav"
                                                : ""
                                        }
                                    >
                                        Posts
                                    </Link>
                                </li>
                                <li className="col-span-2">
                                    <Link
                                        href="/tags"
                                        className={
                                            isActive("/tags")
                                                ? "active-nav"
                                                : ""
                                        }
                                    >
                                        Tags
                                    </Link>
                                </li>
                                <li className="col-span-2">
                                    <Link
                                        href="/about"
                                        className={
                                            isActive("/about")
                                                ? "active-nav"
                                                : ""
                                        }
                                    >
                                        About
                                    </Link>
                                </li>
                                {SITE.showArchives && (
                                    <li className="col-span-2">
                                        <Link
                                            href="/archives"
                                            className={`focus-outline flex justify-center p-3 sm:p-1 ${
                                                isActive("/archives")
                                                    ? "active-nav [&>svg]:stroke-accent"
                                                    : ""
                                            }`}
                                            aria-label="archives"
                                            title="Archives"
                                        >
                                            <svg
                                                className="hidden sm:inline-block w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                                />
                                            </svg>
                                            <span className="sm:sr-only">
                                                Archives
                                            </span>
                                        </Link>
                                    </li>
                                )}
                                <li className="col-span-1 flex items-center justify-center">
                                    <Link
                                        href="/search"
                                        className={`focus-outline flex p-3 sm:p-1 ${
                                            isActive("/search")
                                                ? "[&>svg]:stroke-accent"
                                                : ""
                                        }`}
                                        aria-label="search"
                                        title="Search"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </Link>
                                </li>
                                {SITE.lightAndDarkMode && (
                                    <li className="col-span-1 flex items-center justify-center">
                                        <button
                                            id="theme-btn"
                                            className="focus-outline relative size-12 p-4 sm:size-8 hover:[&>svg]:stroke-accent"
                                            title="Toggles light & dark"
                                            aria-label={theme}
                                            aria-live="polite"
                                            onClick={toggleTheme}
                                        >
                                            <svg
                                                className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 w-5 h-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                                />
                                            </svg>
                                            <svg
                                                className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 w-5 h-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                                />
                                            </svg>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
                <Hr />
            </section>
        </header>
    );
}
