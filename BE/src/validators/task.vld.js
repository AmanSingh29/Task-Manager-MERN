const { celebrate, Joi, Segments } = require("celebrate");
const { TASK_STATUS } = require("../constants/enums");

const createTaskValidator = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(5).max(50).required(),
    description: Joi.string().max(300).optional().allow(""),
    status: Joi.string()
      .valid(...Object.values(TASK_STATUS))
      .optional(),
    dueDate: Joi.date().optional(),
  }).required(),
});

const updateTaskValidator = celebrate({
  [Segments.BODY]: Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().min(2).max(50).optional(),
    description: Joi.string().max(300).optional().allow(""),
    status: Joi.string()
      .valid(...Object.values(TASK_STATUS))
      .optional(),
    dueDate: Joi.date().optional(),
  })
    .min(1)
    .required(),
});

const deleteTaskValidator = celebrate({
  [Segments.BODY]: Joi.object({
    _id: Joi.string().required(),
  }).required(),
});

const getTasksValidator = celebrate({
  [Segments.QUERY]: Joi.object({
    search_query: Joi.string().optional().allow(""),
    page: Joi.string().min(1).optional(),
    limit: Joi.string().optional(),
  }),
});

module.exports = {
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
  getTasksValidator
};
