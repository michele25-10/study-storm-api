const express = require('express');
const router = express.Router();

const goalController = require('./goal.controller');
const goalValidation = require('./goal.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", validate(goalValidation.getAllGoals), goalController.getAllGoals);
router.post("/", validate(goalValidation.createGoal), goalController.createGoal);
router.get("/:id", validate(goalValidation.getGoal), goalController.getGoal);
router.put("/updateGoal", validate(goalValidation.updateGoal), goalController.updateGoal);
router.patch("/:id", validate(goalValidation.updateFinished), goalController.updateFinished);
router.delete("/:id", validate(goalValidation.deleteGoal), goalController.deleteGoal);

router.put("/addMinutes", validate(goalValidation.addMinutes), goalController.addMinutes);

module.exports = router;