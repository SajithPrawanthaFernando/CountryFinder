"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "lucide-react";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card border-2 border-muted text-primary hover:bg-muted/10 hover:border-primary hover:text-white shadow transition duration-300"
      aria-label="Scroll to top"
    >
      <ArrowUpIcon className="w-5 h-5" />
    </button>
  );
};
