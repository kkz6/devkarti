import React from "react";
import Layout from "@/Layouts/Layout";

export default function About() {
    return (
        <Layout title="About" showBreadcrumb={true} activeNav="about">
            <div
                id="about"
                className="prose mb-28 max-w-3xl prose-img:border-0"
            >
                <h1 className="text-2xl tracking-wider sm:text-3xl">About</h1>

                <img
                    src="/pic-karti.jpg"
                    alt="Karthick K profile picture"
                    style={{
                        height: "200px",
                        width: "200px",
                        borderRadius: ".375rem",
                    }}
                />

                <p>
                    With 6+ years of comprehensive experience in web application
                    development, I have polished my skills in both frontend and
                    backend development. One among top 27 developers in Chennai
                    in multiple category by Upwork with 100% Job Success Score.
                </p>

                <h3>Educational Background</h3>

                <h4>B.Tech in Information Technology</h4>
                <ul>
                    <li>
                        <strong>Institution:</strong> Anna University | 2014 ~
                        2018
                    </li>
                    <li>
                        <strong>Details:</strong> Part of RD dept. Creating and
                        Programming devices using Arduino microcontroller and of
                        course an Engineering degree.
                    </li>
                </ul>

                <h4>Job Profile</h4>
                <ul>
                    <li>
                        <strong>Company:</strong> Indigital Pvt Ltd | 2020 -
                        present
                    </li>
                    <li>
                        <strong>Designation:</strong> Senior Software Developer.
                    </li>
                </ul>
            </div>
        </Layout>
    );
}
