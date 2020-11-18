const Article = require('../models/article');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../errors');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      res.status(200).send({ data: articles });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (!article) {
        throw new NotFoundError(`Карточка c id=${req.params.id} не найдена`);
      } else if (article.owner._id.toString() !== req.user._id) {
        throw new UnauthorizedError('Нет доступа к карточке');
      }
      return article.findOneAndRemove({ _id: req.params.id, owner: req.user._id })
        .then((found) => res.status(200).send(found));
    })
    .catch((err) => {
      console.error('err = ', err.message);
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка не найдена'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};
