// __tests__/StatCard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { StatCard } from "../src/components/StatCard";
import { UsersIcon } from "lucide-react";

describe("StatCard", () => {
  test("renders label and value correctly", () => {
    render(<StatCard icon={UsersIcon} label="Population" value="100,000" />);
    expect(screen.getByText("Population")).toBeInTheDocument();
    expect(screen.getByText("100,000")).toBeInTheDocument();
  });
});
