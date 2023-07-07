const { Joi } = require('celebrate');

const joiUserDataSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

module.exports = joiUserDataSchema;
