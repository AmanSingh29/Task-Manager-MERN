const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/env");

const generateToken = (user) => {
  const { _id, role, email } = user || {};
  return jwt.sign(
    {
      _id,
      role,
      email,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN || "1d",
    }
  );
};

module.exports = { generateToken };
