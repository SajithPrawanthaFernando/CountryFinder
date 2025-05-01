"use client";

import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { Carousel } from "./ui/carousel";
import { useEffect, useRef } from "react";
import { slideData } from "./data/data";

export function CarouselContainer() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".fadeinup-item");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden w-full h-full md:pt-20 md:pb-20 pt-20 pb-16  bg-background text-text font-lexend"
      id="related"
      ref={sectionRef}
    >
      {/* Subheading + See All */}
      <div className="flex md:flex-row flex-col md:items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary fadeinup-item">
            Related Topics
          </h2>
          <p className="text-muted text-sm md:text-base mt-2 max-w-xl fadeinup-item">
            Discover more exciting global experiences.
          </p>
        </div>
        <Link
          href="/topics"
          className="text-primary flex items-center gap-1 fadeinup-item text-sm md:text-base font-medium hover:underline hover:text-accent transition md:mt-0 mt-1"
        >
          See all topics <ChevronsRight size={20} />
        </Link>
      </div>

      {/* Carousel */}
      <Carousel slides={slideData} />
    </div>
  );
}
