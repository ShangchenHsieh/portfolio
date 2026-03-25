import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation - 1717656274304.json"

function EmailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function AlternateEmailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0v1a3 3 0 006 0V9a5 5 0 10-5 5" />
    </svg>
  );
}

function PersonIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 14a4 4 0 10-8 0m8 0a4 4 0 00-8 0m8 0v1a3 3 0 01-3 3h-2a3 3 0 01-3-3v-1" />
    </svg>
  );
}

function SuccessIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 10.34H5.67V18h2.67v-7.66zM7 5.78a1.56 1.56 0 100 3.12 1.56 1.56 0 000-3.12zM18.33 13.5c0-2.3-1.22-3.37-2.85-3.37-1.31 0-1.9.72-2.23 1.22v-1.04h-2.67V18h2.67v-4.26c0-1.13.21-2.22 1.61-2.22 1.38 0 1.4 1.29 1.4 2.3V18h2.67v-4.5z" />
    </svg>
  );
}

export default function Contact() {
  const [mailSent, setMailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    setLoading(true);
    setSubmitMessage({ type: "", text: "" });
    e.preventDefault();
    const { username, email, message } = e.target.elements;

    const REACT_APP_SERVICEID = "service_q1f3cpm"
    const REACT_APP_TEMPLATE = "template_j8f8l2a"
    const REACT_APP_PUBLICKEY = "7zvBqdgumnreHvgyM"

    const templateParams = {
      username: username.value,
      email: email.value,
      message: message.value,
    };

    try {
      const { default: emailjs } = await import("emailjs-com");

      await emailjs.send(
        REACT_APP_SERVICEID,
        REACT_APP_TEMPLATE,
        templateParams,
        REACT_APP_PUBLICKEY
      );

      setMailSent(true);
      setSubmitMessage({ type: "success", text: "Message sent successfully! I'll get back to you soon." });
    } catch (err) {
      setSubmitMessage({ type: "error", text: "Something went wrong. Please try again." });
      console.log("FAILED...", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className="section-container min-h-screen px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="head text-5xl md:text-6xl font-bold mb-6"
            data-aos="fade-up"
          >
            Let's <span className="gradient-text">Connect</span>
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
            Ready to bring your ideas to life? Let's discuss your next project
            and explore how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div
            className="modern-card"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">Send me a message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PersonIcon className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    disabled={mailSent}
                    className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-lg bg-zinc-800/50 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AlternateEmailIcon className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={mailSent}
                    className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-lg bg-zinc-800/50 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  minLength={10}
                  disabled={mailSent}
                  className="block w-full px-3 py-3 border border-zinc-700 rounded-lg bg-zinc-800/50 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                {!mailSent && !loading && (
                  <button
                    type="submit"
                    className="btn-primary w-full inline-flex items-center justify-center gap-2 group"
                  >
                    <EmailIcon className="w-5 h-5" />
                    <span>Send Message</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                )}

                {loading && (
                  <button
                    disabled
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-3 opacity-75 cursor-not-allowed"
                  >
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </button>
                )}

                {mailSent && (
                  <button
                    disabled
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 cursor-default"
                  >
                    <SuccessIcon className="w-5 h-5" />
                    Message Sent Successfully!
                  </button>
                )}

                {submitMessage.text && (
                  <p className={`mt-4 text-sm ${submitMessage.type === "error" ? "text-red-400" : "text-green-400"}`}>
                    {submitMessage.text}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info & Animation */}
          <div className="space-y-8">
            {/* Animation */}
            <div
              className="flex justify-center"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative glass-light p-8 rounded-3xl">
                  <Lottie
                    animationData={animationData}
                    loop
                    autoplay
                    style={{ height: 300, width: 400 }}
                  />
                </div>
              </div>
            </div>



            {/* Quick Contact Options */}
            <div
              className="modern-card"
              data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              <h4 className="text-lg font-semibold mb-4 gradient-text">Prefer other ways to connect?</h4>
              <div className="space-y-3">
                <a
                  href="mailto:your.email@example.com"
                  className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-all duration-300 group"
                >
                  <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <EmailIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Email me directly</div>
                    <div className="text-sm text-zinc-400">Quick response guaranteed</div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/shang-chen-hsieh-598167222/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-all duration-300 group"
                >
                  <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <LinkedInIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Connect on LinkedIn</div>
                    <div className="text-sm text-zinc-400">Professional networking</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}