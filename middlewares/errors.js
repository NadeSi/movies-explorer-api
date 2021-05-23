const { ERRORS } = require('../utils/const');
const BadRequestError = require('../utils/errors/bad-request-err');

const checkError = (error) => {
  const { name } = error;

  switch (name) {
    case 'ValidationError':
    case 'CastError':
    case 'MongoError':
      return new BadRequestError(error.message);

    default:
      return error;
  }
};

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = checkError(err);

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? ERRORS.UNKNOWN
        : message,
    });
  next();
};
