const express = require("express");
const { asyncHandler } = require("../middlewares/asyncHandler.mw");
const sendResponseMw = require("../middlewares/sendResponse.mw.js");
const {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
} = require("../controllers/task.ct.js");
const { authenticateUser } = require("../middlewares/auth.mw.js");
const {
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
  getTasksValidator,
} = require("../validators/task.vld.js");
const router = express.Router();

router
  .route("/")
  .get(
    authenticateUser,
    getTasksValidator,
    asyncHandler(getTasks),
    sendResponseMw
  );

router
  .route("/create")
  .post(
    authenticateUser,
    createTaskValidator,
    asyncHandler(createTask),
    sendResponseMw
  );

router
  .route("/update")
  .patch(
    authenticateUser,
    updateTaskValidator,
    asyncHandler(updateTask),
    sendResponseMw
  );

router
  .route("/delete")
  .delete(
    authenticateUser,
    deleteTaskValidator,
    asyncHandler(deleteTask),
    sendResponseMw
  );

module.exports = router;
