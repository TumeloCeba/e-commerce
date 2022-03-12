const { promisify } = require('util');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const createToken = async (user) => {
  return await jwt.sign({
    id: user._id,
    role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  )
} 

exports.protect = catchAsync(async (request, response, next) => {
  //Getting token and check if its there
  let token;

  console.log('protect', request.headers);

  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer')
  ) {
    token = request.headers.authorization.split(' ')[1];
  } else if (request.cookies.jwt) {
    token = request.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError(
        'You are not logged in, please log in to get access',
        403
      )
    );
  }

  //Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        'The user the token belongs to no longer exists',
        403
      )
    );
  }

  /*
  //check if user changed password after jwt token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );
  }
  */

  request.user = currentUser;
 // response.locals.user = currentUser;
  //GRANT ACCESS TO PROTECTED ROUTE
  next();
});

exports.restrictTo =
  (...roles) =>
  (request, response, next) => {
    if (!roles.includes(request.user.role)) {
      return next(
        new AppError(
          'You do not have the permission to perform this action',
          403
        )
      );
    }
    next();
  };

exports.verifyToken = catchAsync(async (request, response, next) => {
  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer')
  ) {
    token = request.headers.authorization.split(' ')[1];
  } else if (request.cookies.jwt) {
    token = request.cookies.jwt;
  }
  else {
    next( new AppError(
      'You do not have the permission to perform this action',
      403
    ))
  }

  tokenValid = await Promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    )

  if(!tokenValid){
    next( new AppError(
          'Invalid token',
          403
        ))    
  }

  next();
});

exports.signUp =  catchAsync(async (request, response, next) => {
  const newUser = await User.create({
    userName: request.body.userName,
    email: request.body.email,
    password: request.body.password,
  });

  const accessToken = await createToken(newUser);

  response.cookie(
    'jwt',
    accessToken
  )

  response
    .status(201)
    .json({
      status: 'success',
      data: {
        user: newUser,
      }
    },);
  })

exports.login = catchAsync(async (request, response, next) => {
  const {email, password} = request.body;
  let credentialsValid = false;
  let user;

  console.log({email,password});

  if(email && password){
    user = await User.findOne({
      email,
      status: 'active'
    }).select('+password');

    if(user){
      credentialsValid = await bcryptjs.compare(request.body.password, user.password );
    }
  }

  if(credentialsValid){
    const modifiedUser = Object.create(user);
    
    modifiedUser.password = undefined;

    const accessToken = await createToken(modifiedUser);

    response.cookie(
      'jwt', 
      accessToken,
      {
        //httpOnly: true,
       // secure: true,
      });
    //console.log('login here', modifiedUser);

    response
      .status(200)
      .json({
        status: 'success',
        data: {
          user: modifiedUser,
          jwt: accessToken
        },
      },
    );

  } else {
    next(new AppError(
          'Wrong credentials provided',
          403
        ))
  }
})