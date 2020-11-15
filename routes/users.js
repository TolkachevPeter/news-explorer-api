const usersRouter = require('express').Router();
const {
  getUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

// что-то не очень вышло
usersRouter.get('/users/me', auth, getUser);

module.exports = usersRouter;
