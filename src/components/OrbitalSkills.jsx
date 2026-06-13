"use client";

import React, { useState } from "react";
import SectionHeading from "./SectionHeading";

const skillsData = {
  inner: [
    { name: "Python", icon: "/icons/Python.svg" },
    // Temporarily using Jupyter as a placeholder until Java.svg is added
    { name: "Java", icon: "/icons/Java.svg" },
    { name: "JavaScript", icon: "/icons/JavaScript.svg" },
  ],
  middle: [
    { name: "React", icon: "/icons/React.svg" },
    { name: "Next.js", icon: "/icons/Next.js.svg" },
    { name: "Tailwind CSS", icon: "/icons/TailwindCSS.svg" },
  ],
  outer: [
    { name: "Node.js", icon: "/icons/Node.js.svg" },
    { name: "FastAPI", icon: "/icons/FastAPI.svg" },
    { name: "MongoDB", icon: "/icons/MongoDB.svg" },
    { name: "PostgreSQL", icon: "/icons/PostgresSQL.svg" },
    { name: "Git", icon: "/icons/Git.svg" },
  ],
};

const OrbitRing = ({ size, isHovered }) => (
  <div
    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white transition-all duration-500 pointer-events-none ${
      isHovered ? "opacity-30 border-[#B91C3C] shadow-[0_0_20px_rgba(185,28,60,0.2)]" : "opacity-5"
    }`}
    style={{ width: size, height: size }}
  />
);

const Planet = ({ skill, orbitRadius, startAngle, duration, onHover, onLeave, hoveredPlanet }) => {
  const isHovered = hoveredPlanet === skill.name;
  // If another planet is hovered, slightly dim this one
  const isDimmed = hoveredPlanet && hoveredPlanet !== skill.name;

  return (
    <div
      className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center planet-orbit z-20 transition-opacity duration-300"
      style={{
        "--start-angle": `${startAngle}deg`,
        "--radius": `${orbitRadius}px`,
        "--duration": `${duration}s`,
        opacity: isDimmed ? 0.3 : 1,
      }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={onLeave}
    >
      <div className="relative group cursor-pointer flex flex-col items-center justify-center">
        {/* Planet Icon Container */}
        <div
          className={`w-12 h-12 md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center bg-[#0F172A] border transition-all duration-300 ${
            isHovered
              ? "scale-125 border-[#B91C3C] shadow-[0_0_25px_rgba(185,28,60,0.6)]"
              : "border-[#233044] hover:border-[#B91C3C]/50"
          }`}
        >
          {/* Use standard img to handle potential missing SVGs gracefully */}
          <img
            src={skill.icon}
            alt="" // Remove alt to avoid broken text showing
            className="w-6 h-6 md:w-8 md:h-8 object-contain"
            onError={(e) => {
              // Better fallback for missing icon: show initials
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                 e.target.nextSibling.style.display = 'block';
                 e.target.nextSibling.classList.remove('hidden');
              }
            }}
          />
          <span className="hidden text-xs font-bold text-[#CBD5E1] tracking-wider select-none">
            {skill.name.slice(0, 2)}
          </span>
        </div>

        {/* Tooltip */}
        <div
          className={`absolute top-full mt-3 whitespace-nowrap text-sm font-semibold text-[#F8FAFC] transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {skill.name}
        </div>
      </div>
    </div>
  );
};

export default function OrbitalSkills() {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [hoveredOrbit, setHoveredOrbit] = useState(null);

  const handleHoverPlanet = (skillName, orbitName) => {
    setHoveredPlanet(skillName);
    setHoveredOrbit(orbitName);
  };

  const handleLeavePlanet = () => {
    setHoveredPlanet(null);
    setHoveredOrbit(null);
  };

  // Base radii for orbits
  const radii = {
    inner: 120,
    middle: 200,
    outer: 280,
  };

  // Speeds for orbits
  const speeds = {
    inner: 35,
    middle: 45,
    outer: 55,
  };

  return (
    <div className="w-full relative py-20 flex flex-col items-center overflow-hidden">
      {/* CSS Keyframes for Orbit */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes planetOrbit {
            0% { transform: rotate(var(--start-angle)) translateY(calc(-1 * var(--radius))) rotate(calc(-1 * var(--start-angle))); }
            100% { transform: rotate(calc(var(--start-angle) + 360deg)) translateY(calc(-1 * var(--radius))) rotate(calc(-1 * (var(--start-angle) + 360deg))); }
          }
          .planet-orbit {
            animation: planetOrbit var(--duration) linear infinite;
          }
          .orbit-system:hover .planet-orbit {
            animation-play-state: paused;
          }
        `
      }} />

      <SectionHeading
        label="TECH STACK"
        title="Skills & Technologies"
        description="Technologies I use to build AI-powered products, scalable backend systems, and modern web applications."
        className="max-w-[1200px] w-full px-6 z-30"
      />

      <div className="relative w-full max-w-[800px] h-[500px] md:h-[700px] mt-10 md:mt-20 mx-auto flex items-center justify-center orbit-system scale-[0.6] sm:scale-75 md:scale-100">
        
        {/* Deep space ambient elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(185,28,60,0.03)_0%,transparent_60%)]" />
        </div>

        {/* Orbit Rings */}
        <OrbitRing size={radii.inner * 2} isHovered={hoveredOrbit === "inner"} />
        <OrbitRing size={radii.middle * 2} isHovered={hoveredOrbit === "middle"} />
        <OrbitRing size={radii.outer * 2} isHovered={hoveredOrbit === "outer"} />

        {/* Central Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#0F172A] border-2 border-[#B91C3C] shadow-[0_0_40px_rgba(185,28,60,0.5),inset_0_0_20px_rgba(185,28,60,0.5)]">
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#E11D48] duration-3000" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-white font-black text-sm md:text-lg tracking-wider">AI / ML</span>
            <div className="w-8 h-[1px] bg-[#E11D48]/50 my-1 md:my-1.5" />
            <span className="text-[#CBD5E1] font-bold text-[10px] md:text-xs tracking-widest uppercase">Full Stack</span>
          </div>
        </div>

        {/* Planets - Inner */}
        {skillsData.inner.map((skill, i) => (
          <Planet
            key={skill.name}
            skill={skill}
            orbitRadius={radii.inner}
            startAngle={(360 / skillsData.inner.length) * i}
            duration={speeds.inner}
            hoveredPlanet={hoveredPlanet}
            onHover={(name) => handleHoverPlanet(name, "inner")}
            onLeave={handleLeavePlanet}
          />
        ))}

        {/* Planets - Middle */}
        {skillsData.middle.map((skill, i) => (
          <Planet
            key={skill.name}
            skill={skill}
            orbitRadius={radii.middle}
            startAngle={(360 / skillsData.middle.length) * i}
            duration={speeds.middle}
            hoveredPlanet={hoveredPlanet}
            onHover={(name) => handleHoverPlanet(name, "middle")}
            onLeave={handleLeavePlanet}
          />
        ))}

        {/* Planets - Outer */}
        {skillsData.outer.map((skill, i) => (
          <Planet
            key={skill.name}
            skill={skill}
            orbitRadius={radii.outer}
            startAngle={(360 / skillsData.outer.length) * i}
            duration={speeds.outer}
            hoveredPlanet={hoveredPlanet}
            onHover={(name) => handleHoverPlanet(name, "outer")}
            onLeave={handleLeavePlanet}
          />
        ))}

      </div>
    </div>
  );
}
