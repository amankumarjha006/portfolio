"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectDetailsModal({ project, onClose }) {
  if (!project) return null;

  const {
    title,
    tagline,
    description,
    image,
    github,
    live,
    featured,
    stats = [],
    techStack = [],
    details = {},
    deepDive = [],
    highlights = [],
  } = project;

  const modalRef = useRef(null);

  // Focus Trapping and Body Scroll Lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const modal = modalRef.current;
    if (!modal) return;

    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modal.querySelectorAll(focusableSelector);
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const elements = modal.querySelectorAll(focusableSelector);
        if (elements.length === 0) return;
        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Bento Box Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050816]/90 backdrop-blur-xl overflow-y-auto"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col w-full max-w-6xl max-h-[90vh] bg-[#050816] border border-[#233044] rounded-3xl shadow-2xl overflow-hidden focus:outline-none ring-1 ring-white/5"
      >
        {/* Top Header Controls */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0F172A]/80 border border-[#233044] text-[#CBD5E1] hover:text-white hover:bg-[#B91C3C] hover:border-[#B91C3C] transition-all duration-300 shadow-lg backdrop-blur-md group"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 stroke-2 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
          <div className="p-6 sm:p-10 space-y-12">
            
            {/* HERO SECTION: Identity vs Screenshot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Identity Column */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    {featured && (
                      <span className="px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-full bg-[#B91C3C]/20 border border-[#B91C3C]/50 shadow-[0_0_15px_rgba(185,28,60,0.3)]">
                        Featured Project
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
                    {title}
                  </h2>
                  <p className="text-lg text-[#B91C3C] font-medium tracking-wide">
                    {tagline}
                  </p>
                </div>
                
                <p className="text-[#94A3B8] text-base leading-relaxed">
                  {description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  {live?.url && (
                    <a
                      href={live.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center gap-2 px-6 rounded-xl bg-gradient-to-r from-[#B91C3C] to-[#E11D48] hover:from-[#D61F48] hover:to-[#B91C3C] text-white font-bold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(185,28,60,0.4)] hover:shadow-[0_6px_25px_rgba(185,28,60,0.6)] hover:-translate-y-0.5"
                    >
                      <span>View Live Demo</span>
                      <svg className="w-4 h-4 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  )}
                  {github?.url && (
                    <a
                      href={github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center gap-2 px-6 rounded-xl border border-[#233044] hover:border-[#B91C3C] bg-[#0F172A] hover:bg-[#0B1220] text-[#F8FAFC] font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-[0_4px_20px_rgba(185,28,60,0.2)] hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Screenshot Column */}
              <div className="lg:col-span-7 relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#B91C3C] to-[#E11D48] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-2xl overflow-hidden border border-[#233044] bg-[#0B1220] shadow-2xl">
                  {image ? (
                    <img
                      src={image}
                      alt={`${title} showcase`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#94A3B8]">
                      <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>No Preview Available</span>
                    </div>
                  )}
                  {/* Subtle Inner Shadow overlay */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none"></div>
                </div>
              </div>

            </div>

            {/* MAGIC BENTO GRID SECTION */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
            >
              
              {/* Bento: Tech Stack (Spans 1 col) */}
              {techStack.length > 0 && (
                <motion.div variants={itemVariants} className="md:col-span-1 bg-[#0F172A] border border-[#233044] rounded-3xl p-6 lg:p-8 hover:border-[#B91C3C]/50 transition-colors duration-300 relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#B91C3C] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <h3 className="text-[#F59E0B] font-mono text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-3 relative z-10">
                    {techStack.map((tech, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0B1220] border border-[#233044] rounded-xl shadow-sm hover:shadow-md hover:border-[#B91C3C]/60 hover:-translate-y-1 transition-all duration-300"
                      >
                        {tech.icon && (
                          <img
                            src={tech.icon}
                            alt={`${tech.name} logo`}
                            className="w-5 h-5 object-contain"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        )}
                        <span className="text-[#F8FAFC] font-medium text-sm tracking-wide">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Bento: Stats (Spans 1 col) */}
              {stats.length > 0 && (
                <motion.div variants={itemVariants} className="md:col-span-1 bg-[#0F172A] border border-[#233044] rounded-3xl p-6 lg:p-8 hover:border-[#B91C3C]/50 transition-colors duration-300 flex flex-col justify-center">
                  <h3 className="text-[#F59E0B] font-mono text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    Key Metrics
                  </h3>
                  <div className="space-y-4">
                    {stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{stat}</span>
                        <span className="text-xs font-mono text-[#94A3B8] uppercase mt-1">Impact Metric {idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Bento: Problem (Spans 1 col) */}
              {details.problem && (
                <motion.div variants={itemVariants} className="md:col-span-1 bg-[#0F172A] border border-[#233044] rounded-3xl p-6 lg:p-8 hover:border-[#B91C3C]/50 transition-colors duration-300 group">
                  <h3 className="text-[#E11D48] font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse"></span>
                    The Problem
                  </h3>
                  <p className="text-[#CBD5E1] text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                    {details.problem}
                  </p>
                </motion.div>
              )}

              {/* Bento: Solution (Spans 1 col) */}
              {details.solution && (
                <motion.div variants={itemVariants} className="md:col-span-1 bg-[#0F172A] border border-[#233044] rounded-3xl p-6 lg:p-8 hover:border-[#B91C3C]/50 transition-colors duration-300 group relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#B91C3C] blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <h3 className="text-[#10B981] font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                    The Solution
                  </h3>
                  <p className="text-[#CBD5E1] text-base leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10 max-w-3xl">
                    {details.solution}
                  </p>
                </motion.div>
              )}

              {/* Bento: Challenges (Spans 1 col) */}
              {details.challenges && details.challenges.length > 0 && (
                <motion.div variants={itemVariants} className="md:col-span-1 bg-[#0F172A] border border-[#233044] rounded-3xl p-6 lg:p-8 hover:border-[#B91C3C]/50 transition-colors duration-300">
                  <h3 className="text-[#F59E0B] font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    Challenges Overcome
                  </h3>
                  <ul className="space-y-3">
                    {details.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[#CBD5E1] text-sm leading-relaxed">
                        <span className="text-[#B91C3C] font-bold mt-0.5">×</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Bento: Learnings (Spans 1 col) */}
              {details.learnings && details.learnings.length > 0 && (
                <motion.div variants={itemVariants} className="md:col-span-1 bg-[#0F172A] border border-[#233044] rounded-3xl p-6 lg:p-8 hover:border-[#B91C3C]/50 transition-colors duration-300">
                  <h3 className="text-[#3B82F6] font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    Key Takeaways
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {details.learnings.map((learning, idx) => (
                      <div key={idx} className="bg-[#0B1220] border border-[#233044] rounded-xl p-4 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-[#F8FAFC] text-sm font-medium">{learning}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Bento: Deep Dive / Highlights (Spans full width - 3 cols) */}
              {(deepDive.length > 0 || highlights.length > 0) && (
                <motion.div variants={itemVariants} className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-2">
                  
                  {deepDive.length > 0 && (
                    <div className="bg-[#0F172A] border border-[#233044] rounded-3xl p-6 lg:p-8 hover:border-[#B91C3C]/50 transition-colors duration-300">
                      <h3 className="text-[#8B5CF6] font-mono text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        Technical Deep Dive
                      </h3>
                      <div className="space-y-4">
                        {deepDive.map((item, idx) => (
                          <div key={idx} className="flex flex-col pb-4 border-b border-[#233044] last:border-0 last:pb-0">
                            <span className="text-[#94A3B8] font-mono text-xs uppercase mb-1">{item.label}</span>
                            <span className="text-[#F8FAFC] font-medium text-sm">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {highlights.length > 0 && (
                    <div className="bg-[#0F172A] border border-[#233044] rounded-3xl p-6 lg:p-8 hover:border-[#B91C3C]/50 transition-colors duration-300">
                      <h3 className="text-[#EC4899] font-mono text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                        Project Highlights
                      </h3>
                      <div className="space-y-4">
                        {highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#EC4899]/20 flex items-center justify-center shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-[#EC4899]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span className="text-[#CBD5E1] text-sm leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </motion.div>
              )}

            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
