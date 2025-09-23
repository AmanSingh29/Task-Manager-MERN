import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search tasks...",
}) {
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm px-3 py-2 w-full max-w-md focus-within:ring-2 focus-within:ring-indigo-500">
      <FiSearch className="text-gray-500 mr-2" size={18} />
      <input
        type="text"
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 outline-none bg-transparent text-sm sm:text-base"
      />
    </div>
  );
}
