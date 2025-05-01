"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { learnTopics } from "./data/data";

export const LearnByTopic = () => {
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
      className="bg-background text-text font-lexend md:pb-20 "
      id="learn"
      ref={sectionRef}
    >
      {/* Heading + CTA */}
      <div className="mb-10">
        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary fadeinup-item">
              Learn By topic
            </h2>
            <p className="text-muted   mt-2 max-w-xl fadeinup-item">
              Discover global topics from culture to geography.
            </p>
          </div>
          <Link
            href="/countries"
            className="text-primary  flex text-sm md:text-base font-medium hover:underline hover:text-accent transition fadeinup-item md:mt-0 mt-1"
          >
            See all topics <ChevronsRight />
          </Link>
        </div>
      </div>

      {/* Topic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {learnTopics.map((topic, i) => (
          <Link
            href={topic.href}
            key={i}
            className="relative group rounded-xl overflow-hidden shadow-md"
          >
            <Image
              src={topic.image}
              alt={topic.title}
              width={600}
              height={400}
              className="object-cover w-full h-[220px] group-hover:scale-105 transition-transform duration-300 fadeinup-item"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300" />
            <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold z-10 ">
              {topic.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};
