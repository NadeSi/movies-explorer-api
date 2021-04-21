const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { movieJoiValidator } = require('../utils/joi.validators');
const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: movieJoiValidator.country,
    director: movieJoiValidator.director,
    duration: movieJoiValidator.duration,
    year: movieJoiValidator.year,
    description: movieJoiValidator.description,
    image: movieJoiValidator.image,
    trailer: movieJoiValidator.trailer,
    nameRU: movieJoiValidator.nameRU,
    nameEN: movieJoiValidator.nameEN,
    thumbnail: movieJoiValidator.thumbnail,
    movieId: movieJoiValidator.movieId,
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovieById);

module.exports = router;
