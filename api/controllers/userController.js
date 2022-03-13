const catchAsync = require("../utils/catchAsync")
const User = require("../models/UserModel")

//exports.updateMe = catchAsync((request, response, next) => {})
exports.updateMe = catchAsync(async (request, response, next) => {
  const userId = request.user._id.toString();
  //console.log(userId);
  const updatedUser = await User.findByIdAndUpdate(
    request.user._id, 
    { 
      userName: request.body.userName,
      email: request.body.email,
    },
    { 
      new: true, 
      runValidators: true 
    },
  )

  response
    .status(200)
    .json({
      status: 'success',
      message: 'User has been deleted',
      data: {
        updatedUser
      }
    })
})

exports.deleteMe = catchAsync(async (request, response, next) => {
  await User.findByIdAndUpdate(request.user._id, { status: 'deleted' });
  response.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = catchAsync(async (request, response, next) => {
  const user = await User.findById(request.user._id)

  response.status(200).json({
    status: 'success',
    data: {
      user
    },
  });
});

exports.getAllUsers = catchAsync(async (request, response, next) => {

  if(request.user.role !== 'admin'){
    response.status(500).json({
      status: 'fail',
      message: "you're not authorised to access this route",
    });
  }

  const users = await User.find();

  response.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    },
  });
});