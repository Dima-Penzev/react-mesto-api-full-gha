const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUserDataById,
  updateUserAvatarById,
  getUserInfo,
} = require('../controllers/users');
const joiUserIdSchema = require('../validateSchemas/validateUserId');
const joiUserDataSchema = require('../validateSchemas/validateUserData');
const joiUserAvatarSchema = require('../validateSchemas/validateUserAvatar');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:userId', celebrate(joiUserIdSchema), getUserById);

router.patch('/me', celebrate(joiUserDataSchema), updateUserDataById);

router.patch('/me/avatar', celebrate(joiUserAvatarSchema), updateUserAvatarById);

module.exports = router;
