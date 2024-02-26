const express = require('express');
const router = express.Router();

const goalController = require('./goal.controller');
const goalValidation = require('./goal.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", validate(goalValidation.getAllGoals), goalController.getAllGoals);
router.post("/createGoal", validate(goalValidation.createGoal), goalController.createGoal);
router.get("/getGoal", validate(goalValidation.getGoal), goalController.getGoal);
router.put("/updateGoal", validate(goalValidation.updateGoal), goalController.updateGoal);
router.put("/updateFinished", validate(goalValidation.updateFinished), goalController.updateFinished);
router.put("/addMinutes", validate(goalValidation.addMinutes), goalController.addMinutes);

module.exports = router;