const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { handleUnexistedPath } = require('../utils/handleUnexistedPath');
const { createUser, login, logOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const joiUserSchema = require('../validateSchemas/validateUser');
const joiMainDataSchema = require('../validateSchemas/validateMainData');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', celebrate(joiUserSchema), createUser);

router.post('/signin', celebrate(joiMainDataSchema), login);

router.use('/users', auth, usersRoutes);

router.use('/cards', auth, cardsRoutes);

router.get('/signout', auth, logOut);

router.use('/*', handleUnexistedPath);

module.exports = router;
