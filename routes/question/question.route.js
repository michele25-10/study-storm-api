const express = require('express');
const router = express.Router();

const questionController = require('./question.controller');
const questionValidation = require('./question.validation');
const validate = require('../../middleware/JoiValidation');

router.post("/", validate(questionValidation.addQuestion), questionController.addQuestion);
router.delete("/:id", validate(questionValidation.deleteQuestion), questionController.deleteQuestion);


module.exports = router;