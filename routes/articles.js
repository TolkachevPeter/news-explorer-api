const cardsRouter = require('express').Router();
const {
  getAllArticles,
  createArticle,
  deleteArticleById,
} = require('../controllers/articles');
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

cardsRouter.get('/articles', getAllArticles);
cardsRouter.post('/articles', cardJoiModel, createArticle);
cardsRouter.delete('/cards/:id', objectIdModel, auth, deleteArticleById);

cardsRouter.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = cardsRouter;
