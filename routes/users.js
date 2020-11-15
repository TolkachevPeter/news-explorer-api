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

// что-то не очень вышло
usersRouter.get('/users/me', getUser);

module.exports = usersRouter;
