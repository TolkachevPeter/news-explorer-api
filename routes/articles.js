const cardsRouter = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  NotFoundError,
} = require('../errors');
const { cardJoiModel, objectIdModel } = require('../joi-models/index');
const auth = require('../middlewares/auth');

// # возвращает все сохранённые пользователем статьи
// GET /articles

// # создаёт статью с переданными в теле
// # keyword, title, text, date, source, link и image
// POST /articles

// # удаляет сохранённую статью  по _id
// DELETE /articles/articleId

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', cardJoiModel, createCard);
cardsRouter.delete('/cards/:id', objectIdModel, auth, deleteCardById);
cardsRouter.put('/cards/:id/likes', objectIdModel, likeCard);
cardsRouter.delete('/cards/:id/likes', objectIdModel, dislikeCard);

cardsRouter.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = cardsRouter;
