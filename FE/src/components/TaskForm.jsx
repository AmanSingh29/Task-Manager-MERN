import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import useApi from "../hooks/useApi";
import { CREATE_TASK, UPDATE_TASK } from "../contants/endPoints";

const TASK_STATUSES = ["pending", "ongoing", "completed"];

export default function TaskForm({ isOpen, onClose, task = null, onSuccess }) {
  const { post, patch, loading, error } = useApi();
  const isEdit = Boolean(task);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  useEffect(() => {
    if (isEdit && task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
        status: task.status || "pending",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: ""
      });
    }
  }, [task, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        formData._id = task?._id;
        await patch(UPDATE_TASK, formData);
      } else {
        await post(CREATE_TASK, formData);
      }
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        >
          <FiX size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Task" : "Create Task"}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {isEdit && (
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {TASK_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer"
          >
            {loading ? "Saving..." : isEdit ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
