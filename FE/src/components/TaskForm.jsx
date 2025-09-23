import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import useApi from "../hooks/useApi";
import { CREATE_TASK, UPDATE_TASK } from "../contants/endPoints";

const TASK_STATUS_LIST = [
  { id: 1, label: "Pending", value: "pending" },
  { id: 2, label: "Ongoing", value: "ongoing" },
  { id: 3, label: "Completed", value: "completed" },
];

const initialFormData = {
  title: "",
  description: "",
  dueDate: "",
  status: "pending",
};

export default function TaskForm({ isOpen, onClose, task = null, onSuccess }) {
  const { post, patch, loading, error } = useApi();
  const isEdit = Boolean(task);

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

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
      setFormData(initialFormData);
    }
    setFormErrors({});
  }, [task, isEdit]);

  const validate = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.length > 50) {
      errors.title = "Title must be less than 50 characters";
    }

    if (formData.description.length > 300) {
      errors.description = "Description must be less than 300 characters";
    }

    if (!formData.dueDate) {
      errors.dueDate = "Due date is required";
    }

    if (!formData.status) {
      errors.status = "Status is required";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (isEdit) {
        await patch(UPDATE_TASK, { ...formData, _id: task?._id });
      } else {
        await post(CREATE_TASK, formData);
      }
      setFormData(initialFormData);
      setFormErrors({});
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const isFormInvalid = Object.keys(validate()).length > 0;

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

        {(error || Object.keys(formErrors).length > 0) && (
          <div className="mb-3 space-y-1">
            {error && <p className="text-red-500">{error}</p>}
            {Object.values(formErrors).map((errMsg, idx) => (
              <p key={idx} className="text-red-500 text-sm">
                {errMsg}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={50}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                formErrors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              maxLength={300}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                formErrors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                formErrors.dueDate
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                formErrors.status
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            >
              {TASK_STATUS_LIST.map(({ id, label, value }) => (
                <option key={id} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || isFormInvalid}
            className={`font-semibold py-2 rounded-md transition ${
              loading || isFormInvalid
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            {loading ? "Saving..." : isEdit ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
