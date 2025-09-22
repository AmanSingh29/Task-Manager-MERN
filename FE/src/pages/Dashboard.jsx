import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import TaskItem from "../components/TaskItem";
import DashboardLayout from "../components/DashboardLayout";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
  const { get, loading, error } = useApi();
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await get("/task");
      setTasks(res.tasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Welcome to your Task Manager</h1>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-indigo-700 transition"
        onClick={() => setModalOpen(true)}
      >
        Add Task
      </button>

      {loading && <p className="text-gray-500">Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {tasks.length === 0 && !loading ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskItem onEdit={handleEditTask} key={task._id} task={task} />
          ))}
        </div>
      )}
      <TaskForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchTasks}
        task={currentTask}
      />
    </DashboardLayout>
  );
}
