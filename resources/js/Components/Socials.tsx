import React from "react";
import socialIcons from "../socialIcons";

interface SocialsProps {
    centered?: boolean;
}

const socials = [
    {
        name: "Github",
        href: "https://github.com/kkz6",
        linkTitle: "Github",
        active: true,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/ikkarti/",
        linkTitle: "LinkedIn",
        active: true,
    },
    {
        name: "Mail",
        href: "mailto:karthick@gigcodes.com",
        linkTitle: "Mail",
        active: false,
    },
];

export default function Socials({ centered = false }: SocialsProps) {
    const activeSocials = socials.filter((social) => social.active);

    return (
        <div
            className={`flex-wrap justify-center gap-1 relative z-10 overflow-hidden ${
                centered ? "flex" : "inline-flex"
            }`}
        >
            {activeSocials.map((social) => (
                <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 hover:rotate-6 sm:p-1 inline-block relative overflow-hidden"
                    title={social.linkTitle}
                    aria-label={social.linkTitle}
                >
                    <div
                        className="inline-block size-6 fill-transparent stroke-current stroke-2 opacity-90 group-hover:fill-transparent pointer-events-none"
                        dangerouslySetInnerHTML={{
                            __html: socialIcons[
                                social.name as keyof typeof socialIcons
                            ],
                        }}
                    />
                    <span className="sr-only">{social.linkTitle}</span>
                </a>
            ))}
        </div>
    );
}
