import React from 'react';
import { Link } from '@inertiajs/react';
import Socials from './Socials';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 mt-auto">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col items-center space-y-4">
                    <Socials />

                    <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        <p>
                            Copyright © {currentYear} | All rights reserved.
                        </p>
                        <p className="mt-2">
                            Powered by{' '}
                            <a
                                href="https://laravel.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Laravel
                            </a>
                            {' '}and{' '}
                            <a
                                href="https://inertiajs.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Inertia.js
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
