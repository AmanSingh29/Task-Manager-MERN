import React, { useContext } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

export default function TaskItem({ task, onEdit, onDelete }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between transition hover:shadow-lg">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        {task.description && (
          <p className="text-gray-600 mt-1">{task.description}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          <span
            className={`px-2 py-1 rounded-full text-white ${
              task.status === "pending"
                ? "bg-yellow-500"
                : task.status === "ongoing"
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
          >
            {task.status}
          </span>
          {task.dueDate && (
            <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-700">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-3 sm:mt-0 items-center">
        {user?.role === "admin" ? (
          <span className="text-gray-700 text-sm">
            Author: {task?.author || "Unknown"}
          </span>
        ) : (
          <>
            <button
              onClick={() => onEdit(task)}
              className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
            >
              <FiEdit size={20} />
            </button>
            <button
              onClick={() => onDelete(task)}
              className="text-red-500 hover:text-red-700 transition cursor-pointer"
            >
              <FiTrash2 size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
