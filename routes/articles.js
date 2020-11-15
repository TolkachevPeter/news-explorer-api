const articlesRouter = require('express').Router();
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

articlesRouter.get('/articles', getAllArticles);
articlesRouter.post('/articles', cardJoiModel, createArticle);
articlesRouter.delete('/articles/:id', objectIdModel, auth, deleteArticleById);

articlesRouter.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = articlesRouter;
