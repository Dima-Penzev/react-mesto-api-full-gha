const { Joi } = require('celebrate');

const joiCardIdSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = joiCardIdSchema;
