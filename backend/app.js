const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('node:http2').constants;
// const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('Database is successfully connected.');
}).catch((err) => {
  console.log(err.message);
});

// app.use(cors({
//   origin: [
//     'https://mesto.full.nomoredomains.work',
//     'http://mesto.full.nomoredomains.work',
//   ],
//   credentials: true,
// }));
const allowedCors = [
  'https://mesto.full.nomoredomains.work',
  'http://mesto.full.nomoredomains.work',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});

app.use(express.json());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
