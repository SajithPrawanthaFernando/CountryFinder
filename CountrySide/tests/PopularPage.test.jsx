import React from "react";
import { render, screen } from "@testing-library/react";
import { PopularPage } from "../src/components/PopularPage";
import "@testing-library/jest-dom";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // Return a standard img for testing
    return <img {...props} />;
  },
}));

// Mock data
jest.mock("../src/components/data/data", () => ({
  popularCountries: [
    {
      name: "France",
      slug: "france",
      flag: "/flags/france.png",
      description: "A romantic getaway in Europe.",
    },
    {
      name: "Japan",
      slug: "japan",
      flag: "/flags/japan.png",
      description: "Blend of tradition and technology.",
    },
  ],
}));

describe("PopularPage", () => {
  test("renders main title and description", () => {
    render(<PopularPage />);
    expect(
      screen.getByRole("heading", { name: /explore popular countries/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/discover the most visited and loved countries/i)
    ).toBeInTheDocument();
  });

  test("renders all popular countries with images and descriptions", () => {
    render(<PopularPage />);

    // Titles
    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText("Japan")).toBeInTheDocument();

    // Descriptions
    expect(screen.getByText(/romantic getaway/i)).toBeInTheDocument();
    expect(screen.getByText(/tradition and technology/i)).toBeInTheDocument();

    // Images
    const franceImage = screen.getByAltText(/france flag/i);
    const japanImage = screen.getByAltText(/japan flag/i);

    expect(franceImage).toBeInTheDocument();
    expect(franceImage.getAttribute("src")).toContain("france.png");

    expect(japanImage).toBeInTheDocument();
    expect(japanImage.getAttribute("src")).toContain("japan.png");
  });

  test("renders link to see all countries", () => {
    render(<PopularPage />);
    expect(
      screen.getByRole("link", { name: /see all countries/i })
    ).toHaveAttribute("href", "/countries");
  });
});
