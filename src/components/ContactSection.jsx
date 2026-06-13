"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Magnet from "./Magnet/Magnet";
import { Mail, MapPin, Send, CheckCircle, AlertCircle, FileText } from "lucide-react";

// Inline SVG Icons for Socials
const GithubIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setStatus("submitting");

    const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL;

    // If no Formspree URL is configured, simulate a successful network request for 1.5s
    if (!formspreeUrl) {
      console.warn("NEXT_PUBLIC_FORMSPREE_URL is not defined in .env.local. Simulating form submission.");
      setTimeout(() => {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      }, 1500);
      return;
    }

    try {
      const response = await fetch(formspreeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject || "No Subject",
          message: formState.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const contactMethods = [
    {
      label: "Email Me",
      value: "akjha0810@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=akjha0810@gmail.com&su=Opportunity%20for%20Aman%20Kumar%20Jha&body=Hi%20Aman,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity%20with%20you.",
      icon: <Mail className="w-5 h-5 text-[#E11D48]" />,
    },
    {
      label: "GitHub",
      value: "github.com/amankumarjha006",
      href: "https://github.com/amankumarjha006",
      icon: <GithubIcon className="w-5 h-5 text-[#E11D48]" />,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/aman-kumar-jha-615274323",
      href: "https://www.linkedin.com/in/aman-kumar-jha-615274323",
      icon: <LinkedinIcon className="w-5 h-5 text-[#E11D48]" />,
    },
    {
      label: "Location",
      value: "Ghaziabad, Uttar Pradesh, India",
      href: null,
      icon: <MapPin className="w-5 h-5 text-[#E11D48]" />,
    },
    {
      label: "Resume",
      value: "Download CV",
      href: "/Aman_Kumar_Jha_Resume.pdf",
      download: "Aman_Kumar_Jha_Resume.pdf",
      icon: <FileText className="w-5 h-5 text-[#E11D48]" />,
    },
  ];

  return (
    <section id="contact" className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 relative z-10" aria-label="Contact Aman Kumar Jha">
      
      <SectionHeading
        label="LET'S CONNECT"
        title="Interested in Building Something Together?"
        description="Whether it's an internship opportunity, a collaboration, or just a conversation about technology, I'd love to hear from you."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-12 md:mt-20"
      >
        
        {/* Left Column: Personal Contact Hub */}
        <div className="flex flex-col space-y-10">
          
          {/* Profile Overview */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              Aman Kumar Jha
            </h3>
            <h4 className="text-[#E11D48] font-semibold text-sm md:text-base tracking-wider uppercase">
              AI/ML Engineer • Full Stack Developer
            </h4>
            <p className="text-[#CBD5E1] text-base leading-relaxed max-w-md">
              Currently exploring machine learning, backend systems, and AI-powered products. Open to internships, collaborations, and exciting opportunities.
            </p>
            
            {/* Availability Indicator */}
            <div className="flex items-center gap-3 pt-2">
              <div className="relative flex items-center justify-center w-3 h-3">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-[#E11D48]"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#E11D48]"></span>
              </div>
              <span className="text-sm font-semibold text-[#F8FAFC]">Open to Internships</span>
            </div>
          </motion.div>

          {/* Contact Methods List */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            {contactMethods.map((method, idx) => {
              const CardContent = (
                <div className="group flex items-center gap-5 p-4 rounded-2xl bg-[#0B1220] border border-[#233044] hover:border-[#B91C3C]/50 hover:bg-[#0F172A] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-[0_4px_20px_rgba(185,28,60,0.15)] w-full">
                  <div className="w-12 h-12 rounded-xl bg-[#0a0b13] border border-[#233044] group-hover:border-[#B91C3C]/40 flex items-center justify-center shrink-0 transition-colors">
                    {method.icon}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[10px] md:text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-0.5">
                      {method.label}
                    </span>
                    <span className="text-sm md:text-base font-semibold text-[#F8FAFC] group-hover:text-white truncate transition-colors">
                      {method.value}
                    </span>
                  </div>
                </div>
              );

              return method.href ? (
                <a 
                  key={idx} 
                  href={method.href} 
                  target={method.href.startsWith("http") ? "_blank" : undefined} 
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  download={method.download}
                  className="block focus:outline-none"
                >
                  {CardContent}
                </a>
              ) : (
                <div key={idx}>
                  {CardContent}
                </div>
              );
            })}
          </motion.div>

          {/* Large Social Links (Magnet Effect) */}
          <motion.div variants={itemVariants} className="flex gap-4 pt-4 border-t border-[#233044]/50">
            <Magnet padding={50} disabled={false} magnetStrength={3}>
              <a
                href="https://github.com/amankumarjha006"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0B1220] border border-[#233044] hover:border-[#B91C3C]/60 text-[#CBD5E1] hover:text-white transition-colors shadow-sm hover:shadow-[0_0_20px_rgba(185,28,60,0.2)] focus:outline-none"
                aria-label="GitHub"
              >
                <GithubIcon className="w-6 h-6" />
              </a>
            </Magnet>
            
            <Magnet padding={50} disabled={false} magnetStrength={3}>
              <a
                href="https://www.linkedin.com/in/aman-kumar-jha-615274323"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0B1220] border border-[#233044] hover:border-[#B91C3C]/60 text-[#CBD5E1] hover:text-white transition-colors shadow-sm hover:shadow-[0_0_20px_rgba(185,28,60,0.2)] focus:outline-none"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-6 h-6" />
              </a>
            </Magnet>

            <Magnet padding={50} disabled={false} magnetStrength={3}>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=akjha0810@gmail.com&su=Opportunity%20for%20Aman%20Kumar%20Jha&body=Hi%20Aman,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0B1220] border border-[#233044] hover:border-[#B91C3C]/60 text-[#CBD5E1] hover:text-white transition-colors shadow-sm hover:shadow-[0_0_20px_rgba(185,28,60,0.2)] focus:outline-none"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </Magnet>
          </motion.div>

        </div>

        {/* Right Column: Contact Form */}
        <motion.div variants={itemVariants} className="relative">
          {/* Subtle ambient glow behind form */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#B91C3C]/10 to-transparent blur-3xl rounded-[32px] -z-10 pointer-events-none" />
          
          <div className="p-6 md:p-10 bg-[#0B1220] border border-[#233044] rounded-[32px] shadow-2xl relative overflow-hidden">
            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(185,28,60,0.15),transparent)] pointer-events-none" />

            <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10 flex flex-col h-full">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[11px] font-bold text-[#94A3B8] font-mono uppercase tracking-wider pl-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleFormChange}
                    required
                    disabled={status === "submitting" || status === "success"}
                    placeholder="John Doe"
                    className="w-full h-12 px-4 rounded-xl bg-[#0F172A] border border-[#233044] text-[#F8FAFC] placeholder-[#475569] text-sm focus:outline-none focus:border-[#B91C3C] focus:ring-1 focus:ring-[#B91C3C]/50 transition-all disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[11px] font-bold text-[#94A3B8] font-mono uppercase tracking-wider pl-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleFormChange}
                    required
                    disabled={status === "submitting" || status === "success"}
                    placeholder="john@example.com"
                    className="w-full h-12 px-4 rounded-xl bg-[#0F172A] border border-[#233044] text-[#F8FAFC] placeholder-[#475569] text-sm focus:outline-none focus:border-[#B91C3C] focus:ring-1 focus:ring-[#B91C3C]/50 transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className="text-[11px] font-bold text-[#94A3B8] font-mono uppercase tracking-wider pl-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleFormChange}
                  disabled={status === "submitting" || status === "success"}
                  placeholder="Internship Opportunity / Collaboration"
                  className="w-full h-12 px-4 rounded-xl bg-[#0F172A] border border-[#233044] text-[#F8FAFC] placeholder-[#475569] text-sm focus:outline-none focus:border-[#B91C3C] focus:ring-1 focus:ring-[#B91C3C]/50 transition-all disabled:opacity-50"
                />
              </div>

              {/* Message */}
              <div className="space-y-2 flex-1">
                <label htmlFor="message" className="text-[11px] font-bold text-[#94A3B8] font-mono uppercase tracking-wider pl-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleFormChange}
                  required
                  disabled={status === "submitting" || status === "success"}
                  rows={5}
                  placeholder="Hi Aman, I wanted to reach out regarding..."
                  className="w-full px-4 py-4 rounded-xl bg-[#0F172A] border border-[#233044] text-[#F8FAFC] placeholder-[#475569] text-sm focus:outline-none focus:border-[#B91C3C] focus:ring-1 focus:ring-[#B91C3C]/50 resize-none transition-all disabled:opacity-50"
                />
              </div>

              {/* Submit Button & Status Alerts */}
              <div className="pt-2">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-sm py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-inner select-none w-full"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  ) : status === "error" ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-center gap-2 text-red-400 font-semibold text-sm py-4 rounded-xl bg-red-500/10 border border-red-500/20 shadow-inner select-none w-full"
                    >
                      <AlertCircle className="w-5 h-5" />
                      Oops! Something went wrong. Please try again or email me directly.
                    </motion.div>
                  ) : (
                    <motion.div
                      key="submit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Magnet padding={10} disabled={status === "submitting"} magnetStrength={5} wrapperClassName="w-full" innerClassName="w-full">
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="w-full flex h-14 items-center justify-center gap-2 rounded-xl bg-[#B91C3C] hover:bg-[#D61F48] disabled:bg-[#B91C3C]/50 text-white font-bold text-sm md:text-base tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(185,28,60,0.3)] hover:shadow-[0_0_30px_rgba(185,28,60,0.5)] hover:-translate-y-0.5 select-none focus:outline-none"
                        >
                          {status === "submitting" ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              Send Message
                              <Send className="w-4 h-4 ml-1" />
                            </>
                          )}
                        </button>
                      </Magnet>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
