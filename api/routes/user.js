const router = require("express").Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.patch(
  '/updateMe',
  authController.protect,
  userController.updateMe
);

router.delete(
  '/deleteMe',
  authController.protect,
  userController.deleteMe
);

router.get(
  '/getMe',
  authController.protect,
  userController.getMe
);

router.get(
  '/',
  authController.protect,
  userController.getAllUsers
);

router
  .route('/:id')
  .get(
    authController.protect,
    userController.getUser)
  .patch(
    authController.protect,
    userController.updateUser);

module.exports = router;
