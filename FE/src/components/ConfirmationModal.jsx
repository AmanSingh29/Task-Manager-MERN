import React from "react";
import { FiX } from "react-icons/fi";

export default function ConfirmationModal({
  isOpen,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={onCancel}
        >
          <FiX size={24} />
        </button>

        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition cursor-pointer ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
