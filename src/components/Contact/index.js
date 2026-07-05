import React, { useState } from "react";
import "../../App.css";
import SectionHeader from "../SectionHeader";
import { Reveal } from "../../motion/variants";

const EMAIL = "shang-chen.hsieh@sjsu.edu";
const LINKEDIN = "https://www.linkedin.com/in/shang-chen-hsieh-598167222/";

export default function Contact() {
  const [mailSent, setMailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage({ type: "", text: "" });
    const { username, email, message } = e.target.elements;

    const SERVICE_ID = "service_q1f3cpm";
    const TEMPLATE_ID = "template_j8f8l2a";
    const PUBLIC_KEY = "7zvBqdgumnreHvgyM";

    const templateParams = {
      username: username.value,
      email: email.value,
      message: message.value,
    };

    try {
      const { default: emailjs } = await import("emailjs-com");
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setMailSent(true);
      setSubmitMessage({ type: "success", text: "Thanks — your message is on its way. I'll get back to you soon." });
    } catch (err) {
      setSubmitMessage({ type: "error", text: "Something went wrong sending that. Please try again, or email me directly." });
      console.error("Email send failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader
          index="05"
          eyebrow="Contact"
          title="Get in touch"
          lede="Open to software engineering roles and interesting projects. Send a note below or reach me directly — I usually reply within a day or two."
        />

        <div className="grid lg:grid-cols-[1fr_minmax(0,320px)] gap-8 lg:gap-12 items-start">
          {/* Form */}
          <Reveal>
          <form onSubmit={handleSubmit} className="card p-6 sm:p-7 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="username" className="label">Name</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  disabled={mailSent}
                  className="field"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="label">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={mailSent}
                  className="field"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="label">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                minLength={10}
                disabled={mailSent}
                className="field resize-none"
                placeholder="What would you like to talk about?"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || mailSent}
                className="btn btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {mailSent ? (
                  <>
                    <CheckIcon /> Message sent
                  </>
                ) : loading ? (
                  <>
                    <Spinner /> Sending…
                  </>
                ) : (
                  <>
                    Send message <ArrowRight />
                  </>
                )}
              </button>

              {submitMessage.text && (
                <p className={`mt-3 text-sm ${submitMessage.type === "error" ? "text-red-500" : "text-emerald-500"}`}>
                  {submitMessage.text}
                </p>
              )}
            </div>
          </form>
          </Reveal>

          {/* Direct links */}
          <Reveal delay={0.08} className="space-y-3">
            <p className="label">Or reach me directly</p>
            <a href={`mailto:${EMAIL}`} className="card card-hover flex items-center gap-3 p-4">
              <span className="icon-tile"><MailIcon /></span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-fg">Email</span>
                <span className="block mono text-xs text-muted truncate">{EMAIL}</span>
              </span>
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="card card-hover flex items-center gap-3 p-4">
              <span className="icon-tile"><LinkedInIcon /></span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-fg">LinkedIn</span>
                <span className="block mono text-xs text-muted truncate">in/shang-chen-hsieh</span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- icons ---------- */

function MailIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 10.34H5.67V18h2.67v-7.66zM7 5.78a1.56 1.56 0 100 3.12 1.56 1.56 0 000-3.12zM18.33 13.5c0-2.3-1.22-3.37-2.85-3.37-1.31 0-1.9.72-2.23 1.22v-1.04h-2.67V18h2.67v-4.26c0-1.13.21-2.22 1.61-2.22 1.38 0 1.4 1.29 1.4 2.3V18h2.67v-4.5z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
