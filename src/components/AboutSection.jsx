"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard/SpotlightCard";
import { Hammer, BookOpen, Tv, Compass } from "lucide-react";

const AboutSection = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const exploringTopics = [
    "Data Structures & Algorithms",
    "Backend System Design",
    "Machine Learning",
    "Modern Web Development",
    "AI Product Engineering",
  ];

  const highlights = [
    {
      title: "Building",
      description: "AI-powered web applications and backend systems.",
      icon: <Hammer className="w-5 h-5 text-[#E11D48]" />,
    },
    {
      title: "Learning",
      description: "Machine Learning, DSA, and scalable software design.",
      icon: <BookOpen className="w-5 h-5 text-[#E11D48]" />,
    },
    {
      title: "Watching",
      description: "Movies, web series, and anime.",
      icon: <Tv className="w-5 h-5 text-[#E11D48]" />,
    },
    {
      title: "Looking For",
      description: "Internships, hackathons, and opportunities to work on impactful products.",
      icon: <Compass className="w-5 h-5 text-[#E11D48]" />,
    },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 xl:py-32 relative z-10" aria-label="About Aman Kumar Jha">
      <SectionHeading
        label="MY JOURNEY"
        title="About Me"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-10 md:mt-16"
      >
        {/* Left Column: Narrative & Timeline (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-12">
          {/* Introduction */}
          <motion.div variants={itemVariants} className="space-y-6 text-[#CBD5E1] text-base md:text-lg leading-relaxed font-light">
            <p>
              I am <strong className="text-white font-semibold">Aman Kumar Jha</strong>, a B.Tech CSE (AI/ML) student at SDGI Global University.
              I enjoy building products that combine robust software engineering with artificial intelligence.
            </p>
            <p>
              My primary interests lie at the intersection of Machine Learning, Backend Development, and Full Stack Applications.
            </p>
            <p>
              I prefer building complete products rather than isolated demos. There is something deeply satisfying about turning raw ideas into real applications that people can interact with and benefit from.
            </p>
          </motion.div>

          {/* Currently Exploring Timeline */}
          <motion.div variants={itemVariants} className="pt-2">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-bold text-white tracking-wide">Currently Exploring</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#B91C3C]/50 to-transparent" />
            </div>

            <div className="relative pl-4 border-l border-[#233044]/80 space-y-6">
              {exploringTopics.map((topic, idx) => (
                <div key={idx} className="relative flex items-center">
                  <div className="absolute -left-[21px] w-2.5 h-2.5 rounded-full bg-[#0F172A] border-2 border-[#B91C3C] shadow-[0_0_8px_rgba(185,28,60,0.6)]" />
                  <span className="text-sm md:text-base text-[#94A3B8] font-medium tracking-wide">
                    {topic}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Highlights (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 h-fit">
          {highlights.map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <SpotlightCard spotlightColor="rgba(185, 28, 60, 0.15)">
                <div className="p-6 bg-[#0B1220] border border-[#233044] rounded-[20px] flex items-start gap-4 hover:border-[#B91C3C]/40 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#0F172A] border border-[#233044] flex items-center justify-center shrink-0 shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1.5">{item.title}</h4>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
