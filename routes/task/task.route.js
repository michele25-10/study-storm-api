const express = require('express');
const router = express.Router();

const taskController = require('./task.controller');
const taskValidation = require('./task.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", validate(taskValidation.getAllTasks), taskController.getAllTasks);
router.post("/", validate(taskValidation.createTask), taskController.createTask);
router.get("/:id", validate(taskValidation.getTask), taskController.getTask);
router.put("/:id", validate(taskValidation.updateTask), taskController.updateTask);
router.delete("/:id", validate(taskValidation.deleteTask), taskController.deleteTask);

router.patch("/finished/:id", validate(taskValidation.finishedTask), taskController.finishedTask);

module.exports = router;