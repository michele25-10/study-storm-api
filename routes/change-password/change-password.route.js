const express = require('express');
const router = express.Router();

const changePswController = require('./change-password.controller');
const changePswValidation = require('./change-password.validation');
const validate = require('../../middleware/JoiValidation');

router.put("/change-password/", validate(changePswController.changePassword), changePswValidation.changePassword);