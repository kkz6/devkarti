import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://devkarti.com",
  author: "Karthick",
  desc: "Developer, Speaker and Founder of Gigcodes. I write about coding, startups, and my journey as a full-stack developer.",
  title: "devkarti",
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/kkz6",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ikkarti/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:karthick@gigcodes.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
];
