const express = require('express');
const router = express.Router();

const taskController = require('./task.controller');
const taskValidation = require('./task.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", taskController.getAllTasks);
router.post("/createTask", validate(taskValidation.createTask), taskController.createTask);
router.get("/getTask", validate(taskValidation.getTask), taskController.getTask);
router.put("/updateTask", validate(taskValidation.updateTask), taskController.updateTask);
router.put("/addMinutes", validate(taskValidation.addMinutes), taskController.addMinutes);
router.delete("/deleteTask", validate(taskValidation.deleteTask), taskController.deleteTask);

module.exports = router;