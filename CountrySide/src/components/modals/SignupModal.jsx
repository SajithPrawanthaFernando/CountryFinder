"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaImage } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useAxios } from "../../lib/axiosInstance";
import { useToast } from "../ToastProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be numeric")
    .required("Phone number is required"),
  password: yup.string().min(6).required("Password is required"),
});

export const SignupModal = ({ isOpen, onClose }) => {
  const axios = useAxios();
  const { showToast } = useToast();
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
      const isAdmin = data.email.toLowerCase().startsWith("admin");
      const body = {
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: isAdmin ? "admin" : "user",
      };

      const res = await axios.post("/register", body);
      showToast("Account Created", "Registration successful!", "success");

      reset();
      onClose(false);
    } catch (error) {
      console.error("Registration failed:", error);
      showToast("Error", "Registration failed!", "error");
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-card p-8 rounded-lg shadow-lg focus:outline-none z-50">
          {/* Header with Logo */}
          <div className="flex flex-col items-left mb-6">
            <Dialog.Title className="text-2xl font-bold mt-2 text-primary">
              Create an Account
            </Dialog.Title>
            <p className="text-muted text-sm mt-1">
              Start your journey with us.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-muted"
          >
            {/* Username */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <FaUser />
                <input
                  {...register("username")}
                  placeholder="Username"
                  className="flex-1 bg-background border border-muted px-3 py-2 rounded-md focus:border-primary focus:outline-none"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs ml-7">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
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
                <p className="text-red-500 text-xs ml-7">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <FaPhone />
                <input
                  {...register("phone")}
                  placeholder="Phone Number"
                  className="flex-1 bg-background border border-muted px-3 py-2 rounded-md focus:border-primary focus:outline-none"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs ml-7">
                  {errors.phone.message}
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

            <button
              type="submit"
              className="w-full py-2 bg-primary text-black font-semibold rounded-md hover:bg-accent transition"
            >
              Register
            </button>
          </form>

          {/* Already have an account */}
          <div className="mt-4 text-sm text-center text-muted">
            Already have an account?{" "}
            <button
              onClick={() => {
                onClose(false);
              }}
              className="text-primary hover:underline font-medium"
            >
              Login here
            </button>
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
