const { Joi } = require('celebrate');

const joiMainDataSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

module.exports = joiMainDataSchema;
