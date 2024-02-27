const express = require('express');
const router = express.Router();

const userGoalController = require('./user-goal.controller');
const userGoalValidation = require('./user-goal.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", userGoalController.getAllUserGoal);
router.post("/createUserGoal", validate(userGoalValidation.createUserGoal), userGoalController.createUserGoal);
router.get("/getUserGoalByGoal", validate(userGoalValidation.getUserGoalByGoal), userGoalController.getUserGoalByGoal);
router.get("/getUserGoalByUser", validate(userGoalValidation.getUserGoalByUser), userGoalController.getUserGoalByUser);
router.get("/getUserGoal", validate(userGoalValidation.getUserGoal), userGoalController.getUserGoal);
router.put("/", validate(userGoalValidation.updateAdmin), userGoalController.updateAdmin);
router.delete("/", validate(userGoalValidation.deleteUserGoal), userGoalController.deleteUserGoal)

module.exports = router;