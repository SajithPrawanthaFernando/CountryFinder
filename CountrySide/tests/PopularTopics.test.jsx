import React from "react";
import { render, screen } from "@testing-library/react";
import { PopularTopics } from "../src/components/PopularTopics";
import "@testing-library/jest-dom";

// Mock topics data
jest.mock("../src/components/data/data", () => ({
  topics: [
    {
      country: "France",
      color: "text-blue-500",
      entries: [
        {
          title: "French Etiquette",
          description: "Learn how to greet, eat, and dress in France.",
        },
        {
          title: "Parisian Lifestyle",
          description: "A glimpse into life in the city of light.",
        },
      ],
    },
    {
      country: "Japan",
      color: "text-red-500",
      entries: [
        {
          title: "Japanese Traditions",
          description: "From tea ceremonies to festivals.",
        },
      ],
    },
  ],
}));

describe("PopularTopics", () => {
  test("renders main heading and subheading", () => {
    render(<PopularTopics />);
    expect(
      screen.getByRole("heading", { name: /popular topics/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/cultural insights, etiquette/i)
    ).toBeInTheDocument();
  });

  test("renders link to all countries", () => {
    render(<PopularTopics />);
    const link = screen.getByRole("link", { name: /see all countries/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/countries");
  });

  test("renders all topic countries and their entries", () => {
    render(<PopularTopics />);

    // France and Japan headings
    expect(screen.getByRole("heading", { name: "France" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Japan" })).toBeInTheDocument();

    // France entries
    expect(screen.getByText("French Etiquette")).toBeInTheDocument();
    expect(screen.getByText(/greet, eat, and dress/i)).toBeInTheDocument();
    expect(screen.getByText("Parisian Lifestyle")).toBeInTheDocument();

    // Japan entry
    expect(screen.getByText("Japanese Traditions")).toBeInTheDocument();
    expect(screen.getByText(/tea ceremonies/i)).toBeInTheDocument();

    // "More" links
    const moreLinks = screen.getAllByRole("link", { name: /more/i });
    expect(moreLinks.length).toBe(3);
    moreLinks.forEach((link) => expect(link).toHaveAttribute("href", "#"));
  });
});
