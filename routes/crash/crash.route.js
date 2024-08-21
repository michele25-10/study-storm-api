const express = require('express');
const router = express.Router();

const crashController = require('./crash.controller');
const crashValidation = require('./crash.validation');
const validate = require('../../middleware/JoiValidation');

router.post("/", validate(crashValidation.postCrashInformation), crashController.postCrashInformation);

module.exports = router;