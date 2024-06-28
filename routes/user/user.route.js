const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const userValidation = require('./user.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", validate(userValidation.getAllUsers), userController.getAllUsers);
router.get("/filter/", validate(userValidation.getUserByEmail), userController.getUserByEmail);
router.get("/filter/:idu", validate(userValidation.getUser), userController.getUser);
router.put("/", validate(userValidation.updateUser), userController.updateUser);
router.delete("/", userController.deleteUser);

router.put("/confirm-change-password/", validate(userValidation.confirmChangePassword), userController.confirmChangePassword);
router.get("/info/", userController.getInfo);
router.put("/change-image/", validate(userValidation.changeImageProfile), userController.changeImageProfile);
module.exports = router;