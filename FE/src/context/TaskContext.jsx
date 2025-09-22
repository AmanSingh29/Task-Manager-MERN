import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) loadTasks();
  }, [user]);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const addTask = async (task) => {
    const res = await createTask(task);
    setTasks([...tasks, res.data]);
  };

  const editTask = async (id, updatedTask) => {
    const res = await updateTask(id, updatedTask);
    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};
