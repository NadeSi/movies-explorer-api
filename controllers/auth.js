const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ERRORS, JWT_SECRET_DEV } = require('../utils/const');
const ConflictError = require('../utils/errors/conflict-err');
const UnauthorizedError = require('../utils/errors/unauthorized-err');

const User = require('../models/user');

module.exports.register = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictError(ERRORS.CONFLICT_EMAIL));
      }
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          email,
          password: hash,
        })
          .then((userData) => res.send({
            _id: userData._id,
            name: userData.name,
            email: userData.email,
          }))
          .catch(next)).catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(ERRORS.BAD_DATA);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(ERRORS.BAD_DATA);
          }

          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });
          res.send({ token });
        }).catch(next);
    })
    .catch(next);
};
