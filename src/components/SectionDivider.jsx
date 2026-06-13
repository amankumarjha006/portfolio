"use client";

import React from "react";

export default function SectionDivider({ className = "" }) {
  return (
    <div className={`w-full flex items-center justify-center py-12 select-none pointer-events-none ${className}`}>
      <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#233044] to-transparent relative opacity-70">
        {/* Soft centered burgundy glow divider */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#B91C3C]/80 to-transparent blur-[1px]" 
        />
        {/* Center tiny accent glow dot */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#B91C3C] shadow-[0_0_8px_1.5px_rgba(185,28,60,0.7)]" 
        />
      </div>
    </div>
  );
}
