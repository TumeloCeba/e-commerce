const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.ObjectId,
      ref: 'User', 
      required: true 
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { 
      type: Number, 
      required: true 
    },
    address: { 
      type: Object, 
      required: true 
    },
    status: { 
      type: String, 
      default: "pending" 
    },
    createdAt: {
      type: Date,
      immutable: true // Make `createdAt` immutable
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);