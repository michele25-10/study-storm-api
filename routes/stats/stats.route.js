const express = require('express');
const router = express.Router();

const statsController = require('./stats.controller');
const statsValidation = require('./stats.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/study/seven-days/", statsController.getLastSevenDaysStats);
router.get("/study/thirty-days/", statsController.getLastThirtyDaysStats);
router.get("/study/info/", statsController.getStudyInfo);
router.get("/study/period/", validate(statsValidation.getStatsHourStudy), statsController.getStatsHourStudy);
router.get("/study/info/:id_goal", validate(statsValidation.getStudyInfoHistory), statsController.getStudyInfoHistory);

router.get("/final-grade/year/", statsController.getStatsGradeYear);

module.exports = router;