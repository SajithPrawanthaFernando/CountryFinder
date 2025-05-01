import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { ToastProvider, useToast } from "../src/components/ToastProvider";

// Test component that uses the hook
const TestComponent = () => {
  const { showToast } = useToast();

  return (
    <div>
      <button onClick={() => showToast("Success", "This is a success")}>
        Show Success Toast
      </button>
      <button onClick={() => showToast("Error", "This is an error", "error")}>
        Show Error Toast
      </button>
    </div>
  );
};

const renderWithToast = () =>
  render(
    <ToastProvider>
      <TestComponent />
    </ToastProvider>
  );

describe("ToastProvider", () => {
  test("renders without crashing", () => {
    renderWithToast();
    expect(screen.getByText("Show Success Toast")).toBeInTheDocument();
    expect(screen.getByText("Show Error Toast")).toBeInTheDocument();
  });

  test("displays success toast with title and description", async () => {
    renderWithToast();

    fireEvent.click(screen.getByText("Show Success Toast"));

    expect(await screen.findByText("Success")).toBeInTheDocument();
    expect(screen.getByText("This is a success")).toBeInTheDocument();
  });

  test("displays error toast with red styles", async () => {
    renderWithToast();

    fireEvent.click(screen.getByText("Show Error Toast"));

    expect(await screen.findByText("Error")).toBeInTheDocument();
    expect(screen.getByText("This is an error")).toBeInTheDocument();

    const toast = screen.getByText("Error").closest("div");
    expect(toast).toHaveClass("flex items-start justify-between");
  });
});
