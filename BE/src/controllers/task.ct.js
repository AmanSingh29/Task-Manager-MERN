const { default: mongoose } = require("mongoose");
const AppError = require("../utils/appError.ut");
const { USER_ROLES } = require("../constants/enums");
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

async function deleteTask(req, res, next) {
  const { _id: userId } = req.user;
  const { _id } = req.body;
  const task = await Task.findOneAndDelete({ _id, created_by: userId });

  if (!task) {
    throw new AppError("Task not found!", 404);
  }

  res.data = {
    statusCode: 200,
    message: "Task Deleted Successfully",
  };
  next();
}

async function getTasks(req, res, next) {
  const { _id: userId, role } = req.user;
  let { search_query, page = 1, limit = 10 } = req.query;
  page = Number(page);
  limit = Number(limit);
  const pipeline = [];
  const matchStage = {
    created_at: {
      $exists: true,
    },
  };
  const sortStage = [
    {
      $sort: { created_at: -1 },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
  ];
  if (role !== USER_ROLES.ADMIN) {
    matchStage.created_by = new mongoose.Types.ObjectId(userId);
  }
  if (search_query) {
    search_query = search_query.trim();
    const text = new RegExp(search_query, "i");
    matchStage.$or = [
      { title: { $regex: text } },
      { description: { $regex: text } },
    ];
  }
  pipeline.push(
    {
      $match: matchStage,
    },
    ...sortStage
  );
  const results = await Task.aggregate(pipeline);

  res.data = {
    statusCode: 200,
    tasks: results,
  };
  next();
}

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
};
