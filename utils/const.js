module.exports.ERRORS = {
  UNKNOWN: 'На сервере произошла ошибка',
  REQ_NOT_FOUND: 'Запрашиваемый ресурс не найден',
  AUTH: 'Неавторизованный запрос',
  CONFLICT_EMAIL: 'Такой email уже используется',
  BAD_DATA: 'Неправильные почта или пароль',
  USER_NOT_FOUND: 'Не найден пользователь',
  MOVIE_NOT_FOUND: 'Не найден фильм',
  DELETE_FORBIDDEN: 'Нет прав на удаление',
};

module.exports.JWT_SECRET_DEV = 'secret';
module.exports.MONGODB = 'mongodb://localhost:27017/bitfilmsdb';
