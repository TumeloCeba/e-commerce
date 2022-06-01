const router = require('express').Router();
const stripeController = require('../controllers/stripeController');

router
  .route('/payment')  
  .post(stripeController.createCharges);


module.exports = router;
