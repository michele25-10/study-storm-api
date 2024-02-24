const express = require('express');
const router = express.Router();

const goalController = require('./goal.controller');
const goalValidation = require('./goal.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", validate(goalValidation.getAllGoals), goalController.getAllGoals);
router.get("/createGoal", validate(goalValidation.createGoal), goalController.createGoal);
router.get("/getGoal", validate(goalValidation.getGoal), goalController.getGoal);

module.exports = router;