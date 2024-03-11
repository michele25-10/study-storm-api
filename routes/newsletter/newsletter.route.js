const express = require('express');
const router = express.Router();

const newsletterController = require('./newsletter.controller');
const newsletterValidation = require('./newsletter.validation');
const validate = require('../../middleware/JoiValidation');

router.post("/", validate(newsletterValidation.addNewsletter), newsletterController.addNewsletter);

module.exports = router;