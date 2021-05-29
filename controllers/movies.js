const Movie = require('../models/movie');

const { ERRORS } = require('../utils/const');
const NotFoundError = require('../utils/errors/not-found-err');
const ForbiddenError = require('../utils/errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      next(new NotFoundError(ERRORS.MOVIE_NOT_FOUND));
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new ForbiddenError(ERRORS.DELETE_FORBIDDEN));
      }

      Movie.findByIdAndRemove(req.params.movieId)
        .orFail(() => {
          next(new NotFoundError(ERRORS.MOVIE_NOT_FOUND));
        })
        .then((movieData) => res.send(movieData))
        .catch(next);
    })
    .catch(next);
};
