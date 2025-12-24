"use client";

import { cn } from "@/lib/misc";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "About", href: "/#about" },
  { name: "AI Expertise", href: "/#ai-expertise" },
  { name: "Projects", href: "/#projects" },
  { name: "Skills", href: "/#skills" },
  { name: "Journal", href: "/blogs", isExternal: true },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrollingProgrammatically = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (isScrollingProgrammatically.current) return;

      const sectionsData = navItems
        .filter(item => !item.isExternal)
        .map((item) => {
          const id = item.href.split("#")[1];
          const element = document.getElementById(id);
          if (!element) return { id, position: 0, height: 0 };

          const rect = element.getBoundingClientRect();
          return {
            id,
            position: rect.top,
            height: rect.height
          };
        });

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

  const scrollToSection = (item: typeof navItems[0]) => {
    if (item.isExternal) {
      setMobileMenuOpen(false);
      return;
    }

    const id = item.href.split("#")[1];
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      isScrollingProgrammatically.current = true;

      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 1000);

      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500 py-6 flex justify-center",
      scrolled ? "bg-white/80 backdrop-blur-2xl border-b border-gray-100 py-4" : "bg-transparent"
    )}>
      <div className="flex justify-between items-center max-w-7xl w-full px-6 md:px-12">
        <div className="flex items-center">
          <Link href="/" className="font-black text-2xl tracking-tighter hover:scale-105 transition-transform">
            MJ<span className="text-primary">.</span>
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center space-x-10">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.isExternal ? (
                  <Link
                    href={item.href}
                    className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(item)}
                    className={cn(
                      "cursor-pointer text-xs font-black uppercase tracking-widest transition-all relative group",
                      activeSection === item.href.split("#")[1]
                        ? "text-primary"
                        : "text-gray-500 hover:text-primary"
                    )}
                  >
                    {item.name}
                    <span className={cn(
                      "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300",
                      activeSection === item.href.split("#")[1] ? "w-full" : "w-0 group-hover:w-full"
                    )}></span>
                  </button>
                )}
              </li>
            ))}
          </ul>
          
          <Link href="mailto:carnaje.michaeljames@gmail.com">
            <Button size="sm" className="rounded-none bg-gray-900 text-white font-bold uppercase tracking-widest px-6 h-10 hover:bg-primary transition-colors">
              Hire Me
            </Button>
          </Link>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-red-50 lg:hidden p-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.isExternal ? (
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full py-2 text-base font-semibold text-muted-foreground hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(item)}
                    className={cn(
                      "flex w-full py-2 text-base font-semibold transition-colors",
                      activeSection === item.href.split("#")[1] ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
