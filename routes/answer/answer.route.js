const express = require('express');
const router = express.Router();

const answerController = require('./answer.controller');
const answerValidation = require('./answer.validation');
const validate = require('../../middleware/JoiValidation');

router.post("/", validate(answerValidation.addAnswer), answerController.addAnswer);
router.put("/:id", validate(answerValidation.putAnswer), answerController.putAnswer);
router.delete("/:id", validate(answerValidation.deleteAnswer), answerController.deleteAnswer);
router.get("/:id", validate(answerValidation.getSingleAnswer), answerController.getSingleAnswer);

module.exports = router;