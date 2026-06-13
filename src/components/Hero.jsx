"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Layers, Terminal, ChevronRight, Download, ArrowDown } from "lucide-react";
import Galaxy from "./Galaxy/Galaxy";
import SplitText from "./SplitText/SplitText";
import Magnet from "./Magnet/Magnet";
import { socials } from "@/data/socials";

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
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

const MailIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

// ─── Social Icon Map ──────────────────────────────────────────────────────────
const socialIconMap = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: MailIcon,
};

// ─── Focus Areas Data ─────────────────────────────────────────────────────────
const focusAreas = [
  { icon: <Cpu className="w-3.5 h-3.5" />, text: "RAG Applications" },
  { icon: <Layers className="w-3.5 h-3.5" />, text: "AI-Powered Products" },
  { icon: <Terminal className="w-3.5 h-3.5" />, text: "Full-Stack Development" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0a0b13" }}
    >
      {/* ── Galaxy Background ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Galaxy
          glowIntensity={0.18}
          starSpeed={0.5}
          density={1}
          repulsionStrength={1.2}
          twinkleIntensity={0.2}
          rotationSpeed={0.05}
          transparent={false}
        />
      </div>

      {/* ── Dark overlay to dim galaxy ────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "rgba(5, 8, 22, 0.55)" }}
      />

      {/* ── Burgundy nebula glow behind content ───────────────────────────── */}
      <div
        className="absolute z-[2] pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(185, 28, 60, 0.12) 0%, rgba(185, 28, 60, 0.04) 45%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Bottom blend overlay to fade galaxy into page background ──────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[3] pointer-events-none bg-gradient-to-t from-[#0a0b13] via-[#0a0b13]/70 to-transparent"
      />

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-24 flex flex-col items-center text-center pointer-events-none">

        {/* 1 ─ Badge */}
        <motion.div {...fadeUp(0.1)} className="pointer-events-auto mb-8">
          <div
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-md cursor-default transition-all duration-300"
            style={{
              background: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(185, 28, 60, 0.35)",
              boxShadow: "0 0 0 0 rgba(185, 28, 60, 0)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 0 18px 2px rgba(185, 28, 60, 0.22)";
              e.currentTarget.style.borderColor = "rgba(185, 28, 60, 0.7)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 0 0 0 rgba(185, 28, 60, 0)";
              e.currentTarget.style.borderColor = "rgba(185, 28, 60, 0.35)";
            }}
          >
            <span
              className="relative flex w-2 h-2"
            >
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ backgroundColor: "#B91C3C" }}
              />
              <span
                className="relative inline-flex rounded-full w-2 h-2"
                style={{ backgroundColor: "#E11D48" }}
              />
            </span>
            <span
              className="text-xs font-medium tracking-wide"
              style={{ color: "#CBD5E1" }}
            >
              AI/ML Engineer&nbsp;&bull;&nbsp;Full Stack Developer
            </span>
          </div>
        </motion.div>

        {/* 2 ─ Name */}
        <div className="pointer-events-auto mb-7 relative w-full">
          {/* Subtle burgundy text glow layer */}
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              filter: "blur(64px)",
              background: "radial-gradient(ellipse at center, rgba(185, 28, 60, 0.2) 0%, transparent 70%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none"
              style={{
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "white",
              }}
            >
              <SplitText
                text="Aman Kumar Jha"
                delay={38}
                duration={0.55}
                ease={[0.22, 1, 0.36, 1]}
                splitType="chars"
                from={{ opacity: 0, y: 56 }}
                to={{ opacity: 1, y: 0 }}
                tag="span"
              />
            </h1>
          </motion.div>
        </div>

        {/* 3 ─ Subtitle */}
        <motion.div {...fadeUp(0.65)} className="pointer-events-auto mb-11 max-w-[750px] px-4">
          <p className="text-base lg:text-lg leading-relaxed font-normal" style={{ color: "#94A3B8" }}>
            Focused on{" "}
            <span
              className="font-semibold transition-colors duration-200"
              style={{ color: "#E11D48" }}
            >
              machine learning
            </span>
            ,{" "}
            <span
              className="font-semibold transition-colors duration-200"
              style={{ color: "#E11D48" }}
            >
              backend engineering
            </span>
            , and scalable web development.
          </p>
        </motion.div>

        {/* 4 ─ Focus Area Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          {focusAreas.map((item, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-default transition-all duration-300"
              style={{
                background: "rgba(15, 23, 42, 0.75)",
                border: "1px solid rgba(203, 213, 225, 0.08)",
                color: "#CBD5E1",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(185, 28, 60, 0.5)";
                e.currentTarget.style.boxShadow = "0 0 14px 1px rgba(185, 28, 60, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(203, 213, 225, 0.08)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span style={{ color: "#B91C3C" }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </motion.div>

        {/* 5 ─ CTA Buttons */}
        <motion.div
          {...fadeUp(1.05)}
          className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {/* Primary */}
          <Magnet padding={35} magnetStrength={3}>
            <button
              className="group relative flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-white overflow-hidden transition-all duration-300"
              style={{
                background: "#B91C3C",
                boxShadow: "0 4px 24px rgba(185, 28, 60, 0.35)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#D61F48";
                e.currentTarget.style.boxShadow = "0 6px 32px rgba(214, 31, 72, 0.5)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#B91C3C";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(185, 28, 60, 0.35)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View Projects
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </Magnet>

          {/* Secondary */}
          <Magnet padding={35} magnetStrength={3}>
            <a
              href="/Aman_Kumar_Jha_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
              style={{
                background: "transparent",
                border: "1px solid rgba(203, 213, 225, 0.18)",
                color: "#CBD5E1",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(185, 28, 60, 0.5)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(185, 28, 60, 0.18)";
                e.currentTarget.style.color = "#F8FAFC";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(203, 213, 225, 0.18)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.color = "#CBD5E1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Download className="w-4 h-4" />
              View Resume
            </a>
          </Magnet>
        </motion.div>

        {/* 6 ─ Social Links */}
        <motion.div
          {...fadeIn(1.3)}
          className="pointer-events-auto flex items-center justify-center gap-4"
        >
          {socials.map((social, idx) => {
            const Icon = socialIconMap[social.platform] || MailIcon;
            return (
              <Magnet key={idx} padding={20} magnetStrength={2}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
                  style={{
                    background: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid rgba(203, 213, 225, 0.1)",
                    color: "#94A3B8",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(185, 28, 60, 0.6)";
                    e.currentTarget.style.color = "#F8FAFC";
                    e.currentTarget.style.boxShadow = "0 0 14px rgba(185, 28, 60, 0.25)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(203, 213, 225, 0.1)";
                    e.currentTarget.style.color = "#94A3B8";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              </Magnet>
            );
          })}
        </motion.div>
      </div>

      {/* 7 ─ Scroll Indicator */}
      <motion.div
        {...fadeIn(1.6)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        {/* Animated vertical line */}
        <motion.div
          className="w-px rounded-full overflow-hidden"
          style={{ height: "36px", background: "rgba(203, 213, 225, 0.1)" }}
        >
          <motion.div
            className="w-full rounded-full"
            style={{ height: "50%", background: "rgba(185, 28, 60, 0.6)" }}
            animate={{ y: ["0%", "200%", "0%"] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Glowing dot */}
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "#B91C3C", boxShadow: "0 0 8px 2px rgba(185, 28, 60, 0.6)" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />

        {/* Chevron arrow */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3 h-3" style={{ color: "rgba(148, 163, 184, 0.5)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
