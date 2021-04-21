const routes = require('express')
  .Router();

const auth = require('../middlewares/auth');
const { ERRORS } = require('../utils/const');
const NotFoundError = require('../utils/errors/not-found-err');

routes.use('/', require('./auth'));

routes.use('/users', auth, require('./users'));
routes.use('/movies', auth, require('./movies'));

routes.use('*', () => {
  throw new NotFoundError(ERRORS.REQ_NOT_FOUND);
});

module.exports = routes;
