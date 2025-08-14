import CertificateCard from "./certificateCard";
import { certificates } from "../../constants";

export default function Certificates() {
    return (
        <div
            id="certificates"
            className="section-container min-h-screen px-8 md:px-12 lg:px-16"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        className="head text-5xl md:text-6xl font-bold mb-6"
                        data-aos="fade-up"
                    >
                        Professional <span className="gradient-text">Certificates</span>
                    </h2>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 mx-auto rounded-full mb-6 shadow-lg"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    ></div>
                    <p
                        className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        A collection of my professional certifications and achievements that demonstrate
                        my expertise in various technologies and methodologies.
                    </p>
                </div>

                {/* Certificates Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {certificates.map((certificate, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            data-aos-duration="800"
                            className="h-full"
                        >
                            <CertificateCard
                                title={certificate.title}
                                issuer={certificate.issuer}
                                date={certificate.date}
                                img={certificate.img}
                                downloadLink={certificate.downloadLink}
                                viewLink={certificate.viewLink}
                                tags={certificate.tags}
                            />
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div
                    className="text-center mt-16"
                    data-aos="fade-up"
                    data-aos-delay="600"
                >
                    <div className="modern-card inline-block">
                        <h3 className="text-2xl font-bold mb-4">
                            Looking for <span className="gradient-text">certified expertise</span>?
                        </h3>
                        <p className="text-zinc-400 mb-6 max-w-md">
                            These certifications validate my skills and commitment to continuous learning.
                        </p>
                        <a
                            href="#contact"
                            className="btn-primary inline-flex items-center gap-2 group"
                        >
                            <span>Let's Connect</span>
                            <svg
                                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
