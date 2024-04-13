const express = require('express');
const router = express.Router();

const statsController = require('./stats.controller');
const statsValidation = require('./stats.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/study/period/", validate(statsValidation.getStatsHourStudy), statsController.getStatsHourStudy);
module.exports = router;