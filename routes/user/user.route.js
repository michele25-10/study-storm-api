const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const userValidation = require('./user.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", validate(userValidation.getAllUsers), userController.getAllUsers);
router.get("/getUser", validate(userValidation.getUser), userController.getUser);
router.get("/getUserByEmail", validate(userValidation.getUserByEmail), userController.getUserByEmail);


module.exports = router;