const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (element) {
        return element === this.password;
      },
      message: 'Passwords are not the same',
    }
  },
  role: {
    type: String,
    default: 'user',
  },
  status: {
    type:String,
    enum: ['active', 'deleted'],
    default: 'active'
  },
  status: {
    type:String,
    enum: ['male', 'female', 'other'],
    default: 'other'
  },
  img: {
    type: String
  }
},
{
  timestamps: true,
},);

userSchema.pre('save', async function (next) {
  //Only run this function if password was modified
  if (!this.isModified('password')) return next();

  //has password with cost of 12
  this.password = await bcryptjs.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

module.exports = mongoose.model('User', userSchema);