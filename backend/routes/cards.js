const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCardById, LikeCard, dislikeCard,
} = require('../controllers/cards');
const joiCardSchema = require('../validateSchemas/validateCard');
const joiCardIdSchema = require('../validateSchemas/validateCardId');

router.get('/', getCards);

router.post('/', celebrate(joiCardSchema), createCard);

router.delete('/:cardId', celebrate(joiCardIdSchema), deleteCardById);

router.put('/:cardId/likes', celebrate(joiCardIdSchema), LikeCard);

router.delete('/:cardId/likes', celebrate(joiCardIdSchema), dislikeCard);

module.exports = router;
