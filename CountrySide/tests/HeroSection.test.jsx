import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeroSection } from "../src/components/HeroSection";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  window.HTMLElement.prototype.scrollIntoView = () => {};
});

// Mock router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock countries
jest.mock("../src/components/data/data", () => ({
  countries: [
    { slug: "france", name: "France", flag: "/flags/fr.svg" },
    { slug: "japan", name: "Japan", flag: "/flags/jp.svg" },
  ],
}));

describe("HeroSection", () => {
  const push = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push });
  });

  test("renders headings and dropdown", () => {
    render(<HeroSection />);
    expect(screen.getByText(/culture/i)).toBeInTheDocument();
    expect(screen.getByText(/countries/i)).toBeInTheDocument();
    expect(screen.getByText(/travel/i)).toBeInTheDocument();
    expect(screen.getByText(/select country/i)).toBeInTheDocument();
  });

  test("renders all country options in dropdown", async () => {
    render(<HeroSection />);
    fireEvent.click(screen.getByRole("combobox", { name: /country/i }));

    expect(await screen.findByText("France")).toBeInTheDocument();
    expect(await screen.findByText("Japan")).toBeInTheDocument();
  });

  test("calls router.push with correct value on selection", async () => {
    render(<HeroSection />);
    fireEvent.click(screen.getByRole("combobox", { name: /country/i }));

    const franceOption = await screen.findByText("France");
    fireEvent.click(franceOption);

    expect(push).toHaveBeenCalledWith("/country/france");
  });
});
