const router = require("express").Router();
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    cartController.getAllCarts)
  .post(
    authController.protect,
    cartController.createCart);

router
  .route('/:id')
  .get(
    authController.protect,
    cartController.getUserCart)
  .patch(
    authController.protect,
    cartController.updateCart)
  .delete(
    authController.protect,
    cartController.deleteCart
  );

module.exports = router;
