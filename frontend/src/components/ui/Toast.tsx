"use client";

import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
  type?: "success" | "error";
}

export default function Toast({ show, message, onClose, type = "success" }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all ${type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
      {type === "success" ? (
        <CheckCircleIcon className="w-6 h-6 text-green-600" />
      ) : (
        <XMarkIcon className="w-6 h-6 text-red-600" />
      )}
      <span className={`text-sm font-medium ${type === "success" ? "text-green-800" : "text-red-800"}`}>{message}</span>
      <button onClick={onClose} className="ml-2 p-1 rounded hover:bg-gray-100">
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
} 