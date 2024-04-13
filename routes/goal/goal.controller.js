const asyncHandler = require('express-async-handler');
const Goal = require('../../models/goal.model');
const Task = require('../../models/task.model');
const UserGoal = require('../../models/user-goal.model');

//@desc get di tutti gli obiettivi
//@route GET /api/goal/
//@access private
const getAllGoals = asyncHandler(async (req, res) => {
    const response = await Goal.selectAllGoals({ alsoFinished: req.query.alsoFinished || false, idu: req.user.idu, tasks: req.query.tasks });

    if (req.query.tasks) {
        for (const row of response) {
            const task = await Task.selectAllTasks({ id_goal: row.id });
            row.tasks = task;
        }
    }

    res.status(200).send(response);
});

//@desc creazione di un obiettivo
//@route POST /api/goal
//@access private
const createGoal = asyncHandler(async (req, res) => {
    if (req.body.expiry_date != null && req.body.expiry_date < new Date()) {
        res.status(400);
        throw new Error();
    }

    const result = await Goal.createGoal({ ...req.body });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    const goalId = result.insertId;

    result = UserGoal.createUserGoal({ id_user: req.user.idu, id_goal: goalId, admin: req.body.admin || 0 });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(201).send({ message: "Obiettivo creato" });
});

//@desc get un obiettivo dato un id
//@route GET /api/goal/:id
//@access private
const getGoal = asyncHandler(async (req, res) => {
    let result = await UserGoal.filter({ id_user: req.user.idu, id_goal: req.params.id });

    if (result.length != 1) {
        res.status(403);
        throw new Error();
    }

    let response = await Goal.selectGoal({ alsoDisactive: req.query.alsoDisactive || false, id: req.params.id });

    if (response.length == 0) {
        res.status(404);
        throw new Error();
    }

    if (req.query.tasks) {
        for (const row of response) {
            const task = await Task.selectAllTasks({ id_goal: row.id });
            row.tasks = task;
        }
    }

    res.status(200).send(response);
});

//@desc modifica di un obiettivo
//@route PUT /api/goal/updateGoal
//@access private
const updateGoal = asyncHandler(async (req, res) => {
    let result = await UserGoal.filter({ id_user: req.user.idu, id_goal: req.params.id });

    if (result.length != 1) {
        res.status(403);
        throw new Error();
    }

    if (req.body.expiry_date < new Date()) {
        res.status(400);
        throw new Error();
    }

    result = await Goal.updateGoal({ ...req.body, id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(500);
        throw new Error();
    }

    res.status(201).send({ message: "Obiettivo modificato" });
});

//@desc aggiorna il valore di admin
//@route PUT /api/user-goal/updateAdmin
//@access private
const updateFinished = asyncHandler(async (req, res) => {
    let result = await UserGoal.filter({ id_user: req.user.idu, id_goal: req.params.id });

    if (result.length != 1) {
        res.status(403);
        throw new Error();
    }

    result = await Goal.updateFinished({ ...req.body, id: req.params.id });

    if (result.affectedRows != 1) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send({ message: "Obiettivo aggiornato" });
});

//@desc modifica i minuti
//@route PUT /api/goal/addMinutes
//@access private
/*const addMinutes = asyncHandler(async (req, res) => {
    const result = await Goal.updateMinutes({ ...req.body });

    if (result.affectedRows != 1) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send({ message: "Tempo aggiornato" });
});*/

//@desc elimina un obiettivo
//@route PUT /api/goal/
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
    let result = await UserGoal.filter({ id_user: req.user.idu, id_goal: req.params.id });

    if (result.length != 1) {
        res.status(403);
        throw new Error();
    }

    result = await Goal.deleteGoal({ ...req.params });

    if (result.affectedRows != 1) {
        res.status(404);
        throw new Error();
    }

    res.status(200).send({ message: "Obiettivo eliminato" });
});



module.exports = { getAllGoals, createGoal, getGoal, updateGoal, updateFinished, deleteGoal /*, addMinutes,*/ };