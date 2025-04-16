"use client";

import { cn } from "@/lib/misc";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "AI Expertise", href: "#ai-expertise" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrollingProgrammatically = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Skip section detection if we're programmatically scrolling
      if (isScrollingProgrammatically.current) return;

      // Find the current section
      const sectionsData = navItems.map((item) => {
        const element = document.getElementById(item.href.substring(1));
        if (!element) return { id: item.href.substring(1), position: 0, height: 0 };

        const rect = element.getBoundingClientRect();
        return {
          id: item.href.substring(1),
          position: rect.top,
          height: rect.height
        };
      });

      // Enhanced detection logic
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const pageHeight = document.body.scrollHeight;

      // Special case for bottom of page (blog section)
      if (scrollPosition + viewportHeight >= pageHeight - 100) {
        // User is at bottom of page, set last section as active
        setActiveSection('blog');
        return;
      }

      // For other sections, find the one most in view
      const currentSection = sectionsData
        .filter(section => section.position <= 150)
        .sort((a, b) => b.position - a.position)[0];

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    // Use throttled scroll event to improve performance
    let scrollThrottleTimeout: NodeJS.Timeout | undefined;
    const throttledScrollHandler = () => {
      if (!scrollThrottleTimeout) {
        scrollThrottleTimeout = setTimeout(() => {
          handleScroll();
          scrollThrottleTimeout = undefined;
        }, 100);
      }
    };

    window.addEventListener("scroll", throttledScrollHandler);
    // Trigger once on mount to set initial active section
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      if (scrollThrottleTimeout) clearTimeout(scrollThrottleTimeout);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      // Set active section immediately on click
      setActiveSection(href.substring(1));

      // Prevent scroll handler from changing active section during programmatic scroll
      isScrollingProgrammatically.current = true;

      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Reset the flag after animation completes (roughly 1s)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 1000);

      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300 py-4 sm:px-8 flex justify-center",
      scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="flex justify-between items-center max-w-6xl w-full px-4 sm:px-0">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl">MJ Carnaje</Link>
        </div>
        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "cursor-pointer text-sm font-medium hover:text-gray-900 transition-colors relative",
                  activeSection === item.href.substring(1)
                    ? "text-gray-900 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gray-900"
                    : "text-gray-600"
                )}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
          <ul className="flex flex-col px-4 py-2">
            {navItems.map((item) => (
              <li key={item.name} className="py-2">
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "cursor-pointer text-sm font-medium hover:text-gray-900 transition-colors w-full text-left",
                    activeSection === item.href.substring(1) ? "text-gray-900 font-bold" : "text-gray-600"
                  )}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
