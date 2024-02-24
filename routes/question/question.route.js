const express = require('express');
const router = express.Router();

const questionController = require('./question.controller');
const questionValidation = require('./question.validation');
const validate = require('../../middleware/JoiValidation');

router.post("/", validate(questionValidation.addQuestion), questionController.addQuestion);

module.exports = router;