const express = require("express");
const { asyncHandler } = require("../middlewares/asyncHandler.mw");
const { signupValidator, loginValidator } = require("../validators/auth.vld");
const { handleSignup, handleLogin } = require("../controllers/auth.ct");
const sendResponseMw = require("../middlewares/sendResponse.mw.js");
const router = express.Router();

router
  .route("/signup")
  .post(signupValidator, asyncHandler(handleSignup), sendResponseMw);
router
  .route("/login")
  .post(loginValidator, asyncHandler(handleLogin), sendResponseMw);

module.exports = router;
