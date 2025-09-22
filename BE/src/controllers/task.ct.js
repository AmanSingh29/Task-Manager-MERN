const { default: mongoose } = require("mongoose");
const AppError = require("../utils/appError.ut");
const Task = mongoose.model("tasks");

async function createTask(req, res, next) {
  const { _id } = req.user;
  const { title, description, dueDate } = req.body;
  const data = await new Task({
    title,
    description,
    dueDate,
    created_by: _id,
  }).save();
  res.data = {
    statusCode: 201,
    message: "Task Created Successfully",
    task: data,
  };
  next();
}

async function updateTask(req, res, next) {
  const { _id: userId } = req.user;
  const { title, description, status, dueDate, _id } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id, created_by: userId },
    { $set: { title, description, status, dueDate } },
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new AppError("Task not found!", 404);
  }

  res.data = {
    statusCode: 200,
    message: "Task Updated Successfully",
    task,
  };
  next();
}

module.exports = {
  createTask,
  updateTask,
};
