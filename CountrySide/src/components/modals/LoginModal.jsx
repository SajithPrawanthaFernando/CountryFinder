"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAxios } from "../../lib/axiosInstance";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useToast } from "../ToastProvider";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

export const LoginModal = ({ isOpen, onClose }) => {
  const axios = useAxios();
  const { dispatch } = useAuthContext();
  const { showToast } = useToast();
  const [serverError, setServerError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setServerError(null);
      const res = await axios.post("/login", {
        email: data.email,
        password: data.password,
      });

      dispatch({ type: "LOGIN", payload: res.data });
      showToast(
        "Login Successful",
        `Welcome back, ${res.data.email}`,
        "success"
      );

      reset();
      onClose(false);
    } catch (error) {
      console.error("Login error:", error);
      setServerError(
        error?.response?.data?.message || "Login failed. Try again."
      );
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-card p-8 rounded-lg shadow-lg focus:outline-none z-50">
          <div className="flex flex-col items-left mb-6">
            <Dialog.Title className="text-2xl font-bold mt-2 text-primary">
              Welcome Back
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Please enter your email and password to log in.
            </Dialog.Description>
            <p className="text-muted text-sm mt-1">Login to your account</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-muted"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <FaEnvelope />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-background border border-muted px-3 py-2 rounded-md focus:border-primary focus:outline-none"
                />
              </div>
              {errors.email && (
                <p
                  data-testid="email-error"
                  className="text-red-500 text-xs ml-7"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 relative">
                <FaLock />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="flex-1 bg-background border border-muted px-3 py-2 rounded-md focus:border-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 text-muted hover:text-primary"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs ml-7">
                  {errors.password.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="text-red-500 text-xs">{serverError}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-primary text-black font-semibold rounded-md hover:bg-accent transition "
            >
              Login
            </button>
          </form>

          <div className="mt-4 flex justify-between text-xs text-muted">
            <Link href="/forgot-password" className="hover:underline text-sm">
              Forgot password?
            </Link>
            <span>
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  onClose(false);
                }}
                className="text-primary hover:underline font-medium"
              >
                Sign Up
              </button>
            </span>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-muted hover:text-primary transition"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
