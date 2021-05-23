const mongoose = require('mongoose');
const validator = require('validator');
const { ERRORS } = require('../utils/const');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: [true, ERRORS.CONFLICT_EMAIL],
    validator: validator.isEmail,
    message: (props) => `${props.value} некорректный email!`,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
