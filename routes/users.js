const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUser,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');
const {
  infoJoiModel,
  avatarJoiModel,
  objectIdModel,
} = require('../joi-models/index.js');
const auth = require('../middlewares/auth');

usersRouter.get('/users/me', # возвращает информацию о пользователе (email и имя));

module.exports = usersRouter;
