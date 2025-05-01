"use client";

import Image from "next/image";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { countries } from "./data/data";

export const HeroSection = () => {
  const sectionRef = useRef(null);
  const router = useRouter();

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

  const handleCountrySelect = (value) => {
    if (value) router.push(`/country/${encodeURIComponent(value)}`);
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[60vh] bg-background pt-[60px] md:pb-20  text-text overflow-hidden font-lexend"
      ref={sectionRef}
    >
      {/* Right-side image */}
      <div className="absolute top-[20] right-0 fadeinup-item">
        <Image
          src="/images/map.png"
          alt="World Map"
          priority
          width={2000}
          height={2000}
          className="md:w-[750px] md:h-[550px]"
        />
      </div>

      {/* Left content */}
      <div className="relative z-10 flex gap-4 flex-col justify-center items-start h-full px-6 md:px-20 py-20">
        <h1 className="text-4xl fadeinup-item md:text-7xl font-bold text-primary leading-tight">
          Culture <br />
        </h1>
        <h1 className="text-4xl fadeinup-item md:text-7xl font-bold text-primary leading-tight ml-[70px]">
          Countries <br />
        </h1>
        <h1 className="text-4xl fadeinup-item md:text-7xl font-bold text-primary leading-tight ml-12">
          Travel
        </h1>

        {/* Radix UI Select */}
        <div className="mt-6 ml-2 fadeinup-item">
          <Select.Root onValueChange={handleCountrySelect}>
            <Select.Trigger
              className="inline-flex items-center justify-between bg-card text-muted border border-muted px-4 py-2 rounded-md hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition w-[240px]"
              aria-label="Country"
            >
              <Select.Value placeholder="Select Country" />
              <Select.Icon className="ml-2 text-muted">
                <ChevronDown size={16} />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                sideOffset={5}
                position="popper"
                className="bg-card border border-muted rounded-md shadow-md z-[100] w-[240px]"
              >
                <Select.Viewport className="p-2">
                  {countries.map((country) => (
                    <Select.Item
                      key={country.slug}
                      value={country.slug}
                      className="flex items-center gap-3 cursor-pointer px-4 py-2 text-sm text-muted rounded hover:bg-primary hover:text-black transition"
                    >
                      <Image
                        src={country.flag}
                        alt={`${country.name} flag`}
                        width={20}
                        height={14}
                        className="rounded-sm"
                      />
                      <Select.ItemText>{country.name}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
    </section>
  );
};
