const { Joi } = require('celebrate');

module.exports.passwordJoi = Joi.string().required().min(8);
