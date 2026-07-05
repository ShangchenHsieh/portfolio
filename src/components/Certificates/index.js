import CertificateCard from "./certificateCard";
import { certificates } from "../../constants";
import SectionHeader from "../SectionHeader";
import { Stagger, StaggerItem } from "../../motion/variants";

export default function Certificates() {
  return (
    <section id="certificates" className="section">
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow="Certificates"
          title="Certifications"
          lede="Coursework and credentials in cloud and AI, from AWS and NVIDIA."
        />

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <StaggerItem key={index} className="h-full">
              <CertificateCard
                title={certificate.title}
                issuer={certificate.issuer}
                date={certificate.date}
                img={certificate.img}
                downloadLink={certificate.downloadLink}
                viewLink={certificate.viewLink}
                tags={certificate.tags}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
