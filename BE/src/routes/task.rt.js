const express = require("express");
const { asyncHandler } = require("../middlewares/asyncHandler.mw");
const sendResponseMw = require("../middlewares/sendResponse.mw.js");
const { createTask, updateTask } = require("../controllers/task.ct.js");
const { authenticateUser } = require("../middlewares/auth.mw.js");
const { createTaskValidator, updateTaskValidator } = require("../validators/task.vld.js");
const router = express.Router();

router.route("/create").post(authenticateUser, createTaskValidator, asyncHandler(createTask), sendResponseMw);

router.route("/update").patch(authenticateUser, updateTaskValidator, asyncHandler(updateTask), sendResponseMw);

module.exports = router;
