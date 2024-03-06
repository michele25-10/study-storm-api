const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const userValidation = require('./user.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", validate(userValidation.getAllUsers), userController.getAllUsers);
router.get("/filter/", validate(userValidation.getUserByEmail), userController.getUserByEmail);
router.get("/filter/:idu", validate(userValidation.getUser), userController.getUser);
router.put("/:idu", validate(userValidation.updateUser), userController.updateUser);
router.delete("/:idu", validate(userValidation.deleteUser), userController.deleteUser);

router.put("/change-password/:idu", validate(userValidation.changePassword), userController.changePassword);

module.exports = router;