const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const authValidation = require('./auth.validation');
const validate = require('../../middleware/JoiValidation');

router.post("/login", validate(authValidation.login), authController.login);

module.exports = router;