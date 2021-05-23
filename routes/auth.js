const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { userJoiValidator } = require('../utils/joi.validators');
const {
  login, register,
} = require('../controllers/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: userJoiValidator.email,
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: userJoiValidator.email,
    password: userJoiValidator.password,
    name: userJoiValidator.name,
  }),
}), register);

module.exports = router;
