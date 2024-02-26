const express = require('express');
const router = express.Router();

const feedbackController = require('./feedback.controller');
const feedbackValidation = require('./feedback.validation');
const validate = require('../../middleware/JoiValidation');

router.post("/", validate(feedbackValidation.addFeedback), feedbackController.addFeedback);

module.exports = router;