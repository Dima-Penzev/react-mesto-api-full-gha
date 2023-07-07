const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { handleUnexistedPath } = require('../utils/handleUnexistedPath');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const joiUserSchema = require('../validateSchemas/validateUser');
const joiMainDataSchema = require('../validateSchemas/validateMainData');

router.post('/signup', celebrate(joiUserSchema), createUser);

router.post('/signin', celebrate(joiMainDataSchema), login);

router.use('/users', auth, usersRoutes);

router.use('/cards', auth, cardsRoutes);

router.use('/*', handleUnexistedPath);

module.exports = router;
