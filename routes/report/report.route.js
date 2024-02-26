const express = require('express');
const router = express.Router();

const reportController = require('./report.controller');
const reportValidation = require('./report.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", reportController.getAllReport);

module.exports = router;