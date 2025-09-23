import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function LoadingPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <FaSpinner className="animate-spin text-indigo-600 text-6xl mb-4" />
      <p className="text-gray-700 text-xl font-semibold">Loading...</p>
    </div>
  );
}
