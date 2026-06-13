"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TiltedCard from "@/components/TiltedCard/TiltedCard";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import CountUp from "@/components/CountUp/CountUp";

// ─── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Parses a stat string to extract numeric and text portions.
 * e.g. "44K+ Movies" → { number: 44, suffix: "K+ Movies" }
 * e.g. "TF-IDF" → { number: null, text: "TF-IDF" }
 */
function parseStat(stat) {
  const match = stat.match(/^([\d,.]+)(.*)/);
  if (match) {
    const num = parseFloat(match[1].replace(/,/g, ""));
    return { number: num, suffix: match[2], text: null };
  }
  return { number: null, suffix: null, text: stat };
}

// ─── Component ──────────────────────────────────────────────────────────────────

export default function ProjectCard({ project, onClick, index = 0 }) {
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
  } = project;

  // ── Scroll-reveal entrance ──────────────────────────────────────────────────
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleCardClick = (e) => {
    if (e.target.closest("a")) return;
    if (onClick) onClick();
  };

  const handleKeyDown = (e) => {
    if (e.target.closest("a")) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (onClick) onClick();
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.45,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="h-full"
    >
      <TiltedCard
        rotateAmplitude={6}
        scaleOnHover={1.02}
        showMobileWarning={false}
        showTooltip={false}
      >
        <SpotlightCard
          className="h-full"
          spotlightColor="rgba(185, 28, 60, 0.08)"
        >
          <div
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${title}`}
            className="
              relative flex flex-col h-full
              bg-[#0B1220] border border-[#233044]
              rounded-3xl overflow-hidden
              text-[#F8FAFC]
              cursor-pointer
              transition-all duration-300
              hover:border-[rgba(185,28,60,0.4)]
              hover:shadow-[0_8px_30px_-8px_rgba(185,28,60,0.15),0_0_20px_rgba(185,28,60,0.06)]
              focus:outline-none
              focus-visible:ring-2 focus-visible:ring-[#B91C3C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b13]
            "
          >
            {/* ─── Image Section (40-45%) ──────────────────────────────── */}
            <div className="relative w-full aspect-[16/9] overflow-hidden select-none">
              {image ? (
                <img
                  src={image}
                  alt={`${title} project thumbnail`}
                  className="w-full h-full object-cover object-center transition-transform duration-400 ease-out hover:scale-[1.04]"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0F172A] to-[#0B1220] flex items-center justify-center">
                  <span className="text-[#94A3B8] text-sm">No Preview</span>
                </div>
              )}

              {/* Dark gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent pointer-events-none" />

              {/* Featured Badge */}
              {featured && (
                <div className="absolute top-3.5 right-3.5 z-10">
                  <span className="
                    inline-flex items-center gap-1.5
                    px-3 py-1
                    text-[10px] font-bold tracking-wider text-white uppercase
                    rounded-full
                    bg-[#B91C3C]
                    border border-[rgba(185,28,60,0.3)]
                    shadow-[0_0_12px_rgba(185,28,60,0.4)]
                    backdrop-blur-sm
                    select-none
                  ">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* ─── Content Section ─────────────────────────────────────── */}
            <div className="flex flex-col flex-1 p-5 md:p-6 space-y-4">
              {/* Title & Tagline */}
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight text-[#F8FAFC] leading-tight">
                  {title}
                </h3>
                <p className="text-[13px] text-[#94A3B8] font-medium truncate">
                  {tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-[#CBD5E1] text-sm leading-relaxed line-clamp-2">
                {description}
              </p>

              {/* ─── Tech Stack Badges ──────────────────────────────────── */}
              {techStack.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies used">
                    {techStack.map((tech, i) => (
                      <div
                        key={i}
                        className="
                          flex items-center gap-1.5
                          px-2.5 py-1
                          bg-[#0F172A] border border-[#233044]
                          rounded-lg
                          text-[11px] font-mono text-[#CBD5E1]
                          cursor-default select-none
                          transition-all duration-200
                          hover:border-[#B91C3C]/50 hover:text-[#F8FAFC]
                        "
                        role="listitem"
                      >
                        {tech.icon && (
                          <img
                            src={tech.icon}
                            alt={`${tech.name} logo`}
                            className="w-[16px] h-[16px] object-contain"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                            aria-hidden="true"
                          />
                        )}
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── Stats Section ──────────────────────────────────────── */}
              {stats.length > 0 && (
                <div className="grid grid-cols-3 gap-2" role="list" aria-label="Project metrics">
                  {stats.map((stat, i) => {
                    const parsed = parseStat(stat);
                    return (
                      <div
                        key={i}
                        className="
                          flex flex-col items-center justify-center
                          py-2.5 px-1.5
                          bg-[#0F172A] border border-[#233044]
                          rounded-xl
                          text-center
                          select-none
                        "
                        role="listitem"
                      >
                        {parsed.number !== null ? (
                          <span className="text-base font-bold text-[#F8FAFC] leading-none">
                            <CountUp
                              to={parsed.number}
                              from={0}
                              duration={1.8}
                              delay={0.2 + i * 0.1}
                              className="text-base font-bold text-[#F8FAFC]"
                            />
                            <span className="text-[#F59E0B]">{parsed.suffix}</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-[#F8FAFC] leading-tight">
                            {parsed.text}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ─── Action Buttons ─────────────────────────────────────── */}
              <div className="pt-1 mt-auto flex gap-2.5">
                {/* Live Demo — Primary */}
                {live && live.url && (
                  <a
                    href={live.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open live demo for ${title}`}
                    className="
                      flex-1 flex h-10 px-4 items-center justify-center gap-2
                      rounded-xl
                      bg-[#B91C3C] hover:bg-[#D61F48]
                      text-white font-semibold text-xs
                      transition-all duration-200
                      shadow-[0_2px_10px_rgba(185,28,60,0.25)]
                      hover:shadow-[0_4px_20px_rgba(185,28,60,0.35)]
                    "
                  >
                    <span>Live Demo</span>
                    <svg
                      className="w-3.5 h-3.5 stroke-2 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                )}

                {/* GitHub — Outline */}
                {github && github.url && (
                  <a
                    href={github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open GitHub repository for ${title}`}
                    className="
                      flex-1 flex h-10 px-4 items-center justify-center gap-2
                      rounded-xl
                      border border-[#233044] hover:border-[#B91C3C]/50
                      bg-[#0F172A]/60 hover:bg-[#0F172A]
                      text-[#CBD5E1] hover:text-white
                      font-medium text-xs
                      transition-all duration-200
                    "
                  >
                    {github.icon ? (
                      <img
                        src={github.icon}
                        alt="GitHub"
                        className="w-4 h-4 object-contain invert opacity-70 hover:opacity-100"
                        aria-hidden="true"
                      />
                    ) : (
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    )}
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </TiltedCard>
    </motion.article>
  );
}
