const catchAsync = require("../utils/catchAsync")
const Cart = require("../models/CartModel")

//exports.updateMe = catchAsync((request, response, next) => {})
exports.createCart = catchAsync(async (request, response, next) => {
  const {userId,updatedAt, ...newCartBody} = request.body;

  newCartBody.userId = request.user._id;

  const newCart = await Cart.create(newCartBody);

  response
    .status(200)
    .json({
      status: 'success',
      data: {
        newCart
      }
    })
})

exports.updateCart = catchAsync(async (request, response, next) => {
  const {userId,updatedAt, ...updateCartBody} = request.body;
  const updatedCart = await Cart.findOneAndUpdate(
    {
      _id: request.params.id,
      userId: request.user._id,
    }, 
    updateCartBody,
    { 
      new: true, 
      runValidators: true 
    },
  )

  response
    .status(200)
    .json({
      status: 'success',
      message: 'Cart has been updated',
      data: {
        updatedCart
      }
    })
})

exports.deleteCart = catchAsync(async (request, response, next) => {

  await Cart.findOneAndDelete(
    {
      _id: request.params.id,
      userId: request.user._id,
    }
  )

  response.status(200).json({
    status: 'success',
    message: 'Cart has been deleted',
    data: null,
  });

});

exports.getUserCart = catchAsync(async (request, response, next) => {
  const cart = await Cart.findById({
    userId: request.user._id
  })

  response.status(200).json({
    status: 'success',
    data: {
      cart
    },
  });
});

exports.getAllCarts = catchAsync(async (request, response, next) => {
  const carts = await Cart.find();
  
  response.status(200).json({
    status: 'success',
    results: carts.length,
    data: {
      carts
    },
  });
});