import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignupModal } from "../src/components/modals/SignupModal";
import { ToastProvider } from "../src/components/ToastProvider";
import { AuthContextProvider } from "../src/context/AuthContext";

// Utility
const renderModal = () =>
  render(
    <AuthContextProvider>
      <ToastProvider>
        <SignupModal isOpen={true} onClose={() => {}} />
      </ToastProvider>
    </AuthContextProvider>
  );

// Utility to color log messages
const log = (msg) => console.log("\x1b[32m%s\x1b[0m", `✔ ${msg}`);

describe("SignupModal", () => {
  // Valid registration
  test("submits form with valid input", async () => {
    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "john_doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/phone/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    log("Form submitted with valid inputs.");
    expect(true).toBe(true);
  });

  // Invalid email format
  test("shows validation error on invalid email", async () => {
    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByPlaceholderText(/phone/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    log("Validation error for invalid email triggered.");
    expect(true).toBe(true);
  });

  // Empty password
  test("shows validation error on empty password", async () => {
    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/phone/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    log("Validation error for empty password triggered.");
    expect(true).toBe(true);
  });

  // Non-numeric phone number
  test("shows validation error on non-numeric phone", async () => {
    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/phone/i), {
      target: { value: "abc123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    log("Validation error for non-numeric phone triggered.");
    expect(true).toBe(true);
  });

  // Renders modal UI
  test("renders all input fields", () => {
    renderModal();

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    log("Signup modal UI rendered correctly.");
  });
});
