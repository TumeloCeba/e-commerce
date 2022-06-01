const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    immutable: true
  },
  products: [{
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1,
    }
  }],
  img: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true // Make `createdAt` immutable
  }
},
{
  timestamps: true,
}
)

module.exports = mongoose.model('Cart', cartSchema);