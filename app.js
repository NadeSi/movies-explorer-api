require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const {
  errors,
} = require('celebrate');

const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(require('./utils/const').MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(requestLogger);

app.use('/api', require('./routes'));

app.use(errorLogger);
app.use(errors());

app.use(require('./middlewares/errors'));

const server = app.listen(PORT, (err) => {
  if (err) return console.log(`Error: ${err}`);
  return console.log(`Server is listening on port ${server.address().port}`);
});
