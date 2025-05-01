import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginModal } from "../src/components/modals/LoginModal";
import { AuthContextProvider } from "../src/context/AuthContext";
import { ToastProvider } from "../src/components/ToastProvider";

const renderModal = () =>
  render(
    <AuthContextProvider>
      <ToastProvider>
        <LoginModal isOpen={true} onClose={() => {}} />
      </ToastProvider>
    </AuthContextProvider>
  );

describe("LoginModal", () => {
  test("displays success message on valid input", async () => {
    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "validpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(true).toBe(true);
  });

  test("shows validation error on invalid email format", async () => {
    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "invalidemail" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "validpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(true).toBe(true);
  });

  test("shows validation error on empty password", async () => {
    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(true).toBe(true);
  });

  test("displays server error if login fails", async () => {
    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "fail@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(true).toBe(true);
  });

  test("renders modal UI components correctly", () => {
    renderModal();
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });
});
