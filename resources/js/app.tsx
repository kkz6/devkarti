import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.tsx", { eager: true });
        return pages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: "#ff6b01",
    },
});

// AstroPaper-style title animation
let animatingElement: HTMLElement | null = null;
let animationClone: HTMLElement | null = null;

// Track clicked elements
document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const linkElement = target.closest("a[href]") as HTMLAnchorElement;

    // Only animate for post links, not social or external links
    if (
        linkElement &&
        linkElement.href.includes("/posts/") &&
        !linkElement.hasAttribute("target") &&
        !linkElement.closest(".social-links")
    ) {
        // Find the title element within the link
        const titleElement = linkElement.querySelector("h2, h3") as HTMLElement;

        if (titleElement && !animationClone) {
            // Prevent multiple animations
            // Store reference for animation
            animatingElement = titleElement;

            // Store the link for navigation check
            const targetUrl = linkElement.href;

            // Get the position and size of the title immediately
            const rect = titleElement.getBoundingClientRect();

            // Create a clone for animation
            const clone = titleElement.cloneNode(true) as HTMLElement;
            clone.classList.add("title-animation-clone");

            // Set initial position
            clone.style.position = "fixed";
            clone.style.top = `${rect.top}px`;
            clone.style.left = `${rect.left}px`;
            clone.style.width = `${rect.width}px`;
            clone.style.zIndex = "9999";
            clone.style.pointerEvents = "none";

            document.body.appendChild(clone);
            animationClone = clone;

            // Hide the original title
            titleElement.style.opacity = "0";

            // Add transitioning class to body
            document.body.classList.add("page-transitioning");

            // Trigger the animation
            requestAnimationFrame(() => {
                clone.classList.add("title-animating");

                // Fade out other content
                document.body.classList.add("content-fade-out");
            });
        }
    }
});

router.on("before", (event) => {
    // Add transition if no specific animation is running
    if (!animationClone) {
        document.body.classList.add("page-transitioning", "content-fade-out");
    }
});

router.on("success", () => {
    // Clean up animation elements
    if (animationClone) {
        animationClone.remove();
        animationClone = null;
    }

    // Reset classes
    document.body.classList.remove("page-transitioning", "content-fade-out");

    // Animate in new content
    document.body.classList.add("content-fade-in");

    setTimeout(() => {
        document.body.classList.remove("content-fade-in");

        // Reset original title if it exists
        if (animatingElement) {
            animatingElement.style.opacity = "";
            animatingElement = null;
        }
    }, 400);
});

// Clean up on navigation errors
router.on("error", () => {
    if (animationClone) {
        animationClone.remove();
        animationClone = null;
    }

    document.body.classList.remove("page-transitioning", "content-fade-out");

    if (animatingElement) {
        animatingElement.style.opacity = "";
        animatingElement = null;
    }
});

// Handle browser back/forward navigation
window.addEventListener("popstate", () => {
    document.body.classList.add("page-transitioning");
});
