"use client";

import React from "react";
import { motion } from "framer-motion";
import SplitText from "./SplitText/SplitText";

export default function SectionHeading({
  label,
  title,
  description,
  className = "",
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "120px",
      opacity: 1,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
    },
  };

  const descVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={`flex flex-col items-start text-left mb-10 md:mb-12 ${className}`}
    >
      {/* Label */}
      {label && (
        <motion.span
          variants={labelVariants}
          className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#E11D48] mb-3 select-none"
        >
          {label}
        </motion.span>
      )}

      {/* Title */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight select-none">
        <SplitText
          text={title}
          delay={25}
          duration={0.5}
          splitType="chars"
          from={{ opacity: 0, y: 15 }}
          to={{ opacity: 1, y: 0 }}
          tag="span"
        />
      </h2>

      {/* Decorative Gradient Line + Glow Dot */}
      <div className="flex items-center gap-2 mt-4.5 w-full select-none">
        <motion.div
          variants={lineVariants}
          className="h-[2px] bg-gradient-to-r from-[#B91C3C] via-[#E11D48] to-transparent"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
          className="w-1.5 h-1.5 rounded-full bg-[#E11D48] shadow-[0_0_10px_2px_rgba(225,29,72,0.7)]"
        />
      </div>

      {/* Intro Description */}
      {description && (
        <motion.p
          variants={descVariants}
          className="text-base lg:text-lg text-[#CBD5E1] max-w-2xl mt-5 leading-relaxed font-normal"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
