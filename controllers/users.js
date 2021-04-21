const User = require('../models/user');

const { ERRORS } = require('../utils/const');
const NotFoundError = require('../utils/errors/not-found-err');
const ConflictError = require('../utils/errors/conflict-err');

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(ERRORS.USER_NOT_FOUND);
    })
    .then(({ name, email }) => res.send({ name, email }))
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    name,
    email,
  }, {
    new: true,
    runValidators: true,
  }, (error) => {
    if (error) {
      if (error.codeName === 'DuplicateKey') {
        next(new ConflictError(ERRORS.CONFLICT_EMAIL));
      } else next(error);
    }
  })
    .orFail(() => {
      throw new NotFoundError(ERRORS.USER_NOT_FOUND);
    })
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch(next);
};
