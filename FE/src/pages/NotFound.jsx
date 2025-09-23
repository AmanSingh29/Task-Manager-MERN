import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <FiAlertCircle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-5xl font-bold mb-2">404</h1>
      <p className="text-gray-700 text-xl mb-4">Page Not Found</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Go Home
      </button>
    </div>
  );
}
