"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  GlobeIcon,
  LayersIcon,
  ClockIcon,
  UsersIcon,
  MapPinIcon,
  DollarSignIcon,
  LanguagesIcon,
  LinkIcon,
  BookOpenIcon,
  ChevronsLeftIcon,
  HeartIcon,
} from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useAxios } from "../../../lib/axiosInstance";
import { useToast } from "../../../components/ToastProvider";
import { StatCard } from "../../../components/StatCard";
import { Skeleton } from "../../../components/Skeleton";

const CountryDetailsPage = () => {
  const { name } = useParams();
  const { user, dispatch } = useAuthContext();
  const axios = useAxios();

  const [country, setCountry] = useState(null);
  const [neighbors, setNeighbors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        const data = await res.json();
        setCountry(data[0]);

        if (data[0]?.borders?.length) {
          const borderRes = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(
              ","
            )}`
          );
          const borderData = await borderRes.json();
          setNeighbors(borderData.map((c) => c.name.common));
        }

        if (user?.favCountries?.includes(data[0].name.common)) {
          setIsLiked(true);
        }
      } catch (err) {
        console.error("Error fetching country:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, [name, user]);

  const toggleLike = async () => {
    if (!user) {
      router.push("/");
      showToast("Error", "Please log into the system", "error");
      return;
    }

    try {
      const endpoint = isLiked
        ? `/users/${user.email}/unfav`
        : `/users/${user.email}/fav`;
      await axios.put(endpoint, { country: country.name.common });

      setIsLiked(!isLiked);
      dispatch({
        type: "LOGIN",
        payload: {
          ...user,
          favCountries: isLiked
            ? user.favCountries.filter((c) => c !== country.name.common)
            : [...(user.favCountries || []), country.name.common],
        },
      });

      showToast(
        isLiked ? "Removed from favorites" : "Added to favorites",
        country.name.common
      );
    } catch (err) {
      console.error("Failed to update favorites", err);
      showToast("Failed to update", "Something went wrong", "error");
    }
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (!country) {
    return <p className="p-10 text-red-500">Country not found.</p>;
  }

  const statCards = [
    {
      icon: UsersIcon,
      label: "Population",
      value: country.population?.toLocaleString(),
    },
    {
      icon: LayersIcon,
      label: "Area",
      value: `${country.area?.toLocaleString()} km²`,
    },
    {
      icon: ClockIcon,
      label: "Timezones",
      value: country.timezones?.join(", "),
    },
    {
      icon: GlobeIcon,
      label: "Region",
      value: `${country.region}${
        country.subregion ? " / " + country.subregion : ""
      }`,
    },
    {
      icon: MapPinIcon,
      label: "Capital",
      value: country.capital?.[0] || "N/A",
    },
    {
      icon: DollarSignIcon,
      label: "Currency",
      value: country.currencies
        ? Object.values(country.currencies)
            .map((c) => c.name)
            .join(", ")
        : "N/A",
    },
    {
      icon: LanguagesIcon,
      label: "Languages",
      value: country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A",
    },
    {
      icon: BookOpenIcon,
      label: "Alt Spellings",
      value: country.altSpellings?.join(", "),
    },
    {
      icon: LinkIcon,
      label: "Top-Level Domain",
      value: country.tld?.join(", "),
    },
  ];

  return (
    <main className="pt-24 pb-10 px-6 md:px-40 text-text font-lexend bg-background min-h-screen">
      <div className="mb-6 ">
        <Link
          href="/countries"
          className="flex items-center text-muted text-sm hover:text-primary transition duration-300 "
        >
          <ChevronsLeftIcon className="mr-1 size-5 " /> Back to all countries
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-6 ">
        <h1 className="text-4xl font-bold text-primary ">
          {country.name?.common}
        </h1>
        <button onClick={toggleLike} className="mt-1">
          {isLiked ? (
            <FaHeart className="text-primary w-6 h-6" />
          ) : (
            <HeartIcon className="text-muted hover:text-primary w-6 h-6" />
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-10 mb-10">
        <div>
          <Image
            src={country.flags?.png || ""}
            alt={country.name?.common || ""}
            width={400}
            height={300}
            className="rounded-xl border border-muted object-cover shadow md:w-[400px] w-full h-[300px]"
          />
          {neighbors.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-primary mb-3">
                Neighbouring Countries
              </h2>
              <div className="flex gap-3">
                {neighbors.slice(0, 3).map((name, i) => (
                  <Link
                    key={i}
                    href={`/country/${encodeURIComponent(name)}`}
                    className="bg-card border border-muted px-4 py-2 rounded-md text-sm text-muted hover:text-white hover:border-primary transition"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {statCards.map((card, i) => (
            <StatCard
              key={i}
              icon={card.icon}
              label={card.label}
              value={card.value}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CountryDetailsPage;
