const { Joi } = require('celebrate');

module.exports.textJoi = Joi.string().required().min(2);
