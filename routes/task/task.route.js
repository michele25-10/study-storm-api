const express = require('express');
const router = express.Router();

const taskController = require('./task.controller');
const taskValidation = require('./task.validation');
const validate = require('../../middleware/JoiValidation');

router.get("/", taskController.getAllTasks);
router.post("/", validate(taskValidation.createTask), taskController.createTask);
router.get("/:id", validate(taskValidation.getTask), taskController.getTask);
router.put("/:id", validate(taskValidation.updateTask), taskController.updateTask);
router.delete("/:id", validate(taskValidation.deleteTask), taskController.deleteTask);

//Questa rotta può essere sostituita da una procedura all'interno della rotta POST e PUT di agenda
router.put("/addMinutes", validate(taskValidation.addMinutes), taskController.addMinutes);

module.exports = router;