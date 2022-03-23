const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
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
  next();
});

module.exports = mongoose.model('User', userSchema);