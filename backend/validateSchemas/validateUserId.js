const { Joi } = require('celebrate');

const joiUserIdSchema = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = joiUserIdSchema;
