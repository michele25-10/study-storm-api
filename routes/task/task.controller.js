const asyncHandler = require('express-async-handler');
const Task = require('../../models/task.model');

//@desc get di tutti le task
//@route GET /api/task/
//@access private
const getAllTasks = asyncHandler(async (req, res) => {
    const result = await Task.selectAllTasks({ id_goal: req.query.id_goal || false });

    if (result.length == 0) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc creazione di una task
//@route POST /api/task/
//@access private
const createTask = asyncHandler(async (req, res) => {
    if (req.body.expiry_date < new Date()) {
        res.status(400);
        throw new Error();
    }

    const result = await Task.createTask({ ...req.body });

    if (result.affectedRows != 1) {
        res.status(400);
        throw new Error();
    }

    res.status(201).send({ message: "Obiettivo creato" });
});

//@desc get una task dato un id
//@route GET /api/task/:id
//@access private
const getTask = asyncHandler(async (req, res) => {
    const result = await Task.selectTask({ id: req.params.id });

    if (result.length == 0) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send(result);
});

//@desc modifica di una task
//@route PUT /api/task/updateTask
//@access private
const updateTask = asyncHandler(async (req, res) => {
    if (req.body.expiry_date < new Date()) {
        res.status(400);
        throw new Error();
    }

    const result = await Task.updateTask({ ...req.body, id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(400);
        throw new Error();
    }

    res.status(201).send({ message: "Task modificata" });
});

//@desc modifica i minuti
//@route PUT /api/task/addMinutes
//@access private
/*const addMinutes = asyncHandler(async (req, res) => {
    const result = await Task.updateMinutes({ ...req.body });

    if (result.affectedRows != 1) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send({ message: "Tempo aggiornato" });
});*/

//@desc elimina una task
//@route DELETE /api/task/
//@access private
const deleteTask = asyncHandler(async (req, res) => {
    const result = await Task.deleteTask({ id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send({ message: "Task eliminata" });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask /*, addMinutes */ };