const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
  },
  size: {
    type: Array,
    required: true,
  },
  color: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["deleted", "active"],
    default: "active",
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    immutable: true // Make `createdAt` immutable
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema);