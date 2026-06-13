"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(Math.min(100, Math.max(0, scroll * 100)));
    };

    // Initial call and event listener
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll spy
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px", // Adjust thresholds for better trigger
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Desktop Navigation Rail (Hidden on Tablet/Mobile) ── */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-[100]">
        <motion.div
          className="relative flex flex-col items-center py-6 rounded-full backdrop-blur-md overflow-hidden border border-[#233044] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          style={{ backgroundColor: "rgba(11, 18, 32, 0.85)" }}
          animate={{
            width: isHovered ? 180 : 60,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Top Monogram */}
          <div className="w-10 h-10 rounded-full bg-[#0F172A] border border-[#233044] flex items-center justify-center mb-8 shrink-0 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#B91C3C]/20 to-transparent pointer-events-none" />
             <span className="text-[#F8FAFC] font-bold text-xs tracking-wider font-mono">AKJ</span>
          </div>

          {/* Navigation Dots container */}
          <div className="relative flex flex-col items-start w-full px-[26px] gap-6">
            
            {/* The Vertical Progress Line Background */}
            <div className="absolute left-[28px] top-2 bottom-2 w-[2px] bg-[#233044] z-0 rounded-full" />
            
            {/* The Filled Vertical Progress Line */}
            <motion.div 
              className="absolute left-[28px] top-2 bottom-2 w-[2px] bg-[#B91C3C] z-0 origin-top rounded-full shadow-[0_0_8px_rgba(185,28,60,0.5)]"
              animate={{ scaleY: scrollProgress / 100 }}
              transition={{ ease: "linear", duration: 0.1 }}
            />

            {sections.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="relative z-10 flex items-center gap-4 group w-full text-left focus:outline-none"
                  aria-label={`Navigate to ${label}`}
                >
                  {/* Dot */}
                  <motion.div
                    className="shrink-0 rounded-full transition-colors duration-300 relative z-10"
                    animate={{
                      width: isActive ? 10 : 6,
                      height: isActive ? 10 : 6,
                      backgroundColor: isActive ? "#B91C3C" : "#64748B",
                      x: isActive ? -2 : 0,
                    }}
                  >
                    {isActive && (
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-[#B91C3C]"
                        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      />
                    )}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full shadow-[0_0_12px_4px_rgba(185,28,60,0.4)] pointer-events-none" />
                    )}
                  </motion.div>

                  {/* Label */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-200 ${
                          isActive ? "text-[#D61F48]" : "text-[#CBD5E1] group-hover:text-white"
                        }`}
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Bottom Scroll Progress % */}
          <div className="mt-8 flex items-center justify-center w-full shrink-0">
            <span className="text-[10px] font-mono text-[#94A3B8] font-semibold tracking-widest">
              {Math.round(scrollProgress)}%
            </span>
          </div>

        </motion.div>
      </div>

      {/* ── Mobile & Tablet Navigation Floating Action Button ── */}
      <div className="lg:hidden fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-16 right-0 mb-4 bg-[#0B1220] border border-[#233044] rounded-2xl p-4 flex flex-col gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md min-w-[160px]"
            >
              <div className="text-xs font-mono text-[#94A3B8] mb-1 px-2 border-b border-[#233044] pb-2">
                Navigation
              </div>
              {sections.map(({ id, label }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-[#B91C3C]/10 text-[#D61F48]" 
                        : "text-[#CBD5E1] hover:bg-[#0F172A] hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-14 h-14 rounded-full bg-[#B91C3C] text-white flex items-center justify-center shadow-[0_4px_24px_rgba(185,28,60,0.4)] focus:outline-none hover:bg-[#D61F48] transition-colors"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </button>
      </div>
    </>
  );
}
