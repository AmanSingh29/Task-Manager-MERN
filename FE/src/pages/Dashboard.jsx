import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import TaskItem from "../components/TaskItem";
import DashboardLayout from "../components/DashboardLayout";
import TaskForm from "../components/TaskForm";
import ConfirmationModal from "../components/ConfirmationModal";
import { DELETE_TASK, GET_TASK } from "../contants/endPoints";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

export default function Dashboard() {
  const { get, loading, error, del } = useApi();
  const [tasks, setTasks] = useState([]);
  const [modalData, setModalData] = useState({ type: "", task: null });
  const [searchQuery, setSearchQuery] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const pageSize = 10;
  const totalPages = Math.ceil(totalResults / pageSize);

  const handleCloseModal = () => {
    setModalData({ type: "", task: null });
  };

  const fetchTasks = async (query = "", page) => {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      const res = await get(
        `${GET_TASK}?search_query=${encodeURIComponent(query)}&page=${
          page || currentPage
        }`
      );
      setTasks(res.tasks);
      setTotalResults(res.total || 0);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const handleEditTask = (task) => {
    setModalData({ type: "edit", task });
  };

  const handleConfirmDelete = async () => {
    await del(DELETE_TASK, { _id: modalData.task?._id });
    await fetchTasks();
    handleCloseModal();
  };

  const handleTaskDelete = (task) => {
    setModalData({ type: "delete", task });
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery === null) return;
    const delayDebounce = setTimeout(() => {
      fetchTasks(searchQuery, 1);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Welcome to your Task Manager</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <button
          className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          onClick={() => setModalData({ type: "edit", task: null })}
        >
          Add Task
        </button>

        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {totalResults > 0 && (
        <p className="text-sm text-gray-600 mb-3">
          Showing {tasks.length} of {totalResults} tasks
        </p>
      )}

      {loading && <p className="text-gray-500">Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {tasks.length === 0 && !loading ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskItem
              onDelete={handleTaskDelete}
              onEdit={handleEditTask}
              key={task._id}
              task={task}
            />
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <TaskForm
        isOpen={modalData.type === "edit"}
        onClose={handleCloseModal}
        onSuccess={fetchTasks}
        task={modalData.task}
      />
      <ConfirmationModal
        isOpen={modalData.type === "delete"}
        title="Delete Task?"
        description={`Are you sure you want to delete "${modalData.task?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseModal}
        loading={loading}
      />
    </DashboardLayout>
  );
}
