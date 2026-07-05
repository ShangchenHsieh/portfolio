import CertificateCard from "./certificateCard";
import { certificates } from "../../constants";

export default function Certificates() {
  return (
    <section id="certificates" className="section">
      <div className="container">
        <header className="mb-12 max-w-2xl">
          <p className="eyebrow" data-aos="fade-up">Certificates</p>
          <h2
            className="mt-4 font-semibold tracking-[-0.02em] text-[clamp(1.9rem,4vw,2.75rem)]"
            data-aos="fade-up"
          >
            Certifications
          </h2>
          <p className="mt-4 text-muted leading-relaxed" data-aos="fade-up">
            Coursework and credentials in cloud and AI, from AWS and NVIDIA.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={Math.min((index % 3) * 80, 240)}
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
      </div>
    </section>
  );
}
