const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { userJoiValidator } = require('../utils/joi.validators');
const {
  getUserProfile, updateUserProfile,
} = require('../controllers/users');

router.get('/me', getUserProfile);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: userJoiValidator.name,
    email: userJoiValidator.email,
  }),
}), updateUserProfile);

module.exports = router;
