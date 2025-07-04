import React from "react";
import Layout from "@/Layouts/Layout";

export default function HireMe() {
    return (
        <Layout title="Hire Me" activeNav="hireme" showBreadcrumb={true}>
            <article className="prose prose-lg dark:prose-invert max-w-none mb-28">
                <h1 className="text-2xl tracking-wider sm:text-3xl">Hire Me</h1>

                <section id="contact" className="section text-center">
                    <div className="text-center relative inline-block">
                        <h2 className="text-2xl inline-block my-6 font-medium">
                            <span role="img" aria-label="nerd face">
                                🤓
                            </span>{" "}
                            Contact
                        </h2>
                    </div>

                    <div className="mt-8 mb-8">
                        <h3 className="font-medium mb-2 md:text-3xl text-lg">
                            Let's be awesome together!
                        </h3>
                        <p className="mb-6 mx-auto max-w-lg md:mb-10 lg:leading-loose">
                            If you are interested in hiring me as a part-time
                            consultant or If you have opportunities for
                            collaboration or want to build something amazing,
                            don't hesitate to contact me!
                        </p>
                        <a
                            role="button"
                            className="bg-marrsgreen hover:bg-marrslight active:bg-marrsdark dark:hover:bg-carrilight dark:active:bg-carridark dark:bg-carrigreen text-bglight dark:text-bgdark py-2 px-3 rounded lg:text-xl  outline-marrsgreen dark:outline-carrigreen focus-visible:outline-double outline-offset-2"
                            href="mailto:karthick@gigcodes.com"
                            target="_self"
                        >
                            Get in touch!
                        </a>
                    </div>
                </section>

                <h3>
                    <span role="img" aria-label="pointing down">
                        👇
                    </span>{" "}
                    Here's some of the stuff I can help you with
                </h3>

                <br />

                <h4>
                    <span role="img" aria-label="pointing right">
                        👉
                    </span>{" "}
                    Build your dream project
                </h4>
                <p>
                    <em>
                        I can help you out to build your dream project from
                        scratch to production or can join team if your teams
                        needs more people to work.
                    </em>
                </p>

                <h4>
                    <span role="img" aria-label="pointing right">
                        👉
                    </span>{" "}
                    Audit project
                </h4>
                <p>
                    <em>
                        I can audit your project and prepare a list of things
                        that could be improved
                    </em>
                </p>

                <h4>
                    <span role="img" aria-label="pointing right">
                        👉
                    </span>{" "}
                    Optimize performance
                </h4>
                <p>
                    <em>
                        I have extensive knowledge in optimizing applications,
                        both on PHP and SQL level
                    </em>
                </p>

                <h4>
                    <span role="img" aria-label="pointing right">
                        👉
                    </span>{" "}
                    Fix legacy code
                </h4>
                <p>
                    <em>
                        I can help you in migrating your old code to modern
                        standards by creating a test suite and rewriting the
                        code
                    </em>
                </p>

                <h4>
                    <span role="img" aria-label="pointing right">
                        👉
                    </span>{" "}
                    Introduce patterns
                </h4>
                <p>
                    <em>
                        If your project doesn't utilize any patterns, or uses
                        them inconsistently, I can help you in unifying them
                    </em>
                </p>

                <h4>
                    <span role="img" aria-label="pointing right">
                        👉
                    </span>{" "}
                    Enforce processes
                </h4>
                <p>
                    <em>
                        If you feel that there is no solid processes in the
                        development cycle, I can help by introducing SOPs
                    </em>
                </p>

                <h4>
                    <span role="img" aria-label="pointing right">
                        👉
                    </span>{" "}
                    Help in hiring
                </h4>
                <p>
                    <em>
                        It's hard to hire good people. I've interviewed 100s of
                        developers and can help to find the best people for your
                        team
                    </em>
                </p>
            </article>
        </Layout>
    );
}
