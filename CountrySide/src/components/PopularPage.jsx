"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { popularCountries } from "./data/data";

export const PopularPage = () => {
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
    <main
      id="popular"
      className="bg-background text-text font-lexend min-h-screen md:pb-20 pb-5 md:pt-20 pt-5"
      ref={sectionRef}
    >
      {/* Hero Title */}
      <h1 className="text-3xl md:text-5xl font-bold mb-2 text-primary fadeinup-item">
        Explore Popular Countries
      </h1>
      <p className="text-muted  max-w-2xl mb-10 fadeinup-item">
        Discover the most visited and loved countries around the world.
      </p>

      {/* Most Popular Countries */}
      <section className="mb-16">
        <div className="flex sm:flex-row flex-col sm:items-center  justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold fadeinup-item">
            Most Popular Countries
          </h2>
          <Link
            href="/countries"
            className="text-primary fadeinup-item flex mt-1 sm:mt-0  text-sm md:text-base font-medium hover:underline hover:text-accent transition"
          >
            See all countries <ChevronsRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fadeinup-item">
          {popularCountries.map((country) => (
            <Link
              key={country.name}
              href={`/country/${encodeURIComponent(country.slug)}`}
              className="relative group overflow-hidden fadeinup-item rounded-xl border hover:border-2 border-muted bg-card hover:border-primary transition"
            >
              {/* Country Flag */}
              <Image
                src={country.flag}
                alt={`${country.name} flag`}
                width={400}
                height={225}
                className="w-full h-[200px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Content on hover */}
              <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-primary text-xl font-bold mb-2">
                  {country.name}
                </h3>
                <p className="text-muted text-sm">{country.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};
