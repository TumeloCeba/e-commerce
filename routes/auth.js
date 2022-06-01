const router = require('express').Router();
const authController = require('../controllers/authController');
//REGISTER

router.post(
  '/signup', 
  authController.signUp
);

//LOGIN

router.post(
  '/login',
  authController.login
);



module.exports = router;
