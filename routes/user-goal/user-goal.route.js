const express = require('express');
const router = express.Router();

const userGoalController = require('./user-goal.controller');
const userGoalValidation = require('./user-goal.validation');
const validate = require('../../middleware/JoiValidation');

// router.get("/", userGoalController.getAllUserGoal);
router.post("/", validate(userGoalValidation.createUserGoal), userGoalController.createUserGoal);
// router.get("/filter", validate(userGoalValidation.filter), userGoalController.filter);
router.put("/", validate(userGoalValidation.updateAdmin), userGoalController.updateAdmin);
router.delete("/", validate(userGoalValidation.deleteUserGoal), userGoalController.deleteUserGoal)

module.exports = router;