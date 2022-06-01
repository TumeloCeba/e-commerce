const Stripe = require('stripe');
const dotenv = require("dotenv");
const catchAsync = require('../utils/catchAsync');

dotenv.config({
  path: "./config.env",
  debug: true
});

const  stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCharges = catchAsync(async(request, response, next) => {
  await stripe.charges.create({
    source: request.body.tokenId,
    amount: request.body.amount,
    currency: "usd",
  }, 
  (stripeErr, stripeRes) => {
    if(stripeErr){
      response
        .status(500)
        .json(stripeErr);
    } else {
      response
        .status(200)
        .json(stripeRes);
    }
  }
  )
})