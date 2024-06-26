const express = require('express');
const router = express.Router();

const goalController = require('./goal.controller');
const goalValidation = require('./goal.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", validate(goalValidation.getAllGoals), goalController.getAllGoals);
router.post("/", validate(goalValidation.createGoal), goalController.createGoal);
router.get("/:id", validate(goalValidation.getGoal), goalController.getGoal);
router.put("/:id", validate(goalValidation.updateGoal), goalController.updateGoal);
router.delete("/:id", validate(goalValidation.deleteGoal), goalController.deleteGoal);

router.get("/name/", goalController.getAllGoalsName);
//Quando voglio chiudere un obiettivo chiamo questa API
router.patch("/:id", validate(goalValidation.updateFinished), goalController.updateFinished);



//Questa rotta può essere risparmiata rendendo automatica la procedura dalla POST e PUT di agenda
//router.put("/addMinutes", validate(goalValidation.addMinutes), goalController.addMinutes);

module.exports = router;