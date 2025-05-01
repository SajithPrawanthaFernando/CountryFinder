"use client";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { topics } from "./data/data";

export const PopularTopics = () => {
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
    <section
      className="bg-background text-text font-lexend md:pb-20 pb-12"
      id="topics"
      ref={sectionRef}
    >
      {/* Heading */}
      <div className="flex md:flex-row flex-col  md:items-center justify-between md:mb-12 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-2 fadeinup-item">
            Popular Topics
          </h1>
          <p className="text-muted  max-w-xl  fadeinup-item">
            Explore cultural insights, etiquette, and lifestyle topics across
            countries.
          </p>
        </div>
        <Link
          href="/countries"
          className="text-primary flex text-sm md:text-base font-medium hover:underline hover:text-accent transition fadeinup-item mt-1 md:mt-0"
        >
          See all countries <ChevronsRight />
        </Link>
      </div>

      {/* Topic Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12 gap-6">
        {topics.map((topic) => (
          <div key={topic.country}>
            <h2
              className={`text-2xl font-extrabold mb-4 border-b-4 pb-1 ${topic.color} fadeinup-item`}
            >
              {topic.country}
            </h2>
            {topic.entries.map((entry, index) => (
              <div key={index} className="mb-6">
                <h3
                  className={`text-lg font-semibold mb-1 ${topic.color} fadeinup-item`}
                >
                  {entry.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-2 fadeinup-item">
                  {entry.description}
                </p>
                <Link
                  href="#"
                  className={`text-sm font-medium flex items-center gap-1 hover:underline ${topic.color} fadeinup-item`}
                >
                  More <ChevronsRight size={20} className="mt-[2px]" />
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
