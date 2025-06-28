import React from 'react';
import Layout from '@/Layouts/Layout';

export default function HireMe() {
    return (
        <Layout title="Hire Me">
            <div className="mx-auto max-w-3xl px-4">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <h1>Work With Me</h1>

                    <p>
                        I'm available for consulting, contract work, and speaking engagements.
                        With over 7 years of experience in full-stack development, I can help you:
                    </p>

                    <h2>Services I Offer</h2>

                    <h3>Technical Consulting</h3>
                    <ul>
                        <li>Architecture design and review</li>
                        <li>Technology stack selection</li>
                        <li>Performance optimization</li>
                        <li>Code review and best practices</li>
                    </ul>

                    <h3>Development Services</h3>
                    <ul>
                        <li>Full-stack web application development</li>
                        <li>API design and implementation</li>
                        <li>Laravel and React/Vue.js applications</li>
                        <li>Legacy code modernization</li>
                    </ul>

                    <h3>Training & Mentoring</h3>
                    <ul>
                        <li>Team training on modern web technologies</li>
                        <li>One-on-one developer mentoring</li>
                        <li>Workshop facilitation</li>
                        <li>Technical speaking at conferences</li>
                    </ul>

                    <h2>Technologies I Work With</h2>
                    <p>
                        <strong>Backend:</strong> Laravel, PHP, Node.js, RESTful APIs, GraphQL<br />
                        <strong>Frontend:</strong> React, Vue.js, TypeScript, Tailwind CSS<br />
                        <strong>Database:</strong> MySQL, PostgreSQL, Redis<br />
                        <strong>DevOps:</strong> Docker, AWS, CI/CD, Git<br />
                        <strong>Tools:</strong> Inertia.js, Vite, Webpack, PHPUnit, Jest
                    </p>

                    <h2>Let's Connect</h2>
                    <p>
                        Interested in working together? I'd love to hear about your project!
                    </p>

                    <p>
                        <strong>Email:</strong> <a href="mailto:karthick@gigcodes.com">karthick@gigcodes.com</a><br />
                        <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/ikkarti/" target="_blank" rel="noopener noreferrer">linkedin.com/in/ikkarti</a><br />
                        <strong>GitHub:</strong> <a href="https://github.com/kkz6" target="_blank" rel="noopener noreferrer">github.com/kkz6</a>
                    </p>

                    <p>
                        I typically respond within 24-48 hours. Looking forward to discussing how I can help
                        bring your ideas to life!
                    </p>
                </article>
            </div>
        </Layout>
    );
}
