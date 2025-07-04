import EmailIcon from "@mui/icons-material/Email";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/Animation - 1717656274304.json"

export default function Contact() {
  const [mailSent, setMailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
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

    emailjs
      .send(
        REACT_APP_SERVICEID,
        REACT_APP_TEMPLATE,
        templateParams,
        REACT_APP_PUBLICKEY
      )
      .then(
        (response) => {
          setMailSent(true);
          setLoading(false);
          toast.success("Message sent successfully! I'll get back to you soon.", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          setLoading(false);
          toast.error("Something went wrong. Please try again.", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          console.log("FAILED...", err);
        }
      );
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: 'svg',

  }

  const socialLinks = [
    {
      icon: GitHubIcon,
      url: "https://github.com/ShangchenHsieh",
      label: "GitHub",
      color: "hover:text-gray-300"
    },
    {
      icon: LinkedInIcon,
      url: "https://www.linkedin.com/in/shang-chen-hsieh-598167222/",
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      icon: InstagramIcon,
      url: "https://www.instagram.com/seanch.h___/",
      label: "Instagram",
      color: "hover:text-pink-400"
    }
  ];

  return (
    <div
      id="contact"
      className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-20 px-4"
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
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
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
                    <FileDownloadDoneIcon className="w-5 h-5" />
                    Message Sent Successfully!
                  </button>
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
                    options={defaultOptions}
                    height={300}
                    width={400}
                    speed={0.4}
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

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}