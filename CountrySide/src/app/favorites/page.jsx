"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAxios } from "../../lib/axiosInstance";

const FavoritesPage = () => {
  const { user } = useAuthContext();
  const axios = useAxios();
  const [favData, setFavData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavDetails = async () => {
      if (!user?.favCountries?.length) {
        setIsLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          user.favCountries.map(async (name) => {
            try {
              const res = await fetch(
                `https://restcountries.com/v3.1/name/${encodeURIComponent(
                  name
                )}?fullText=true`
              );
              const json = await res.json();
              return Array.isArray(json) ? json[0] : json;
            } catch (err) {
              console.error("Error fetching:", name, err);
              return null;
            }
          })
        );

        setFavData(results.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch favorite countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavDetails();
  }, [user]);

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
      className="pt-24 pb-20 px-6 md:px-40 bg-background text-text font-lexend min-h-screen"
      ref={sectionRef}
    >
      <h1 className="text-4xl font-bold mb-2 text-primary fadeinup-item">
        Your Favorites
      </h1>
      <p className="text-muted mb-8 fadeinup-item">
        Countries you've saved to explore later.
      </p>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[200px] bg-muted/20 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : favData.length === 0 ? (
        <p className="text-muted mt-10">
          You haven’t favorited any countries yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {favData.map((country, index) => (
            <Link
              href={`/country/${encodeURIComponent(country.name.common)}`}
              key={index}
              className="relative  group overflow-hidden rounded-xl border bg-card border-muted hover:border-primary transition shadow-sm"
            >
              <Image
                src={country.flags?.png || ""}
                alt={country.name?.common}
                width={400}
                height={225}
                className="w-full h-[200px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-xl font-bold text-primary mb-1">
                  {country.name?.common || "Unknown Country"}
                </h3>
                <p className="text-muted text-sm">
                  {country.region} • Capital: {country.capital?.[0] || "N/A"}
                  <br />
                  Population: {country.population?.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default FavoritesPage;
