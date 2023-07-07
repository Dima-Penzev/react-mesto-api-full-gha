const { HTTP_STATUS_OK } = require('node:http2').constants;
const { CastError, ValidationError } = require('mongoose').mongoose.Error;
const Card = require('../models/card');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const getCards = (req, res, next) => Card.find({})
  .populate(['owner', 'likes'])
  .then((cards) => res.status(HTTP_STATUS_OK).send({ data: cards }))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Card.create({
    name, link, owner: req.user._id, createdAt: Date.now(),
  })
    .then((newCard) => res.status(HTTP_STATUS_OK).send({ data: newCard }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteCardById = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному id не найдена.');
      }
      if (card.owner.toHexString() !== userId) {
        throw new ForbiddenError('Недостаточно прав для удаления данной карточки.');
      }
      return Card.findByIdAndRemove(card._id.toHexString())
        .then((removedCard) => res.status(HTTP_STATUS_OK).send({ data: removedCard }));
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Переданы некорректные данные при удалении карточки.'));
      } else {
        next(err);
      }
    });
};

const LikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка по указанному id не найдена.');
    }
    return res.status(HTTP_STATUS_OK).send({ data: card });
  })
  .catch((err) => {
    if (err instanceof CastError) {
      next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
    } else {
      next(err);
    }
  });

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка по указанному id не найдена.');
    }

    return res.status(HTTP_STATUS_OK).send({ data: card });
  })
  .catch((err) => {
    if (err instanceof CastError) {
      next(new BadRequestError('Переданы некорректные данные для удаления лайка.'));
    } else {
      next(err);
    }
  });

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  LikeCard,
  dislikeCard,
};
