const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const userValidation = require('./user.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", validate(userValidation.getAllUsers), userController.getAllUsers);
router.get("/getUser", validate(userValidation.getUser), userController.getUser);
router.get("/filter/", validate(userValidation.getUserByEmail), userController.getUserByEmail);
router.put("/", validate(userValidation.updateUser), userController.updateUser);
router.delete("/", validate(userValidation.deleteUser), userController.deleteUser);


module.exports = router;