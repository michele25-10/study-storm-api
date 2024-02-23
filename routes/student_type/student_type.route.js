const express = require('express');
const router = express.Router();

const studentTypeController = require('./student_type.controller');
const studentTypeValidation = require('./student_type.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", studentTypeController.getAllTypes);
router.get("/getType", validate(studentTypeValidation.getType), studentTypeController.getType);

module.exports = router;