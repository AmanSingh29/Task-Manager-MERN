const express = require("express");
const { asyncHandler } = require("../middlewares/asyncHandler.mw");
const { signupValidator, loginValidator } = require("../validators/auth.vld");
const { handleSignup, handleLogin, me } = require("../controllers/auth.ct");
const sendResponseMw = require("../middlewares/sendResponse.mw.js");
const { authenticateUser } = require("../middlewares/auth.mw.js");
const router = express.Router();

router
  .route("/signup")
  .post(signupValidator, asyncHandler(handleSignup), sendResponseMw);

router
  .route("/login")
  .post(loginValidator, asyncHandler(handleLogin), sendResponseMw);

router
  .route("/me")
  .get(authenticateUser, asyncHandler(me), sendResponseMw);

module.exports = router;
