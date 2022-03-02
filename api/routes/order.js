const router = require("express").Router();
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    orderController.getAllOrders);
/*  .post(
    authController.protect,
    orderController.createOrder);*/

router
  .route('/user')
  .get(
    authController.protect,
    orderController.getUserOrders)
  .post(
    authController.protect,
    orderController.createOrder)
  .delete(
    authController.protect,
    orderController.deleteUserOrder
  );

router
  .route('/user/:orderId')
  .delete(
    authController.protect,
    orderController.deleteUserOrder
  );

router
  .route('/:orderId')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    orderController.updateOrder);

module.exports = router;
