"use client";
import React, { useState } from "react";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void> | void; // allow async confirm
};

export default function ConfirmModal({ open, onCancel, onConfirm }: Props) {
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleConfirm = async () => {
    try {
      setSubmitting(true);
      await onConfirm(); // wait for confirm callback (can be async)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4 sm:px-6">
      {/* Overlay + Centered Modal */}
      <div
        className="bg-purple-950/90 border border-purple-600 p-4 sm:p-6 md:p-8 
                   rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg 
                   animate-fadeIn scale-95 sm:scale-100 
                   transition-transform"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-200 mb-3 sm:mb-4">
          Confirm Selection
        </h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          Are you sure you want to choose this problem? You won’t be able to change once submitted.
        </p>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
          <button
            onClick={onCancel}
            disabled={submitting}
            className="w-full sm:w-auto px-4 py-2 rounded-lg 
                       bg-gray-700 text-gray-200 
                       hover:bg-gray-600 transition 
                       cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={submitting}
            className="w-full sm:w-auto px-4 py-2 rounded-lg 
                       bg-gradient-to-r from-purple-600 to-purple-800 
                       text-white font-semibold 
                       hover:scale-105 transition 
                       cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 
                       flex items-center justify-center"
          >
            {submitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Yes, Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
