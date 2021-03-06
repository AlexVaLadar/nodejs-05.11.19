const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const SALT_ROUNDS = 12;

// схема для создания пользователя
const userSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, default: '[ пользователь ]' },
  lastName: { type: String, default: ' ' },
  password: { type: String, required: true },
  birthday: { type: Date, default: new Date() },
  phoneNumber: { type: Number }},
  { versionKey: false }
);

// шифрование пароля
userSchema.pre('save', function(next) {
  if ( this.isModified('password') ) {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);

    this.password = bcrypt.hashSync(this.password, salt);
  }

  next();
});

userSchema.methods.validatePassword = function(candidate) {
  return bcrypt.compareSync(candidate, this.password);
}

module.exports = mongoose.model('User', userSchema, 'users');