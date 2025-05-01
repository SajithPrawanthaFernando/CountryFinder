"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../../../public/images/countrylogo.png";
import { SignupModal } from "../modals/SignupModal";
import { LoginModal } from "../modals/LoginModal";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAxios } from "../../lib/axiosInstance";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, LogOutIcon } from "lucide-react";
import { useToast } from "../ToastProvider";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, dispatch } = useAuthContext();
  const axios = useAxios();
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= lastScrollY || window.scrollY < 10);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
      showToast(
        "Logged out",
        "You have been successfully logged out",
        "success"
      );
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      showToast("Error", "Logout failed", "error");
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 font-lexend ${
        isVisible
          ? "bg-background text-text shadow-md"
          : "opacity-0 -translate-y-full"
      }`}
    >
      {/* Logo */}
      <Link href={"/"}>
        <div className="w-[120px] h-auto flex items-center justify-center">
          <Image src={logo} alt="CountryFinder" />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6 text-muted font-medium text-sm">
        <button
          onClick={() =>
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="hover:text-primary transition"
        >
          Home
        </button>
        <button
          onClick={() =>
            document
              .getElementById("popular")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="hover:text-primary transition"
        >
          Popular
        </button>
        <button
          onClick={() =>
            document
              .getElementById("topics")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="hover:text-primary transition"
        >
          Topics
        </button>
        <button
          onClick={() =>
            document
              .getElementById("learn")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="hover:text-primary transition"
        >
          Learn By
        </button>
        <button
          onClick={() =>
            document
              .getElementById("related")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="hover:text-primary transition"
        >
          Related
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end md:hidden">
          <div className="bg-card w-64 h-full p-6 space-y-6 text-muted font-medium shadow-lg relative">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-primary"
              aria-label="Close menu"
            >
              ✕
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" });
                setMobileOpen(false);
              }}
              className="block w-full text-left hover:text-primary"
            >
              Home
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("popular")
                  ?.scrollIntoView({ behavior: "smooth" });
                setMobileOpen(false);
              }}
              className="block w-full text-left hover:text-primary"
            >
              Popular
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("topics")
                  ?.scrollIntoView({ behavior: "smooth" });
                setMobileOpen(false);
              }}
              className="block w-full text-left hover:text-primary"
            >
              Topics
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("learn")
                  ?.scrollIntoView({ behavior: "smooth" });
                setMobileOpen(false);
              }}
              className="block w-full text-left hover:text-primary"
            >
              Learn By
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("related")
                  ?.scrollIntoView({ behavior: "smooth" });
                setMobileOpen(false);
              }}
              className="block w-full text-left hover:text-primary"
            >
              Related
            </button>
          </div>
        </div>
      )}

      {/* Right Side */}
      <div className="flex gap-3 items-center">
        {!user ? (
          <>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="bg-primary text-black px-4 py-2 rounded-lg text-sm hover:bg-accent transition-all duration-200"
            >
              Login
            </button>
            <button
              onClick={() => setIsSignupOpen(true)}
              className="bg-card text-muted px-4 py-2 border border-muted rounded-lg text-sm hover:text-text hover:border-primary transition-all duration-200"
            >
              Sign Up
            </button>
          </>
        ) : (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-2 focus:outline-none">
                <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                  <Avatar.Image
                    src={
                      user?.filename
                        ? `http://localhost:5000/uploads/${user.filename}`
                        : "/images/user.jpg"
                    }
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                  <Avatar.Fallback className="bg-muted text-background flex items-center justify-center w-full h-full text-sm">
                    {user.username?.charAt(0).toUpperCase() || "U"}
                  </Avatar.Fallback>
                </Avatar.Root>
                <ChevronDownIcon className="text-muted w-4 h-4" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              className="z-50 mt-2 px-3 py-4 bg-background border border-muted rounded-md shadow-md w-64"
              sideOffset={10}
              align="end"
            >
              <div className="text-xs font-semibold text-primary px-2 mb-2">
                Favorite Countries
              </div>
              {user.favCountries?.length > 0 ? (
                <>
                  {user.favCountries.slice(0, 5).map((name, i) => (
                    <DropdownMenu.Item key={i} asChild>
                      <Link
                        href={`/country/${encodeURIComponent(name)}`}
                        className="flex items-center gap-2 px-2 py-2 text-sm text-muted hover:text-white hover:bg-muted/10 rounded-md"
                      >
                        <Image
                          src={`https://flagcdn.com/w40/${name
                            .toLowerCase()
                            .slice(0, 2)}.png`}
                          alt={name}
                          width={24}
                          height={16}
                          className="rounded-sm border"
                        />
                        {name}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                  {user.favCountries.length > 5 && (
                    <DropdownMenu.Item asChild>
                      <Link
                        href="/favorites"
                        className="px-2 py-1 text-xs text-blue-400 hover:text-blue-600"
                      >
                        See all favorites →
                      </Link>
                    </DropdownMenu.Item>
                  )}
                </>
              ) : (
                <p className="text-xs text-muted px-2 py-2">
                  No favorites yet.
                </p>
              )}

              <DropdownMenu.Separator className="h-px bg-muted my-2" />
              <DropdownMenu.Item
                onClick={handleLogout}
                className="flex items-center gap-2 px-2 py-2 text-sm text-muted hover:text-red-500 cursor-pointer"
              >
                <LogOutIcon className="w-4 h-4" />
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}

        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden flex justify-end items-end text-muted focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Modals */}
      {isSignupOpen && (
        <SignupModal
          isOpen={isSignupOpen}
          onClose={() => setIsSignupOpen(false)}
        />
      )}
      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </header>
  );
};
