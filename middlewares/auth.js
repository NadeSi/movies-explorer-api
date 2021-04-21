const jwt = require('jsonwebtoken');

const { ERRORS, JWT_SECRET_DEV } = require('../utils/const');
const UnauthorizedError = require('../utils/errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(ERRORS.AUTH);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    throw new UnauthorizedError(ERRORS.AUTH);
  }

  req.user = payload;
  next();
};
