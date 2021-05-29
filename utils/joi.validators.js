const { Joi } = require('celebrate');

const linkRegExp = /^http(s?):\/\/(www.)?[\w\-.~:/?%#[\]@!$&`()*+,;=]*/i;
// const ruRegExp = /^[?!,.а-яА-ЯёЁ0-9\s]+$/i;
// const enRegExp = /^[?!,.a-zA-Z0-9\s]+$/i;

module.exports.userJoiValidator = {
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
};

module.exports.movieJoiValidator = {
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().regex(linkRegExp).required(),
  trailer: Joi.string().regex(linkRegExp).required(),
  thumbnail: Joi.string().regex(linkRegExp).required(),
  owner: Joi.string().hex().length(24).required(),
  movieId: Joi.number().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
};
