"use client";

import * as Toast from "@radix-ui/react-toast";
import React, { createContext, useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [variant, setVariant] = useState("success");

  const showToast = (title, description = "", variant = "success") => {
    setTitle(title);
    setDescription(description);
    setVariant(variant);
    setOpen(true);
  };

  const colorStyles =
    variant === "error"
      ? "border-l-4 border-red-500 text-red-500"
      : "border-l-4 border-green-500 text-[#A7FF41]";

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="right">
        {children}
        <Toast.Root
          open={open}
          duration={3000}
          onOpenChange={setOpen}
          className={`w-[360px] rounded-md bg-card border border-primary  p-4 shadow-xl fixed bottom-6 right-6 z-[9999] ${colorStyles}`}
        >
          <div className="flex items-start justify-between">
            <p className="font-semibold text-primary">{title}</p>
            <Toast.Close className="text-muted hover:text-primary text-lg pr-1 pt-1">
              <RxCross2 />
            </Toast.Close>
          </div>
          {description && (
            <p className="text-sm text-muted mt-1">{description}</p>
          )}
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 p-4 z-[9999]" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
