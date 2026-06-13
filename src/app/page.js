"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
import { projects } from "@/data/projects";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import SectionDivider from "@/components/SectionDivider";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import OrbitalSkills from "@/components/OrbitalSkills";
import ClickSpark from "@/components/ClickSpark/ClickSpark";

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
const Github = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── Floating Particles Component ──────────────────────────────────────────
const AmbientParticles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Determinisitc layout to prevent server/client hydration mismatches
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    size: (i % 3) * 1.5 + 2, // 2px to 5px
    left: ((i * 17) % 94) + 3,
    top: ((i * 23) % 94) + 3,
    duration: 22 + (i % 4) * 6, // 22s to 46s
    delay: (i % 5) * 1.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#E11D48] filter blur-[0.5px]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, (p.id % 2 === 0 ? 25 : -25), 0],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

// ─── Skills Data ────────────────────────────────────────────────────────────
// (Skills data is now managed directly inside OrbitalSkills.jsx)


export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <ClickSpark sparkColor="#B91C3C" sparkSize={5} sparkRadius={15} sparkCount={8} duration={400} extraScale={1.2}>
      <div className="relative min-h-screen bg-[#0a0b13] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#B91C3C]/30 selection:text-white">
      {/* ── Fixed noise overlay ── */}
      <div className="noise-overlay" />

      {/* ── Galaxy background in hero only ── */}
      <Hero />

      {/* ── Ambient Radial Glows & Background Accents ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Glow behind Projects section */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.09]"
          style={{
            top: "1100px",
            left: "-15%",
            background: "radial-gradient(circle, #B91C3C 0%, transparent 70%)",
          }}
        />
        {/* Glow behind Skills section */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-[160px] opacity-[0.07]"
          style={{
            top: "1900px",
            right: "-20%",
            background: "radial-gradient(circle, #E11D48 0%, transparent 70%)",
          }}
        />
        {/* Glow behind About section */}
        <div
          className="absolute w-[650px] h-[650px] rounded-full blur-[150px] opacity-[0.08]"
          style={{
            top: "2600px",
            left: "-10%",
            background: "radial-gradient(circle, #B91C3C 0%, transparent 70%)",
          }}
        />
        {/* Glow behind Contact section */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[130px] opacity-[0.09]"
          style={{
            bottom: "100px",
            right: "5%",
            background: "radial-gradient(circle, #E11D48 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Main Layout Container ── */}
      <main className="flex-1 w-full relative z-10">
        
        {/* ── Ambient Particles across layout ── */}
        <AmbientParticles />

        {/* ── Projects Grid Showcase ── */}
        <section id="projects" className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 relative z-10" aria-label="Featured projects showcase">
          <SectionHeading
            label="Featured Work"
            title="Projects"
            description="A collection of AI-powered products, machine learning experiments, and full-stack applications."
          />

          <div className="flex justify-end mb-6">
            <span className="text-xs text-[#CBD5E1] font-mono bg-[#0B1220] border border-[#233044] px-3.5 py-1.5 rounded-xl select-none">
              Showing {projects.length} of {projects.length} results
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ── Skills Section ── */}
        <section id="skills" className="relative z-10" aria-label="Technical skills stack">
          <OrbitalSkills />
        </section>

        <SectionDivider />

        {/* ── About Section ── */}
        <AboutSection />

        <SectionDivider />

        {/* ── Contact Section ── */}
        <ContactSection />
      </main>

      {/* ── Footer Section ── */}
      <footer className="border-t border-[#233044] bg-[#0a0b13]/90 py-12 text-center text-[#94A3B8] text-sm z-10 select-none relative">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Aman Kumar Jha. All rights reserved.</p>
          <div className="flex gap-6 text-[#CBD5E1]">
            <a href="https://github.com/amankumarjha006" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:text-rose-500 transition-colors duration-200">GitHub</a>
            <span className="text-[#233044]">|</span>
            <a href="https://cine-sync-hvnp.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:text-rose-500 transition-colors duration-200">CineSync</a>
            <span className="text-[#233044]">|</span>
            <a href="https://ainotes-navy.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:text-rose-500 transition-colors duration-200">AI Notes</a>
          </div>
        </div>
      </footer>

      {/* ── Modals ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
      </div>
    </ClickSpark>
  );
}
