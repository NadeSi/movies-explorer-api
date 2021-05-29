const cors = require('cors');

const options = {
  origin: [
    'http://localhost:6060',
    'https://movies-explorer.nade.nomoredomains.monster',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = cors(options);
