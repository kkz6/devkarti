import React from "react";
import Layout from "@/Layouts/Layout";

export default function About() {
    return (
        <Layout title="About" showBreadcrumb={true}>
            <div className="mx-auto max-w-3xl px-4">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <h1>About devkarti</h1>

                    <p>
                        Welcome to devkarti! I'm Karthick, a Developer, Speaker
                        and Founder of Gigcodes. I write about coding, startups,
                        and my journey as a full-stack developer.
                    </p>

                    <h2>About Me</h2>
                    <p>
                        I've been working in the tech industry for over seven
                        years, building web applications, APIs, and helping
                        startups bring their ideas to life. My expertise spans
                        across:
                    </p>

                    <ul>
                        <li>
                            Full-stack web development (Laravel, React, Vue.js)
                        </li>
                        <li>API design and development</li>
                        <li>DevOps and cloud infrastructure</li>
                        <li>Technical leadership and mentoring</li>
                    </ul>

                    <h2>Why devkarti?</h2>
                    <p>
                        This blog is my personal space where I share my
                        thoughts, experiences, and learnings from my journey in
                        tech. Here you'll find:
                    </p>

                    <ul>
                        <li>Technical tutorials and how-to guides</li>
                        <li>Best practices and design patterns</li>
                        <li>Startup experiences and lessons learned</li>
                        <li>
                            Tools and technologies that make development easier
                        </li>
                    </ul>

                    <h2>Get in Touch</h2>
                    <p>
                        Feel free to connect with me on{" "}
                        <a
                            href="https://github.com/kkz6"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>{" "}
                        or{" "}
                        <a
                            href="https://www.linkedin.com/in/ikkarti/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>
                        . You can also reach out via email at
                        karthick@gigcodes.com.
                    </p>

                    <p>Happy reading and coding!</p>
                </article>
            </div>
        </Layout>
    );
}
