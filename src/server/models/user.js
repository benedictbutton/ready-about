const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20,
  },
  todos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo',
  },
  words: {
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }],
    bookmarked: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
    ],
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  created: { type: Date, default: Date.now },
  phoneNumber: String,
  hash: String,
  salt: String,
  avatar: String,
  created: { type: Date, default: Date.now },
});

// save user password
UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

// validate user password
UserSchema.methods.validatePassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

// generate JSON token
UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    phoneNumber: this.phoneNumber,
    token: this.generateJWT(),
    avatar: this.avatar,
  };
};

// sign JSON token
UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      username: this.username,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    process.env.SECRET,
  );
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
// module.exports = mongoose.model('Email', emailSchema)
