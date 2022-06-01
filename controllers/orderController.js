const catchAsync = require("../utils/catchAsync")
const Order = require("../models/OrderModel")

//exports.updateMe = catchAsync((request, response, next) => {})
exports.createOrder = catchAsync(async (request, response, next) => {
  const {userId,updatedAt, ...newOrderBody} = request.body;

  newOrderBody.userId = request.user._id;

  const newOrder = await Order.create(newOrderBody);

  response
    .status(200)
    .json({
      status: 'success',
      data: {
        newOrder
      }
    })
})

exports.updateOrder = catchAsync(async (request, response, next) => {
  const {userId,updatedAt, ...updateOrderBody} = request.body;
  const updatedOrder = await Order.findByIdAndUpdate(
    request.params.orderId, 
    updateOrderBody,
    { 
      new: true, 
      runValidators: true 
    },
  )

  response
    .status(200)
    .json({
      status: 'success',
      message: 'Order has been updated',
      data: {
        updatedOrder
      }
    })
})

exports.deleteUserOrder = catchAsync(async (request, response, next) => {

  await Order.findOneAndUpdate(
    {
      _id: request.params.id,
      userId: request.user._id,
    },
    {
      status: 'deleted'
    },
    { 
      new: true, 
      runValidators: true 
    }
  )

  response.status(200).json({
    status: 'success',
    message: 'Order has been deleted',
    data: null,
  });

});

exports.getUserOrders = catchAsync(async (request, response, next) => {
  const orders = await Order.find({
    userId: request.user._id,
  })

  response.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders
    },
  });
});

exports.getAllOrders = catchAsync(async (request, response, next) => {
  const orders = await Order.find().populate('user');
  
  response.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders
    },
  });
});

exports.getIncome = catchAsync( async (request, response) => {
  const productId = request.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const income = await Order.aggregate([
    { 
      $match: {
         createdAt: { $gte: previousMonth }, 
        ...(productId && { products: {$elemMatch: {_id: productId}}}) 
      } 
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);

  response.status(200).json({
    status: 'success',
    data:{
      income,
    }
  });
});