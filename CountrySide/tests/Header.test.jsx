jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../src/components/common/Header";
import { AuthContextProvider } from "../src/context/AuthContext";
import { ToastProvider } from "../src/components/ToastProvider";

// Wrapper to render the component within context
const renderHeader = () =>
  render(
    <AuthContextProvider>
      <ToastProvider>
        <Header />
      </ToastProvider>
    </AuthContextProvider>
  );

describe("Header", () => {
  test("renders logo and nav buttons", () => {
    renderHeader();
    expect(screen.getByAltText(/countryfinder/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/popular/i)).toBeInTheDocument();
    expect(screen.getByText(/topics/i)).toBeInTheDocument();
    expect(screen.getByText(/learn by/i)).toBeInTheDocument();
    expect(screen.getByText(/related/i)).toBeInTheDocument();
  });

  test("shows login and signup buttons when user is not logged in", () => {
    renderHeader();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test("opens login modal on login button click", () => {
    renderHeader();
    fireEvent.click(screen.getByText(/login/i));
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument(); // From LoginModal
  });

  test("opens signup modal on sign up button click", () => {
    renderHeader();
    fireEvent.click(screen.getByText(/sign up/i));
    expect(screen.getByText(/create an account/i)).toBeInTheDocument(); // From SignupModal
  });
});
