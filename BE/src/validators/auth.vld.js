const { celebrate, Joi, Segments } = require("celebrate");

const signupValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }).required(),
});

const loginValidator = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).required(),
});

module.exports = {
  signupValidator,
  loginValidator,
};
