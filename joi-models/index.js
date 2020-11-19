const { Joi, celebrate } = require('celebrate');
const { emailJoi } = require('./email-model');
const { linkJoi } = require('./link-model');
const { nameJoi } = require('./name-model');
const { passwordJoi } = require('./password-model');
const { objectJoi } = require('./object-id-model');
const { textJoi } = require('./text-model');

const createUserJoiModel = celebrate({
  body: Joi.object().keys({
    name: nameJoi,
    about: nameJoi,
    avatar: linkJoi,
    email: emailJoi,
    password: passwordJoi,
  }),
});

const loginJoiModel = celebrate({
  body: Joi.object().keys({
    email: emailJoi,
    password: passwordJoi,
  }),
});

const avatarJoiModel = celebrate({
  body: Joi.object().keys({
    avatar: linkJoi,
  }),
});

const articleJoiModel = celebrate({
  body: Joi.object().keys({
    keyword: textJoi,
    title: textJoi,
    text: textJoi,
    date: textJoi,
    source: textJoi,
    link: linkJoi,
    image: linkJoi,
    owner: objectJoi,
  }),
});

const infoJoiModel = celebrate({
  body: Joi.object().keys({
    name: nameJoi,
    about: nameJoi,
  }),
});

const passwordModel = celebrate({
  body: Joi.object().keys({
    password: passwordJoi,
  }),
});

const objectIdModel = celebrate({
  params: Joi.object().keys({
    id: objectJoi,
  }),
});

module.exports = {
  articleJoiModel,
  infoJoiModel,
  avatarJoiModel,
  loginJoiModel,
  createUserJoiModel,
  passwordModel,
  objectIdModel,
};
