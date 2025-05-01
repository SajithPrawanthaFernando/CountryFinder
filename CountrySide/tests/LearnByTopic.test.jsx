import React from "react";
import { render, screen } from "@testing-library/react";
import { LearnByTopic } from "../src/components/LearnByTopic";
import { learnTopics } from "../src/components/data/data";
import "@testing-library/jest-dom";
import Link from "next/link";

// Mock IntersectionObserver
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("LearnByTopic", () => {
  test("renders heading and description", () => {
    render(<LearnByTopic />);
    expect(screen.getByText(/learn by topic/i)).toBeInTheDocument();
    expect(
      screen.getByText(/discover global topics from culture to geography/i)
    ).toBeInTheDocument();
  });

  test("renders CTA link to all topics", () => {
    render(<LearnByTopic />);
    const cta = screen.getByText(/see all topics/i);
    expect(cta).toBeInTheDocument();
    expect(cta.closest("a")).toHaveAttribute("href", "/countries");
  });

  test("renders all learn topics with images and titles", () => {
    render(<LearnByTopic />);
    learnTopics.forEach((topic) => {
      expect(screen.getByText(topic.title)).toBeInTheDocument();
      const image = screen.getByAltText(topic.title);
      expect(image).toBeInTheDocument();

      const src = image.getAttribute("src");
      expect(src).toContain(encodeURIComponent(topic.image));
    });
  });
});
