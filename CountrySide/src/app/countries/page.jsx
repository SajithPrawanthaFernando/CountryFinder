"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as Select from "@radix-ui/react-select";
import * as Input from "@radix-ui/react-slot";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { IoFilter } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

const ITEMS_PER_PAGE = 12;

const AllCountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [filterType, setFilterType] = useState("name");
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population"
      );
      const data = await res.json();
      setCountries(data);
      setFiltered(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setIsLoading(false);
  };

  const handleSearch = async () => {
    if (!query) return setFiltered(countries);

    setIsLoading(true);
    try {
      let endpoint = "";

      switch (filterType) {
        case "name":
        case "capital":
        case "region":
        case "subregion":
        case "currency":
        case "lang":
        case "translation":
          endpoint = `https://restcountries.com/v3.1/${filterType}/${query}`;
          break;
        case "code":
          endpoint = `https://restcountries.com/v3.1/alpha/${query}`;
          break;
        case "codes":
          endpoint = `https://restcountries.com/v3.1/alpha?codes=${query}`;
          break;
        case "fullText":
          endpoint = `https://restcountries.com/v3.1/name/${query}?fullText=true`;
          break;
        default:
          endpoint = `https://restcountries.com/v3.1/name/${query}`;
      }

      const res = await fetch(endpoint);

      if (!res.ok) {
        console.warn("Invalid filter or query");
        setFiltered([]);
      } else {
        const data = await res.json();
        setFiltered(Array.isArray(data) ? data : [data]);
      }

      setPage(1);
    } catch (err) {
      console.error("Search error:", err);
      setFiltered([]);
    }
    setIsLoading(false);
  };

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

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
      className="bg-background text-text font-lexend min-h-screen pt-24 pb-20 px-6 md:px-40"
      ref={sectionRef}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary fadeinup-item">
        All Countries
      </h1>
      <p className="text-muted mb-8 max-w-2xl fadeinup-item">
        Discover countries across the globe with key highlights and facts.
      </p>
      <div className="flex items-center gap-2 text-muted text-[16px] font-medium mb-2 fadeinup-item">
        <span>Filter by</span>
        <IoFilter fill="#A7FF41" className="w-5 h-5 text-primary" />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center ">
        <Select.Root onValueChange={setFilterType} value={filterType}>
          <Select.Trigger className="inline-flex items-center focus:outline-none focus:border-primary justify-between rounded-md border border-muted bg-card px-4 py-2 text-muted w-full sm:w-1/5">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="popper"
              sideOffset={5}
              className="z-50 w-[244px] bg-card border border-muted rounded-md shadow-lg"
            >
              <Select.ScrollUpButton>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-2">
                {[
                  "name",
                  "fullText",
                  "code",
                  "codes",
                  "capital",
                  "region",
                  "subregion",
                  "lang",
                  "currency",
                  "translation",
                ].map((option) => (
                  <Select.Item
                    key={option}
                    value={option}
                    className="px-4 py-2 text-sm text-muted rounded-md hover:bg-primary hover:text-black cursor-pointer "
                  >
                    <Select.ItemText>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton>
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        <div className="relative w-full sm:w-1/3 fadeinup-item">
          <CiSearch
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"
          />
          <Input.Slot className="w-full">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-muted bg-card rounded-md focus:outline-none focus:border-primary"
            />
          </Input.Slot>
        </div>

        <button
          onClick={handleSearch}
          className="bg-primary text-black px-4 py-2 rounded-md hover:bg-accent transition fadeinup-item"
        >
          Search
        </button>
        <button
          onClick={() => {
            setQuery("");
            setFilterType("name");
            setFiltered(countries);
            setPage(1);
          }}
          className="px-4 py-2 text-muted fadeinup-item hover:text-white transition duration-300 bg-card border border-muted rounded-md hover:border-primary disabled:opacity-50"
        >
          Reset
        </button>
      </div>

      {/* Countries Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div
              key={i}
              className="h-[200px] bg-muted/20 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="flex justify-center items-center text-muted mt-[160px]">
          No countries found for this filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((country, i) => (
            <Link
              key={i}
              href={`/country/${encodeURIComponent(country.name.common)}`}
              className="relative group overflow-hidden rounded-xl border  bg-card border-muted hover:border-primary transition shadow-sm"
            >
              <Image
                src={country.flags?.png || ""}
                alt={country.name?.common}
                width={400}
                height={225}
                className="w-full h-[200px] object-cover   transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-xl font-bold text-primary mb-1">
                  {country.name?.common}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-4 ">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-card border border-muted rounded-md hover:border-primary disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-muted">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-card border border-muted rounded-md hover:border-primary disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default AllCountriesPage;
