const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('node:http2').constants;
const { CastError, ValidationError } = require('mongoose').mongoose.Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const UnauthorizedError = require('../errors/unauthorizedError');
const ConflictError = require('../errors/conflictError');

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(HTTP_STATUS_OK).send({ data: users }))
  .catch(next);

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((newUser) => res.status(HTTP_STATUS_CREATED).send(newUser))
    .catch((err) => {
      if (err.name === 'MongoServerError') {
        next(new ConflictError('Пользователь с таким email уже существует.'));
      } else if (err instanceof ValidationError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя.',
          ),
        );
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', {
        expiresIn: '7d',
      });
      return res.status(HTTP_STATUS_OK).send({ token });
    })
    .catch(() => {
      next(
        new UnauthorizedError('Необходимо ввести корректные логин и пароль.'),
      );
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден.');
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Передан некоректный id пользователя.'));
      } else {
        next(err);
      }
    });
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден.');
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Передан некоректный id пользователя.'));
      } else {
        next(err);
      }
    });
};

const updateUserDataById = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден.');
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя.',
          ),
        );
      } else {
        next(err);
      }
    });
};

const updateUserAvatarById = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден.');
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя.',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserDataById,
  updateUserAvatarById,
  login,
  getUserInfo,
};
