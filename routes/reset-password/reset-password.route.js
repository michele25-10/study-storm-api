const express = require('express');
const router = express.Router();

const resetPasswordController = require('./reset-password.controller');
const resetPasswordValidation = require('./reset-password.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/confirm/:id", validate(resetPasswordValidation.confirm), resetPasswordController.confirm);

module.exports = router;