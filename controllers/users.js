const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
} = require('../errors');

const { passwordModel } = require('../joi-models/index');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (password.length < 8) {
    throw new BadRequestError('Пароль должен содержать более 8 символов');
  } else if (!password) {
    throw new BadRequestError('Пароль обязателен для всех');
  } else if (!passwordModel) {
    throw new BadRequestError('Пароль должен содержать латиницу и арабские цифры');
  }
  return bcryptjs.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(201).send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(err.message));
        } else if (err.code === 11000 && err.name === 'MongoError') {
          next(new ConflictError('Пользователь с таким e-mail уже существует'));
        } else next(err);
      }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};
